import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-test-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

// test.only("handles erros for scoops and toppings routs", async () => {
//   server.resetHandlers(
//     rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
//       res(ctx.status(500))
//     ),
//     rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
//       res(ctx.status(500))
//     )
//   );
//   render(<OrderEntry />);
//   await waitFor(async () => {
//     const alerts = await screen.findAllByRole("alert");
//     expect(alerts).toHaveLength(2);
//   });
// });

test.skip("not a real test", () => {});

test("also not a real test", () => {});

test("Disable order button for no scoops", async () => {
  render(<OrderEntry />);
  const user = userEvent.setup();

  const orderBtn = screen.getByRole("button", { name: /submit order/i });
  expect(orderBtn).toBeDisabled();

  const vanillaInput = await screen.findByLabelText("Vanilla");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(orderBtn).toBeEnabled();

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");

  expect(orderBtn).toBeDisabled();
});
