import React from "react";
import firebase from "./Firebase";
import Preloader from "./Preloader/Preloader.js";
import FormContainer from "./Components/FormContainer.js";
import StepView from "./Components/StepView.js";
import LoginContainer from "./Components/Login/LoginContainer.js";
import handleLang from "./Assets/Lang/handleLang.js";
import ButtonNavigation from "./Components/ButtonNavigation.js";
import CompleteContainer from "./Components/Complete/CompleteContainer.js";
import "./InitialState.json";
const InitialState = require("./InitialState.json");

export default function StateStore(props) {
  const { isLoading, isSignedIn, isRegistered } = props.authState;
  const [step, stepChange] = React.useState(0);
  const [lang, toggleLang] = React.useState("en");
  const [values, setValues] = React.useState({});

  let language = handleLang(lang);
  React.useEffect(() => {
    const unsubscribe = console.log("here we go");

    return () => unsubscribe;
  }, []);

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
    language
  };
  const currentView = () => {
    if (isLoading) {
      return <Preloader />;
    }
    if (!isSignedIn) {
      return (
        <FormContainer state={containerState}>
          <LoginContainer language={language} />
        </FormContainer>
      );
    }
    if (!isRegistered) {
      return (
        <FormContainer state={containerState}>
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
  return <React.Fragment>{currentView()}</React.Fragment>;
}
