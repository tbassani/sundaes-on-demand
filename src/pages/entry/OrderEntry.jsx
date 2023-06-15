import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../util";
import { Button } from "react-bootstrap";
import { useOrderPhase } from "../../contexts/OrderPhase";

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  const { nextPhase } = useOrderPhase();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>
        Grand total: {formatCurrency(totals["scoops"] + totals["toppings"])}
      </h2>
      <Button onClick={nextPhase} disabled={!totals["scoops"]}>
        Submit order
      </Button>
    </div>
  );
};

export default OrderEntry;
