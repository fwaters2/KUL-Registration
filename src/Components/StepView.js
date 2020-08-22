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
import Hotel from "./FormViews/Hotel";
import FavoriteSong from "./FormViews/FavoriteSong";
import Birthday from "./FormViews/Birthday";
export const steps = [
  <Name />,
  <Birthday />,
  <FavoriteSong />,
  <Gender />,
  <Height />,
  <Skills />,
  <Experience />,
  <Athletecism />,
  <Contact />,
  <UploadImage />,
  <JerseyOrder />,
  <Hotel />,
  <Checkout />,
];

export default function StepView({ step }) {
  return steps[step] || <div>Step Not found</div>;
}
