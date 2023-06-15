import { render, screen } from "../test-utils/testing-library-test-utils";
import userEvent from "@testing-library/user-event";

import Wrapper from "../pages/common/Wrapper";

test("order phases for happy path", async () => {
  //render app
  const { unmount } = render(<Wrapper />);
  const user = userEvent.setup();

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByLabelText("Vanilla");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const scoopsSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const cherriesCheckbox = await screen.findByTestId("Cherries");

  await user.click(cherriesCheckbox);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //find and click the order button
  const orderBtn = screen.getByRole("button", { name: /submit order/i });
  await user.click(orderBtn);
  //check the summary info base on order
  const totalScoops = screen.getByText(/Scoops: /i);
  expect(totalScoops).toHaveTextContent("2.00");
  const totalToppings = screen.getByText(/Toppings: /i);
  expect(totalToppings).toHaveTextContent("1.50");
  //accept terms and conditions and click button to confirm order
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmBtn = screen.getByRole("button", { name: "Confirm order" });
  await user.click(checkbox);
  await user.click(confirmBtn);
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderBtn);
  //check that scoops and toppings subtotals have been reset

  const scoopsNewSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });

  const toppingsNewSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(scoopsNewSubtotal).toHaveTextContent("0.00");

  expect(toppingsNewSubtotal).toHaveTextContent("0.00");
  //do we need to await anything to avoid errors?
  unmount();
});
