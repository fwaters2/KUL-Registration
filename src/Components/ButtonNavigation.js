import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import steps from "./steps.json";
import firebase from "../Firebase";
import AuthContext from "./AuthContext";
import FormContext from "./FormContext";

export default function ButtonNavigation({ isComplete }) {
  const AuthState = React.useContext(AuthContext);
  const FormData = React.useContext(FormContext);
  const { step, stepChange, values } = FormData;
  const regDocId = AuthState.regDocId;
  const totalSteps = steps.length;
  const firstStep = 0;

  const currentValues = FormData.values[steps[step]];
  const handleDbUpdate = () => {
    const newLastCompletedStep =
      values.lastCompletedStep > step ? values.lastCompletedStep : step;
    const docRef = firebase
      .firestore()
      .collection("Registration")
      .doc(regDocId);
    docRef.update({
      [steps[step]]: currentValues,
      lastCompletedStep: newLastCompletedStep
    });
  };
  const handleBack = () => {
    handleDbUpdate();
    stepChange(step - 1);
  };

  const handleNext = () => {
    handleDbUpdate();
    stepChange(step + 1);
  };
  return (
    step + 1 < totalSteps && (
      <ButtonGroup fullWidth style={{ marginTop: "2em" }} color="primary">
        {step > firstStep && <Button onClick={handleBack}>Back</Button>}
        <Button
          color="secondary"
          variant="contained"
          onClick={handleNext}
          disabled={!isComplete}
        >
          Next
        </Button>
      </ButtonGroup>
    )
  );
}
