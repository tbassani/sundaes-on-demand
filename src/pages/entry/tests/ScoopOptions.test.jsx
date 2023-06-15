import { screen, render } from "../../../test-utils/testing-library-test-utils";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOptions";

test("invalid scoop value shows red input", async () => {
  render(<ScoopOptions name="vanilla" />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByLabelText("Vanilla", {
    exact: false,
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");

  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.5");

  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");

  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");

  expect(vanillaInput).not.toHaveClass("is-invalid");
});
