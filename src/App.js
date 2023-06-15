import { Container } from "react-bootstrap";
import Wrapper from "./pages/common/Wrapper";
import { OrderPhaseProvider } from "./contexts/OrderPhase";

function App() {
  return (
    <Container>
      <OrderPhaseProvider>
        <Wrapper />
      </OrderPhaseProvider>
    </Container>
  );
}

export default App;
