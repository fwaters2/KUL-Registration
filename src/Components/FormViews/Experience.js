import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Experience() {
  const formData = React.useContext(FormContext);
  const exp = formData.values.exp.value;
  const isComplete = exp !== "";
  return (
    <>
      <MultipleChoice category="exp" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
