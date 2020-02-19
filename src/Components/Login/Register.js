import React from "react";
import { TextField, Button } from "@material-ui/core";
import firebase from "../../Firebase";
import initialUserData from "./initialUserData.json";
import initialRegistrationData from "./initialRegData.json";
import AuthContext from "../AuthContext";
import FormContext from "../FormContext";

export default function Register() {
  const authInfo = React.useContext(AuthContext);
  const formData = React.useContext(FormContext);
  const { language, setValues, values } = formData;
  const { isReferred, referralId, setIsLoading, setRegDocId } = authInfo;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleRegistration = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userRef => {
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
            created: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(regRef => {
            console.log("Creating user document and adding registration id");
            const newRegDocId = regRef.id;
            setRegDocId(newRegDocId);
            setValues({ ...values, userId });
            const userDocRef = db.collection("Users").doc(userId);
            userDocRef.set({
              ...initialUserData,
              email: email,
              registrationId: newRegDocId,
              wasReferred: isReferred,
              referredBy: isReferred ? referralId : null,
              created: firebase.firestore.FieldValue.serverTimestamp()
            });
            // formValues.setValues({
            //   {
            //     ...initialUserData,
            //     email: email,
            //     registrationId: regDocId,
            //     wasReferred: isReferred,
            //     referredBy: isReferred ? referralId : null,
            //     created: firebase.firestore.FieldValue.serverTimestamp()
            //   }
            // })
          })
          .then(data => {
            console.log("final step of registering completed, data:", data);
            setIsLoading(false);
          })

          .catch(error =>
            console.log(
              "There was an error creating documents after creating new user",
              error
            )
          );
      })
      .catch(error => {
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
        type="email"
        id="registerEmail"
        label={language.email}
        name="email"
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
        label={language.choosePassword}
        type="password"
        id="registerPassword"
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
        {language.register}
      </Button>
    </React.Fragment>
  );
}
