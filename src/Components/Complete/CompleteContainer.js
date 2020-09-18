import React from "react";
import PaymentDetails from "./PaymentDetails";
import StepTitle from "../StepTitle";
import Referral from "./Referral";
import Firebase from "../../Firebase";
import FormContext from "../FormContext";
import CopyLink from "./CopyLink";
import { Typography, Box, Button, TextField } from "@material-ui/core";
import FourDigits from "./FourDigits";

export default function RegistrationComplete(props) {
  const { state } = props;
  const [userStatus, setUserStatus] = React.useState("checking...");
  const [expanded, setExpanded] = React.useState(false);
  const [haveDigits, setHaveDigits] = React.useState(false);
  const regInfo = React.useContext(FormContext);
  const [digits, setDigits] = React.useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    Firebase.firestore()
      .collection("Users")
      .doc(regInfo.values.userId)
      .get()
      .then((doc) =>
        doc.data().status === "Transfer Pending"
          ? setHaveDigits(true)
          : setHaveDigits(false)
      );
    Firebase.firestore()
      .collection("Users")
      .doc(regInfo.values.userId)
      .onSnapshot((snapshot) => {
        console.log("userinfo", snapshot.data());
        setUserStatus(snapshot.data().status);
      });
  }, [regInfo.values.userId]);
  const handleRegisterAgain = async () => {
    await Firebase.auth().signOut();
    return window.location.reload();
  };
  const handleSubmit = () => {
    Firebase.firestore().collection("Users").doc(regInfo.values.userId).update({
      status: "Transfer Pending",
      fourDigits: digits,
      digitsSubmitted: Firebase.firestore.FieldValue.serverTimestamp(),
    });
    alert("Digits Submitted!");
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <StepTitle>
        Status: <strong>{userStatus}</strong>
      </StepTitle>
      <div style={{ flex: 1 }}>
        <PaymentDetails
          state={state}
          expanded={expanded}
          handleChange={handleChange}
        />
        <Box marginY="2em">
          <TextField
            fullWidth
            type="number"
            value={digits}
            onChange={(e) => setDigits(e.target.value)}
            variant="outlined"
            label="Last Four Digits of your account"
          />
          <Button
            fullWidth
            color={digits === "" ? "primary" : "secondary"}
            variant="contained"
            onClick={handleSubmit}
          >
            {!haveDigits ? regInfo.language.submitLastFour : "Change Digits"}
          </Button>
        </Box>
        <Box marginY="2em" style={{ textAlign: "center" }}>
          More info and player discussions over on{" "}
          <a href="https://discord.gg/r723EGk">Discord</a>!
        </Box>
      </div>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleRegisterAgain}
      >
        {regInfo.language.registerAgain}
      </Button>
    </div>
  );
}
