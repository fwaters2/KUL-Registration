import React from "react";
import {
  TextField,
  Button,
  Divider,
  Typography,
  Grid,
} from "@material-ui/core";
import firebase from "../../Firebase";
import initialUserData from "./initialUserData.json";
import initialRegistrationData from "./initialRegData.json";
import AuthContext from "../AuthContext";
import FormContext from "../FormContext";
import FacebookLogin from "../FacebookLogin";
import StepTitle from "../StepTitle.js";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

export default function Register() {
  const authInfo = React.useContext(AuthContext);
  const formData = React.useContext(FormContext);
  const { language, setValues, values } = formData;
  const { setIsLoading, setRegDocId } = authInfo;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isLoggingIn, toggleIsLoggingIn] = React.useState(false);
  const validated = isLoggingIn
    ? email !== "" && password !== ""
    : email !== "" && password !== "" && password === password2;
  const [open, setOpen] = React.useState(false);

  // Dialog state management

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log("result", result);
          console.log("redirct successful, token:", token);
          // ...
        }
        // The signed-in user info.
        // var user = result.user;
      })
      .catch(function (error) {
        console.log("returning redirect error", error);
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
      });
  }, []);

  const handleRegistration = (e) => {
    if (isLoggingIn) {
      e.preventDefault();
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          let errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      e.preventDefault();
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userRef) => {
          setIsLoading(true);
          const userId = userRef.user.uid;
          console.log("Creating Registration doc for user: ", userId);
          const db = firebase.firestore();

          const registrationColRef = db.collection("Registration");

          registrationColRef
            .add({
              ...initialRegistrationData,
              email,
              contact: { ...initialRegistrationData.contact, email },
              userId: userId,
              created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((regRef) => {
              console.log("Creating user document and adding registration id");
              const newRegDocId = regRef.id;
              setRegDocId(newRegDocId);
              setValues({ ...values, userId });
              const userDocRef = db.collection("Users").doc(userId);
              userDocRef.set({
                ...initialUserData,
                email: email,
                registrationId: newRegDocId,
                created: firebase.firestore.FieldValue.serverTimestamp(),
              });
            })
            .then((data) => {
              console.log("final step of registering completed, data:", data);
              setIsLoading(false);
            })

            .catch((error) =>
              console.log(
                "There was an error creating documents after creating new user",
                error
              )
            );
        })
        .catch((error) => {
          let errorMessage = error.message;
          alert(errorMessage);
        });
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2em" }}>
        <StepTitle>
          {isLoggingIn ? "Welcome Back!" : "Register Account"}
        </StepTitle>
      </div>
      <div style={{ flex: 1 }}>
        {/* <FBButton /> */}
        <FacebookLogin
          text={isLoggingIn ? "Login with Facebook!" : "Register with Facebook"}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "2em",
            marginBottom: "1em",
          }}
        >
          <Divider style={{ flex: 1 }} />
          <div style={{ margin: "0 2em" }}>
            <Typography>OR</Typography>
          </div>
          <Divider style={{ flex: 1 }} />
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="email"
          id="registerEmail"
          label={language.email}
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label={isLoggingIn ? "Password" : language.choosePassword}
          type="password"
          id="registerPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        {!isLoggingIn && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label={"Retype Password"}
            type="password"
            id="registerPassword2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            autoComplete="current-password"
          />
        )}
        <Grid container justify="flex-end">
          {isLoggingIn ? (
            <Grid item xs onClick={() => setOpen(true)}>
              <Typography variant="body2" style={{ color: "#0645AD" }}>
                Forgot password?
              </Typography>
            </Grid>
          ) : null}
          <Grid item onClick={() => toggleIsLoggingIn(!isLoggingIn)}>
            <Typography variant="body2" style={{ color: "#0645AD" }}>
              {isLoggingIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign in"}
            </Typography>
          </Grid>
        </Grid>
        {/* <div style={{ margin: "1em", textAlign: "center" }}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => toggleIsLoggingIn(!isLoggingIn)}
          >
            {isLoggingIn
              ? "Register new account"
              : "Complete Previous Registration"}
          </Button>
        </div> */}
      </div>
      <Button
        type="submit"
        disabled={!validated}
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleRegistration}
      >
        {isLoggingIn ? "Sign In" : language.register}
      </Button>
      <ForgotPasswordDialog open={open} handleClose={handleClose} />
    </div>
  );
}
