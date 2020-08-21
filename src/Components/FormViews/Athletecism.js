import React from "react";
import MultipleChoice from "./MultipleChoice";
import FormContext from "../FormContext";
import FormStep from "../../Templates/FormStep";

export default function Athletecism() {
  const formData = React.useContext(FormContext);
  const athl = formData.values.athl.value;
  const isComplete = athl !== "";
  return (
    <FormStep isComplete={isComplete}>
      <MultipleChoice category="athl" />
    </FormStep>
  );
}
