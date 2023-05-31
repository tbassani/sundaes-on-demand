import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

//custom hook to check if we are within a provider, otherwise throw an error

export const useOrderDetails = () => {
  const constextValue = useContext(OrderDetails);

  if (!constextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return constextValue;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: {}, //{Chocolate: 1, Vanilla: 2}
    toppings: {}, //{"Gummi Bears": 1}
  });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    //make a copy of the existing state
    const newOptionCounts = { ...optionCounts };

    //update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount;

    //update the state with the updated copy
    setOptionsCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionsCounts({ scoops: {}, toppings: {} });
  };

  //utility function to derive total from optionCounts state value
  const calculateTotal = (optionType) => {
    //get an array of counts for the option type

    const countsArray = Object.values(optionCounts[optionType]);

    //total the values in the array of counts for the number of item
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    //multiply the total number of item by the price for this item type
    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
};
