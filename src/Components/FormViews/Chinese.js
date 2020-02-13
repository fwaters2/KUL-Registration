import React from "react";
import MultipleChoice from "./MultipleChoice";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Chinese() {
  const formData = React.useContext(FormContext);
  const chinese = formData.values.chinese.value;
  const isComplete = chinese !== "";
  return (
    <>
      <MultipleChoice category="chinese" />
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
