import { createContext, useContext, useState } from "react";

const OrderPhase = createContext();

export const useOrderPhase = () => {
  const contextValue = useContext(OrderPhase);

  if (!contextValue) {
    throw new Error(
      "useOrderPhase must be called from within an OrderPhaseProvider"
    );
  }

  return contextValue;
};

export const OrderPhaseProvider = (props) => {
  const [phase, setPhase] = useState("inProgress");

  const nextPhase = () => {
    switch (phase) {
      case "inProgress":
        setPhase("review");
        break;
      case "review":
        setPhase("complete");
        break;
      case "complete":
        setPhase("inProgress");
        break;

      default:
        setPhase("inProgress");
        break;
    }
  };

  const value = { phase, nextPhase };
  return (
    <OrderPhase.Provider value={value} {...props}>
      {props.children}
    </OrderPhase.Provider>
  );
};
