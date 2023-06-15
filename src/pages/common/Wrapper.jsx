import OrderEntry from "../../pages/entry/OrderEntry";
import { OrderDetailsProvider } from "../../contexts/OrderDetails";
import OrderSummary from "../../pages/summary/OrderSummary";
import OrderConfirmation from "../../pages/confirmation/OrderConfirmation";
import { useOrderPhase } from "../../contexts/OrderPhase";

const Wrapper = () => {
  const { phase } = useOrderPhase();

  return (
    <OrderDetailsProvider>
      {/*Summary page and entry page need provider */}
      {phase === "inProgress" && <OrderEntry />}
      {/*Confirmation page does not need provider */}
      {phase === "review" && <OrderSummary />}
      {phase === "complete" && <OrderConfirmation />}
    </OrderDetailsProvider>
  );
};

export default Wrapper;
