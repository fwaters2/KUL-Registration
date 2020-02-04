import React from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "../../Firebase";

export default function SignIn(props) {
  const { language } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegistration = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        let errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <React.Fragment>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label={language.email}
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label={language.password}
        type="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleRegistration}
      >
        {language.signIn}
      </Button>
    </React.Fragment>
  );
}
