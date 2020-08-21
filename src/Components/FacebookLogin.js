import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import Page from "react-facebook/dist/Page";

const FacebookLogin = () => {
  const [error, setError] = React.useState();
  const handleResponse = (data) => {
    console.log(data);
  };

  const handleError = (error) => {
    setError(error);
    console.log("error", error);
  };

  return (
    <LoginButton
      scope="email"
      onCompleted={handleResponse}
      onError={handleError}
    >
      <span>Login via Facebook</span>
    </LoginButton>
  );
};

export default FacebookLogin;
