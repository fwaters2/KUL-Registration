import React from "react";
import Name from "./FormViews/Name";
import Gender from "./FormViews/Gender";
import Height from "./FormViews/Height";
import Contact from "./FormViews/Contact";

import JerseyOrder from "./FormViews/Jersey/JerseyOrder.js";
import Checkout from "./FormViews/Checkout.js";
import UploadImage from "./FormViews/UploadImage/UploadImage.js";
import Skills from "./FormViews/Skills.js";
import Experience from "./FormViews/Experience.js";
import Athletecism from "./FormViews/Athletecism.js";
import Birthday from "./FormViews/Birthday";
import Commitments from "./FormViews/Commitments";

// "birthday",
// "nationality",
// "returning",
// "gender",
// "height",
// "skills",
// "exp",
// "athl",
// "contact",
// "english",
// "chinese",
// "party",
// "improve",
// "selfie",
// "commitments",
// "jersey",
// "swag",
// "checkout"
const stepManipulation = [
  {
    name: "names",
    component: <Name />,
  },
  {
    name: "birthday",
    component: <Birthday />,
  },
  {
    name: "gender",
    component: <Gender />,
  },
  {
    name: "height",
    component: <Height />,
  },
  {
    name: "skills",
    component: <Skills />,
  },
  {
    name: "exp",
    component: <Experience />,
  },
  {
    name: "athl",
    component: <Athletecism />,
  },
  {
    name: "contact",
    component: <Contact />,
  },
  {
    name: "selfie",
    component: <UploadImage />,
  },
  {
    name: "commitments",
    component: <Commitments />,
  },
  {
    name: "jersey",
    component: <JerseyOrder />,
  },
  {
    name: "checkout",
    component: <Checkout />,
  },
];
export const stepNames = stepManipulation.map((step) => step.name);
export const steps = stepManipulation.map((step) => step.component);

export default function StepView({ step }) {
  return steps[step] || <div>Step Not found</div>;
}
