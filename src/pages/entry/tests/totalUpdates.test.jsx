import { render, screen } from "../../../test-utils/testing-library-test-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("updates scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByLabelText("Vanilla");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByLabelText("Chocolate");
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("updates toppings subtotal when topping change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByTestId("Cherries");
  expect(cherriesCheckbox).not.toBeChecked();

  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const mnmsCheckbox = await screen.findByTestId("M&Ms");
  expect(mnmsCheckbox).not.toBeChecked();

  await user.click(mnmsCheckbox);
  expect(mnmsCheckbox).toBeChecked();

  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();

  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at 0", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByText(/grand total: \$/i);
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test("updates grand total if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText(/grand total: \$/i);
    const vanillaInput = await screen.findByLabelText("Vanilla");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");

    const cherriesCheckbox = await screen.findByTestId("Cherries");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("updates grand total if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText(/grand total: \$/i);

    const cherriesCheckbox = await screen.findByTestId("Cherries");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByLabelText("Vanilla");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("updates grand total if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByText(/grand total: \$/i);

    const cherriesCheckbox = await screen.findByTestId("Cherries");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByLabelText("Vanilla");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "0");

    expect(grandTotal).toHaveTextContent("1.50");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
