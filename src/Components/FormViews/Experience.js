import React from "react";
import MultipleChoice from "./MultipleChoice";
import FormContext from "../FormContext";
import FormStep from "../../Templates/FormStep";

export default function Experience() {
  const formData = React.useContext(FormContext);
  const exp = formData.values.exp.value;
  const isComplete = exp !== "";
  return (
    <FormStep isComplete={isComplete}>
      <MultipleChoice category="exp" />
    </FormStep>
  );
}
