import React from "react";
import Preloader from "./Preloader/Preloader.js";
import FormContainer from "./Components/FormContainer.js";
import StepView from "./Components/StepView.js";
import LoginContainer from "./Components/Login/LoginContainer.js";
import handleLang from "./Assets/Lang/handleLang.js";
import ButtonNavigation from "./Components/ButtonNavigation.js";
import CompleteContainer from "./Components/Complete/CompleteContainer.js";
import "./InitialState.json";
import MainStepper from "./Components/Steppers/MainStepper.js";
import SecondaryStepper from "./Components/Steppers/SecondaryStepper.js";
import mainStepperActiveStep from "./Components/Steppers/mainStepperActiveStep.js";
import initialRegData from "./Components/Login/initialRegData.json";
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
  const [step, stepChange] = React.useState(17);
  const [lang, toggleLang] = React.useState("en");
  const [values, setValues] = React.useState(initialRegData);

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

  const toggleLanguage = () => {
    lang === "en" ? toggleLang("ch") : toggleLang("en");
  };

  const containerState = {
    toggleLanguage,
    lang,
    isSignedIn
  };

  const otherState = {
    values,
    lang,
    step,
    stepChange,
    isSignedIn,
    setValues,
    language,
    regDocId
  };
  const currentView = () => {
    if (isLoading) {
      return <Preloader />;
    }
    if (!isSignedIn) {
      return (
        <FormContainer state={containerState}>
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
        <FormContainer state={containerState}>
          {console.log("current values", values)}
          <MainStepper activeStep={mainStepperActiveStep(step)} />
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
              <StepView state={otherState} />
            </div>
            <ButtonNavigation state={otherState} />
          </div>
        </FormContainer>
      );
    }
    if (isRegistered) {
      return (
        <FormContainer state={containerState}>
          <CompleteContainer state={otherState} />
        </FormContainer>
      );
    }
  };
  return currentView();
}
