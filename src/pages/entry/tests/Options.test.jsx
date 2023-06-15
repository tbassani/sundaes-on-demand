import { render, screen } from "../../../test-utils/testing-library-test-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  //find the images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each tooping from the server", async () => {
  render(<Options optionType="toppings" />);
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((img) => img.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("scoop subtotal does not update for invalid values", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByLabelText("Vanilla", {
    exact: false,
  });

  const scoopsSubtotal = screen.getByText("Scoops total: ", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");

  expect(scoopsSubtotal).toHaveTextContent("0.00");
});
