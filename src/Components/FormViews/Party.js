import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Party() {
  const formData = React.useContext(FormContext);
  const party = formData.values.party.value;
  const isComplete = party !== "";
  return (
    <>
      <MultipleChoice category="party" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
