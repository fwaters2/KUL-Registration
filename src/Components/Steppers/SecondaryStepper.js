import React from "react";
import { MobileStepper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import allSteps from "../steps.json";

const FullWidthMobileStepper = withStyles({
  progress: {
    width: "100%"
  }
})(MobileStepper);

export default function SecondaryStepper({ step }) {
  const activeStep = step - 3;

  const totalSteps = allSteps.length - 6; //subtracting the name and checkout slides and jersey/swag
  return (
    <FullWidthMobileStepper
      style={{ width: "100%" }}
      variant="progress"
      steps={totalSteps}
      position="static"
      activeStep={activeStep}
    />
  );
}
