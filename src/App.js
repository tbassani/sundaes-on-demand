import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      {/*Summary page and entry page need provider */}
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
      {/*Confirmation page does not need provider */}
    </Container>
  );
}

export default App;
