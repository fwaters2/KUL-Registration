import React from "react";
import Preloader from "./Preloader/Preloader.js";
import FormContainer from "./Components/FormContainer.js";
import StepView from "./Components/StepView.js";
import LoginContainer from "./Components/Login/LoginContainer.js";
import handleLang from "./Assets/Lang/handleLang.js";
import CompleteContainer from "./Components/Complete/CompleteContainer.js";
import MainStepper from "./Components/Steppers/MainStepper.js";
import SecondaryStepper from "./Components/Steppers/SecondaryStepper.js";
import mainStepperActiveStep from "./Components/Steppers/mainStepperActiveStep.js";
import initialRegData from "./Components/Login/initialRegData.json";
import FormContext from "./Components/FormContext.js";
export default function StateStore(props) {
  const {
    isLoading,
    isSignedIn,
    isRegistered,
    regData,
    isReferred,
    referralId,
    regDocId
  } = props.authState;

  const [lang, toggleLang] = React.useState("en");
  const [values, setValues] = React.useState(initialRegData);
  const [step, stepChange] = React.useState(0);

  let language = handleLang(lang);

  React.useEffect(() => setValues(regData), [regData]);

  React.useEffect(
    () =>
      setValues({
        ...values,
        checkout: {
          subtotal:
            values.swag.items.discBlack * 400 +
            values.swag.items.discWhite * 400 +
            values.swag.items.hatBlack * 200 +
            values.swag.items.hatWhite * 200 +
            1200
        }
      }),
    [values.swag.items]
  );
  React.useEffect(() => stepChange(regData.lastCompletedStep + 1), [regData]);

  const toggleLanguage = () => {
    lang === "en" ? toggleLang("ch") : toggleLang("en");
  };

  function isStepCompleted(stepTitle, [...requiredKeys]) {
    const initialData = initialRegData[stepTitle];
    const currentData = values[stepTitle];

    const isEqualToInitArray = requiredKeys.map(
      data => initialData[data] === currentData[data]
    );

    let hasUnupdatedValue = isEqualToInitArray.includes(true);
    console.log("isEqualToInitArray", isEqualToInitArray);
    console.log("hasUnupdatedValue", hasUnupdatedValue);
    return hasUnupdatedValue;
  }

  const otherState = {
    toggleLanguage,
    values,
    lang,
    step,
    stepChange,
    isSignedIn,
    setValues,
    language,
    regDocId,
    isStepCompleted
  };
  const currentView = () => {
    if (isLoading) {
      return <Preloader />;
    }
    if (!isSignedIn) {
      return (
        <FormContainer state={otherState}>
          <LoginContainer
            language={language}
            referralId={referralId}
            isReferred={isReferred}
          />
        </FormContainer>
      );
    }
    if (!isRegistered) {
      return (
        <FormContainer state={otherState}>
          {console.log(regData.lastCompletedStep + 1)}
          {console.log("current values", values)}
          <MainStepper
            activeStep={mainStepperActiveStep(step)}
            lastCompletedStep={values.lastCompletedStep}
            setActiveStep={stepChange}
          />
          {step < 3 ? null : step > 14 ? null : (
            <SecondaryStepper step={step} />
          )}
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px"
              }}
            >
              <StepView step={step} />
            </div>
          </div>
        </FormContainer>
      );
    }
    if (isRegistered) {
      return (
        <FormContainer state={otherState}>
          <CompleteContainer state={otherState} />
        </FormContainer>
      );
    }
  };
  return (
    <FormContext.Provider value={otherState}>
      {currentView()}
    </FormContext.Provider>
  );
}
