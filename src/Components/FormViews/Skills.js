import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Skills() {
  const formData = React.useContext(FormContext);
  const skills = formData.values.skills.value;
  const isComplete = skills !== "";
  return (
    <>
      <MultipleChoice category="skills" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
