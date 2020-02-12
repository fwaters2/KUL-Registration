import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import steps from "./steps.json";
import firebase from "../Firebase";

export default function ButtonNavigation(props) {
  const { step, stepChange, regDocId } = props.state;

  const currentValues = props.state.values[steps[step]];
  const isCurrentStepComplete = currentValues.completed;

  const totalSteps = steps.length;
  const handleNext = () => {
    stepChange(step + 1);
    const docRef = firebase
      .firestore()
      .collection("Registration")
      .doc(regDocId);
    docRef.update({ [steps[step]]: currentValues });
  };
  return (
    step + 1 < totalSteps && (
      <ButtonGroup fullWidth style={{ marginTop: "2em" }} color="primary">
        {console.log("my step current value", currentValues)}
        {step > 0 && <Button onClick={() => stepChange(step - 1)}>Back</Button>}
        <Button
          color="secondary"
          variant="contained"
          onClick={handleNext}
          //disabled={!isCurrentStepComplete}
        >
          Next
        </Button>
      </ButtonGroup>
    )
  );
}
