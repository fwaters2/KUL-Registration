import React from "react";
import steps from "./steps.json";
import Name from "./FormViews/Name";
import Birthday from "./FormViews/Birthday";
import Nationality from "./FormViews/Nationality/Nationality";
import Returning from "./FormViews/Returning";
import Gender from "./FormViews/Gender";
import Height from "./FormViews/Height";
import MultipleChoice from "./FormViews/MultipleChoice";
import Contact from "./FormViews/Contact";
import Commitments from "./FormViews/Commitments";
import JerseyOrder from "./FormViews/Jersey/JerseyOrder.js";
import Carousel from "./FormViews/Swag/Carousel.js";
import Checkout from "./FormViews/Checkout.js";
import UploadImage from "./FormViews/UploadImage/UploadImage.js";
import Skills from "./FormViews/Skills.js";
import Experience from "./FormViews/Experience.js";
import Athletecism from "./FormViews/Athletecism.js";
import English from "./FormViews/English.js";
import Chinese from "./FormViews/Chinese.js";
import Party from "./FormViews/Party.js";
import Improve from "./FormViews/Improve.js";

export default function StepView({ step }) {
  switch (step) {
    case 0:
      return <Name />;
    case 1:
      return <Birthday />;
    case 2:
      return <Nationality />;
    case 3:
      return <Returning />;
    case 4:
      return <Gender />;
    case 5:
      return <Height />;
    case 6:
      return <Skills />;
    case 7:
      return <Experience />;
    case 8:
      return <Athletecism />;
    case 9:
      return <Contact />;
    case 10:
      return <English />;
    case 11:
      return <Chinese />;
    case 12:
      return <Party />;
    case 13:
      return <Improve />;
    case 14:
      return <UploadImage />;
    case 15:
      return <Commitments />;
    case 16:
      return <JerseyOrder />;
    case 17:
      return <Carousel />;
    case 18:
      return <Checkout />;
    default:
      return steps[step].step;
  }
}
