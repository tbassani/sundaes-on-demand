import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useOrderPhase } from "../../contexts/OrderPhase";

export default function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);
  const { nextPhase } = useOrderPhase();

  const popover = (
    <Popover id="popover-positioned-right" title="Popover right">
      No ice cream will actually be delivered
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" onClick={nextPhase} disabled={!tcChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
