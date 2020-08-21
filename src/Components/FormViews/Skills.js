import React from "react";
import MultipleChoice from "./MultipleChoice";
import FormContext from "../FormContext";
import FormStep from "../../Templates/FormStep";

export default function Skills() {
  const formData = React.useContext(FormContext);
  const skills = formData.values.skills.value;
  const isComplete = skills !== "";
  return (
    <FormStep isComplete={isComplete}>
      <MultipleChoice category="skills" />
    </FormStep>
  );
}
