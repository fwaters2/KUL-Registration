import React from "react";
import {
  TextField,
  Button,
  Divider,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import firebase from "../../Firebase";

//import AuthContext from "../AuthContext";
import FormContext from "../FormContext";
import FacebookLogin from "../FacebookLogin";
import StepTitle from "../StepTitle.js";
import ForgotPasswordDialog from "./ForgotPasswordDialog";

export default function Register() {
  // const authInfo = React.useContext(AuthContext);
  const formData = React.useContext(FormContext);
  const {
    language,
    // setValues, values
  } = formData;
  // const { setIsLoading, setRegDocId } = authInfo;
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

  const handleRegistration = (e) => {
    if (isLoggingIn) {
      e.preventDefault();
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          let errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      e.preventDefault();
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userRef) => {
          console.log("user successfully created with email and password");
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
          {isLoggingIn ? language.welcomeBack : language.registerAccount}
        </StepTitle>
      </div>
      <div style={{ flex: 1 }}>
        {/* <FBButton /> */}
        <FacebookLogin text={language.loginWithFacebook} />
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
            <Typography>{language.or}</Typography>
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
          label={isLoggingIn ? language.password : language.choosePassword}
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
            label={language.retypePassword}
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
              <Typography
                component={Link}
                variant="body2"
                style={{ color: "#0645AD" }}
              >
                {language.forgotPassword}
              </Typography>
            </Grid>
          ) : null}
          <Grid item onClick={() => toggleIsLoggingIn(!isLoggingIn)}>
            <Typography variant="body2" style={{ color: "#0645AD" }}>
              {isLoggingIn ? language.noAccount : language.alreadyStarted}
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
        {isLoggingIn ? language.signIn : language.register}
      </Button>
      <ForgotPasswordDialog open={open} handleClose={handleClose} />
    </div>
  );
}
