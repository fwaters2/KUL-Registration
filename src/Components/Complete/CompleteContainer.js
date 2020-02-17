import React from "react";
import PaymentDetails from "./PaymentDetails";
import StepTitle from "../StepTitle";
import Referral from "./Referral";
import Firebase from "../../Firebase";
import FormContext from "../FormContext";

export default function RegistrationComplete(props) {
  const { state } = props;
  const [userStatus, setUserStatus] = React.useState("checking...");
  const [expanded, setExpanded] = React.useState(false);
  const regInfo = React.useContext(FormContext);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  React.useEffect(() => {
    Firebase.firestore()
      .collection("Users")
      .doc(regInfo.values.userId)
      .onSnapshot(snapshot => {
        console.log("userinfo", snapshot.data());
        setUserStatus(snapshot.data().status);
      });
  }, [regInfo.values.userId]);

  return (
    <div>
      <StepTitle>
        Status: <strong>{userStatus}</strong>
      </StepTitle>

      <PaymentDetails
        state={state}
        expanded={expanded}
        handleChange={handleChange}
      />
      <Referral state={state} expanded={expanded} handleChange={handleChange} />
    </div>
  );
}
