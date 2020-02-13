import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Improve() {
  const formData = React.useContext(FormContext);
  const improve = formData.values.improve.value;
  const isComplete = improve !== "";
  return (
    <>
      <MultipleChoice category="improve" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
