import React from "react";
import "./InitialState.json";
import firebase from "./Firebase";
import Preloader from "./Preloader/Preloader.js";
import FormContainer from "./Components/FormContainer.js";
import StepView from "./Components/StepView.js";
import LoginContainer from "./Components/Login/LoginContainer.js";
import handleLang from "./Assets/Lang/handleLang.js";

const InitialState = require("./InitialState.json");

export default function StateStore() {
  const [step, stepChange] = React.useState(0);
  const [lang, toggleLang] = React.useState("en");
  const [values, setValues] = React.useState(InitialState);
  const [isSignedIn, updateUser] = React.useState(false);
  const [isRegistered, updateRegistration] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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
            console.log("Error getting document:", error);
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
  const handleComplexChange = (name, value) => () => {
    setValues({ ...values, [name]: value });
  };
  const handleSliderChange = name => (e, value) => {
    setValues({ ...values, [name]: value });
  };
  const changeStep = () => {
    stepChange(step + 1);
  };

  const containerState = {
    toggleLanguage,
    lang,
    isSignedIn
  };

  const otherState = {
    handleChange,
    handleButtonClick,
    handleComplexChange,
    handleSliderChange,
    changeStep,
    values,
    lang,
    step,
    stepChange,
    isSignedIn,
    setValues
  };
  const currentView = () => {
    if (isLoading) {
      return <Preloader />;
    }
    if (!isSignedIn) {
      return <LoginContainer language={language} />;
    }
    if (!isRegistered) {
      return <StepView />;
    }
    if (isRegistered) {
      return <div>We're finished Registering</div>;
    }
  };
  //What we are rendering
  return <FormContainer state={containerState}>{currentView()}</FormContainer>;
}
