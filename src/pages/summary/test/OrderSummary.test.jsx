import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../../App";

test("Optionally show Toppings on Summary Page", async () => {
  const { unmount } = render(<App />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByLabelText("Vanilla");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const orderBtn = screen.getByRole("button", { name: /submit order/i });
  await user.click(orderBtn);

  const toppings = screen.queryByText(/toppings/i);
  expect(toppings).not.toBeInTheDocument();

  unmount();
});
