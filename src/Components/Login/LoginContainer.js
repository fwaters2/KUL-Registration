import React from "react";
import Register from "./Register";

export default function LoginContainer(props) {
  const { language } = props;

  return <Register language={language} />;
}
