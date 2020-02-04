import React from "react";
import steps from "./steps.json";

const tempStep = 1;
export default function StepView() {
  return <div>{steps[tempStep].step}</div>;
}
