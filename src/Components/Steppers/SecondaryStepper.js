import React from "react";
import { MobileStepper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { steps } from "../StepView";

const FullWidthMobileStepper = withStyles({
  progress: {
    width: "100%",
    backgroundColor: "#CCC",
  },
})(MobileStepper);

export default function SecondaryStepper({ step }) {
  const activeStep = step;

  const totalSteps = steps.length; //subtracting the name and checkout slides and jersey/swag
  return (
    <FullWidthMobileStepper
      style={{
        width: "100%",
        paddingLeft: 0,
        backgroundColor: "rgba(0,0,0,0)",
      }}
      variant="progress"
      steps={totalSteps}
      position="static"
      activeStep={activeStep}
      LinearProgressProps={{ color: "secondary" }}
    />
  );
}
