import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";
import firebase from "../Firebase";
import AuthContext from "./AuthContext";
import FormContext from "./FormContext";
import { ArrowForward, ArrowBack } from "@material-ui/icons";
import { stepNames } from "./StepView";

export default function ButtonNavigation({ isComplete }) {
  const AuthState = React.useContext(AuthContext);
  const FormData = React.useContext(FormContext);
  const { step, stepChange, values } = FormData;
  const regDocId = AuthState.regDocId;
  const totalSteps = stepNames.length;
  const firstStep = 0;

  const currentValues = FormData.values[stepNames[step]];
  console.log("stepNames", stepNames);
  console.log("FormData.values", FormData.values);
  console.log("steps[step]", stepNames[step]);
  console.log("currentValues", currentValues);
  const handleDbUpdate = () => {
    const newLastCompletedStep =
      values.lastCompletedStep > step ? values.lastCompletedStep : step;
    const docRef = firebase
      .firestore()
      .collection("Registration")
      .doc(regDocId);
    docRef.update({
      langPreference: FormData.lang,
      [stepNames[step]]: currentValues,
      lastCompletedStep: newLastCompletedStep,
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
        {step > firstStep && (
          <Button onClick={handleBack}>
            <ArrowBack />
          </Button>
        )}
        <Button
          color="secondary"
          variant="contained"
          onClick={handleNext}
          disabled={!isComplete}
        >
          <ArrowForward />
        </Button>
      </ButtonGroup>
    )
  );
}
