import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import steps from "./steps.json";

export default function ButtonNavigation(props) {
  const { step, stepChange } = props.state;

  const totalSteps = steps.length;
  return (
    step + 1 < totalSteps && (
      <ButtonGroup fullWidth style={{ marginTop: "2em" }}>
        {step > 0 && <Button onClick={() => stepChange(step - 1)}>Back</Button>}
        <Button onClick={() => stepChange(step + 1)}>Next</Button>
      </ButtonGroup>
    )
  );
}
