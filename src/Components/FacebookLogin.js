import React from "react";
import "./FacebookLogin.css";
import firebase from "../Firebase";
import { ReactComponent as FbLogo } from "../Assets/FbLogoWhite.svg";

const provider = new firebase.auth.FacebookAuthProvider();
const RegisterFacebook = ({ text }) => {
  const componentClicked = (clickedData) => {
    firebase.auth().signInWithRedirect(provider);
    console.log("clickedData", clickedData);
  };
  return (
    <button onClick={componentClicked} className="facebook-login">
      <FbLogo style={{ height: "100%", marginRight: "5px" }} />
      {text}
    </button>
  );
};

export default RegisterFacebook;
