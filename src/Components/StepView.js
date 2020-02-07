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

export default function StepView(props) {
  const { step, values, setValues, language } = props.state;

  let state = {
    language,
    values: values[steps[step]],
    setValues: (attribute, value) =>
      setValues({
        ...values,
        [steps[step]]: { ...values[steps[step]], [attribute]: value }
      })
  };

  switch (step) {
    case 0:
      return <Name state={state} />;
    case 1:
      return <Birthday state={state} />;
    case 2:
      return <Nationality state={state} />;
    case 3:
      return <Returning state={state} />;
    case 4:
      return <Gender state={state} />;
    case 5:
      return <Height state={state} />;
    case 6:
      return <MultipleChoice category={"skills"} state={state} />;
    case 7:
      return <MultipleChoice category={"exp"} state={state} />;
    case 8:
      return <MultipleChoice category={"athl"} state={state} />;
    case 9:
      return <Contact state={state} />;
    case 10:
      return <MultipleChoice category={"english"} state={state} />;
    case 11:
      return <MultipleChoice category={"chinese"} state={state} />;
    case 12:
      return <MultipleChoice category={"party"} state={state} />;
    case 13:
      return <MultipleChoice category={"improve"} state={state} />;
    case 14:
      return <Commitments state={state} />;
    case 15:
      return <JerseyOrder state={state} />;
    case 16:
      return <Carousel state={state} />;
    case 17:
      return <Checkout state={props.state} />;
    default:
      return steps[step].step;
  }
}
