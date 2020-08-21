import React from "react";
import StepTitle from "../Components/StepTitle";
import ButtonNavigation from "../Components/ButtonNavigation";

const FormStep = (props) => {
  const { stepTitleString, isComplete, children } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        textAlign: "center",
      }}
    >
      {stepTitleString && <StepTitle>{stepTitleString}</StepTitle>}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <ButtonNavigation isComplete={isComplete} />
    </div>
  );
};

export default FormStep;
