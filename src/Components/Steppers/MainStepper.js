import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  makeStyles
} from "@material-ui/core";
import { Assignment, ShoppingCart, DoneAll, Face } from "@material-ui/icons";
import clsx from "clsx";

const mainSteps = [0, 1, 2, 3];
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)"
  }
});

export default function MainStepper({ activeStep }) {
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
      1: <Face />,
      2: <Assignment />,
      3: <ShoppingCart />,
      4: <DoneAll />
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  return (
    <Stepper
      style={{ width: "100%" }}
      activeStep={activeStep}
      connector={<StepConnector />}
    >
      {mainSteps.map(x => (
        <Step key={x}>
          <StepLabel StepIconComponent={ColorlibStepIcon} />
        </Step>
      ))}
    </Stepper>
  );
}
