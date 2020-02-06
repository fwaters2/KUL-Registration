import React from "react";
import PaymentDetails from "./PaymentDetails";
import StepTitle from "../StepTitle";
import Referral from "./Referral";

export default function RegistrationComplete(props) {
  const { state } = props;

  return (
    <div>
      <StepTitle>Status</StepTitle>
      <div>Things to do next:</div>
      <PaymentDetails state={state} />
      <Referral state={state} />
    </div>
  );
}
