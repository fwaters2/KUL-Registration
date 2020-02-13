import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Athletecism() {
  const formData = React.useContext(FormContext);
  const athl = formData.values.athl.value;
  const isComplete = athl !== "";
  return (
    <>
      <MultipleChoice category="athl" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
