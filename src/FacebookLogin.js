import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import Firebase from "./Firebase";

export default function FacebookLogin() {
  const [isSignedIn, setSignIn] = React.useState(false);
  const [firstName, setFirstName] = React.useState("Unknown Name");
  const [lastName, setLastName] = React.useState("Unknown Name");

  const [email, setEmail] = React.useState("Email not known");
  const [profilePic, setPic] = React.useState(null);

  var provider = new Firebase.auth.FacebookAuthProvider();
  provider.addScope("first_name");
  provider.addScope("last_name");
  React.useEffect(() => {
    console.log(window);
    Firebase.auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log("result", result);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error", error);
        // ...
      });
  }, []);

  const handleFirebaseClick = () => {
    Firebase.auth().signInWithRedirect(provider);
    console.log("fired in fb click");
  };
  const handleClick = e => {
    console.log("e", e);
  };
  const responseFacebook = response => {
    setFirstName(response.first_name);
    setLastName(response.last_name);
    setEmail(response.email);
    setPic(response.picture.data.url);
    setSignIn(true);
    console.log("resposne", response);
  };
  return (
    <div>
      <button onClick={handleFirebaseClick}>
        Try to sign in with firebase redirect
      </button>
      {console.log(provider)}
      <button onClick={() => Firebase.auth().signOut()}>
        Firebase signout
      </button>
      <button onClick={() => window.FB.logout()}>Sign out</button>
      FacebookLogin
      {isSignedIn ? (
        <>
          <h1>{`The name of FB: ${firstName} ${lastName}`}</h1>

          <h3>{email}</h3>
          <img src={profilePic} alt="fb" />
        </>
      ) : (
        <ReactFacebookLogin
          appId="239675496669332"
          onClick={handleClick}
          autoLoad={false}
          fields="first_name,last_name,email,picture"
          callback={responseFacebook}
        />
      )}
    </div>
  );
}
