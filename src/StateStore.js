import React from "react";
import Preloader from "./Preloader/Preloader.js";
import FormContainer from "./Components/FormContainer";
import StepView from "./Components/StepView.js";
import LoginContainer from "./Components/Login/LoginContainer.js";
import handleLang from "./Assets/Lang/handleLang.js";
import CompleteContainer from "./Components/Complete/CompleteContainer.js";
import MainStepper from "./Components/Steppers/MainStepper.js";
import SecondaryStepper from "./Components/Steppers/SecondaryStepper.js";
import mainStepperActiveStep from "./Components/Steppers/mainStepperActiveStep.js";
import initialRegData from "./Components/Login/initialRegData.json";
import FormContext from "./Components/FormContext.js";
import CoverDialog from "./Components/CoverDialog.js";
export default function StateStore(props) {
  const {
    isLoading,
    isSignedIn,
    isRegistered,
    regData,
    isReferred,
    referralId,
    regDocId,
    importedStep,
    greetingOpen,
    toggleGreeting,
    lang,
    toggleLang,
  } = props.authState;

  const [values, setValues] = React.useState(initialRegData);
  const [step, stepChange] = React.useState(importedStep);

  let language = handleLang(lang);

  React.useEffect(() => setValues(regData), [regData]);
  React.useEffect(() => stepChange(importedStep), [importedStep]);

  const toggleLanguage = () => {
    lang === "en" ? toggleLang("ch") : toggleLang("en");
  };
  const openGreeting = () => {
    toggleGreeting(true);
  };

  const otherState = {
    openGreeting,
    toggleLanguage,
    values,
    lang,
    step,
    stepChange,
    isSignedIn,
    setValues,
    language,
    regDocId,
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
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "300px",
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
      <CoverDialog open={greetingOpen} onClose={() => toggleGreeting(false)} />
      {currentView()}
    </FormContext.Provider>
  );
}
