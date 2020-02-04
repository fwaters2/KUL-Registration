import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";

export default function ButtonNavigation(props) {
  const { step, stepChange } = props.state;
  return (
    <ButtonGroup fullWidth>
      <Button onClick={() => stepChange(step - 1)}>Back</Button>
      <Button onClick={() => stepChange(step + 1)}>Next</Button>
    </ButtonGroup>
  );
}
