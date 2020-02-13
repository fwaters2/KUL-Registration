import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function English() {
  const formData = React.useContext(FormContext);
  const english = formData.values.english.value;
  const isComplete = english !== "";
  return (
    <>
      <MultipleChoice category="english" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
