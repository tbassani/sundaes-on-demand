import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";
import { OrderPhaseProvider } from "../contexts/OrderPhase";

const AllTheProviders = ({ children }) => {
  return (
    <OrderDetailsProvider>
      <OrderPhaseProvider>{children}</OrderPhaseProvider>
    </OrderDetailsProvider>
  );
};

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";

export { renderWithContext as render };
