import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderPhase } from "../../contexts/OrderPhase";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState();
  const [error, setError] = useState(false);
  const { nextPhase } = useOrderPhase();
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderData);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNewOrder = () => {
    resetOrder();
    nextPhase();
  };

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {error ? (
        <AlertBanner />
      ) : (
        <>
          <h1>Thank You!</h1>
          <p>Your order number is {orderNumber}</p>
          <p style={{ fontSize: "25%" }}>
            as per our terms of service, nothing will happen now
          </p>
        </>
      )}

      <Button onClick={handleNewOrder}>New order</Button>
    </div>
  );
};

export default OrderConfirmation;
