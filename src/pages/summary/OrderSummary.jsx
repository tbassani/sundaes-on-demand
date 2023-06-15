import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../util";

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); //[["chocolate", 2], ["vanilla", 1]]
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  const toppingsArray = Object.keys(optionCounts.toppings); // ["M&Ms", "Gummi Bears"]
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {totals.toppings && <h2>Toppings: {formatCurrency(totals.toppings)}</h2>}

      {totals.toppings && <ul>{toppingList}</ul>}
      <SummaryForm />
    </div>
  );
};

export default OrderSummary;
