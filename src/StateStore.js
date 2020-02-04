import React from "react";
import "./InitialState.json";
import firebase from "./Firebase";
import Preloader from "./Preloader/Preloader.js";
import FormContainer from "./Components/FormContainer.js";
import StepView from "./Components/StepView.js";
import LoginContainer from "./Components/Login/LoginContainer.js";
import handleLang from "./Assets/Lang/handleLang.js";
import ButtonNavigation from "./Components/ButtonNavigation.js";

const InitialState = require("./InitialState.json");

export default function StateStore() {
  const [step, stepChange] = React.useState(0);
  const [lang, toggleLang] = React.useState("en");
  const [values, setValues] = React.useState(InitialState);
  const [isSignedIn, updateUser] = React.useState(false);
  const [isRegistered, updateRegistration] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  let language = handleLang(lang);
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        updateUser(true);
        //Get the data stored for this user
        var docRef = firebase
          .firestore()
          .collection("Registration")
          .doc(user.uid);

        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              setValues(doc.data());
              setIsLoading(false);
              if (doc.data().completed) {
                updateRegistration(true);
              }
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              setIsLoading(false);
              setValues({ ...InitialState });
            }
          })
          .catch(error => {
            alert("Error getting document:", error);
          });
      } else {
        updateUser(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe;
  }, []);

  const toggleLanguage = () => {
    lang === "en" ? toggleLang("ch") : toggleLang("en");
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleButtonClick = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const containerState = {
    toggleLanguage,
    lang,
    isSignedIn
  };

  const otherState = {
    handleChange,
    handleButtonClick,
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
      return <div>We're finished Registering</div>;
    }
  };
  return currentView();
}
