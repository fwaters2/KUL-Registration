import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  makeStyles,
} from "@material-ui/core";
import { Assignment, ShoppingCart, DoneAll, Face } from "@material-ui/icons";
import clsx from "clsx";
import mainStepperActiveStep from "./mainStepperActiveStep";

const mainStepperStyles = makeStyles({
  root: {
    padding: "24px 0",
  },
});
const stepperLabelStyles = makeStyles({
  iconContainer: {
    paddingRight: 0,
  },
});

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
    alignItems: "center",
    marginLeft: 0,
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(253, 225, 135) 0%, rgb(230, 153, 90) 50%, rgb(230, 153, 90) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(69, 63, 63) 0%, rgb(69, 63, 63) 50%, rgb(25, 23, 27) 100%)",
  },
});

export default function MainStepper({
  activeStep,
  lastCompletedStep,
  setActiveStep,
}) {
  const handleClick = (newStep) => () => {
    const stepperCompleted = mainStepperActiveStep(lastCompletedStep);

    const stepToReturn =
      newStep === 0
        ? 0
        : newStep === 1
        ? 3
        : newStep === 2
        ? 16
        : newStep === 3
        ? 18
        : null;
    return stepperCompleted >= newStep ? setActiveStep(stepToReturn) : null;
  };
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
      1: <Face />,
      2: <Assignment />,
      3: <ShoppingCart />,
      4: <DoneAll />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {console.log("classes active", classes.active)}
        {icons[String(props.icon)]}
      </div>
    );
  }
  const classesMain = mainStepperStyles();
  const labelClasses = stepperLabelStyles();
  return (
    <Stepper
      className={classesMain.root}
      style={{ width: "100%", backgroundColor: "rgba(0,0,0,0)" }}
      activeStep={activeStep}
      connector={<StepConnector />}
    >
      {mainSteps.map((x, index) => (
        <Step
          key={x}
          onClick={handleClick(index)}
          style={
            index === 0
              ? { paddingLeft: 0 }
              : index === mainSteps.length - 1
              ? { paddingRight: 0 }
              : null
          }
        >
          {console.log("classes", labelClasses)}
          {console.log("classes", classesMain)}

          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            classes={
              index === mainSteps.length - 1
                ? {
                    iconContainer: labelClasses.iconContainer,
                  }
                : null
            }
          />
        </Step>
      ))}
    </Stepper>
  );
}
