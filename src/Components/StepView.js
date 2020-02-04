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
  const { step } = props.state;

  switch (steps[step].step) {
    case "names":
      return <Name state={props.state} />;
    case "birthday":
      return <Birthday state={props.state} />;
    case "nationality":
      return <Nationality state={props.state} />;
    case "returning":
      return <Returning state={props.state} />;
    case "gender":
      return <Gender state={props.state} />;
    case "height":
      return <Height state={props.state} />;
    case "skills":
      return <MultipleChoice category={"skills"} state={props.state} />;
    case "experience":
      return <MultipleChoice category={"exp"} state={props.state} />;
    case "athletecism":
      return <MultipleChoice category={"athl"} state={props.state} />;
    case "contact":
      return <Contact state={props.state} />;
    case "english":
      return <MultipleChoice category={"english"} state={props.state} />;
    case "chinese":
      return <MultipleChoice category={"chinese"} state={props.state} />;
    case "party":
      return <MultipleChoice category={"party"} state={props.state} />;
    case "improve":
      return <MultipleChoice category={"improve"} state={props.state} />;
    case "commitments":
      return <Commitments state={props.state} />;
    case "jersey":
      return <JerseyOrder state={props.state} />;
    case "swag":
      return <Carousel state={props.state} />;
    case "checkout":
      return <Checkout state={props.state} />;
    default:
      return steps[step].step;
  }
}
