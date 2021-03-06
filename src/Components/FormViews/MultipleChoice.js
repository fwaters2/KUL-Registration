import React from "react";
import { Button, Grid } from "@material-ui/core";
import StepTitle from "../StepTitle";
import FormContext from "../FormContext";

export default function MultipleChoice({ category }) {
  const formData = React.useContext(FormContext);

  const { language, values, setValues } = formData;

  const choices = {
    skills: {
      options: [
        {
          display: language.skillOptions[0],
          value: "New",
        },
        {
          display: language.skillOptions[1],
          value: "Cutter",
        },
        {
          display: language.skillOptions[2],
          value: "2nd Handler",
        },
        {
          display: language.skillOptions[3],
          value: "Handler",
        },
      ],
    },
    exp: {
      options: [
        { display: language.expOptions[0], value: "Newbie" },
        { display: language.expOptions[1], value: "Rookie" },
        { display: language.expOptions[2], value: "Intermediate" },
        { display: language.expOptions[3], value: "Experienced" },

        { display: language.expOptions[4], value: "Expert" },
      ],
    },
    athl: {
      options: [
        {
          display: language.athlOptions[0],
          value: "Slowest",
        },
        {
          display: language.athlOptions[1],
          value: "Slow",
        },
        {
          display: language.athlOptions[2],
          value: "Average",
        },
        {
          display: language.athlOptions[3],
          value: "Fast",
        },
        {
          display: language.athlOptions[4],
          value: "Fastest",
        },
      ],
    },

    english: {
      options: [
        { display: language.native, value: "Native" },
        { display: language.fluent, value: "Fluent" },
        { display: language.intermediate, value: "Intermediate" },
        { display: language.learning, value: "Learning!" },
        { display: language.nonExistent, value: "Non-existent" },
      ],
    },
    chinese: {
      options: [
        { display: language.native, value: "Native" },
        { display: language.fluent, value: "Fluent" },
        { display: language.intermediate, value: "Intermediate" },
        { display: language.learning, value: "Learning!" },
        { display: language.nonExistent, value: "Non-existent" },
      ],
    },

    party: {
      options: [
        { display: language.intOption1, value: "High" },
        { display: language.intOption2, value: "Middle" },
        { display: language.intOption3, value: "Low" },
      ],
    },
    improve: {
      options: [
        { display: language.intOption1, value: "High" },
        { display: language.intOption2, value: "Middle" },
        { display: language.intOption3, value: "Low" },
      ],
    },
  };
  return (
    <React.Fragment>
      <StepTitle>{language[category]}</StepTitle>
      <Grid container spacing={1} style={{ flex: 1, marginTop: "2em" }}>
        {choices[category].options.map((option) => (
          <Grid item xs={12} key={option.value}>
            <Button
              style={{ height: "100%" }}
              id={option.value}
              color={
                option.value !== values[category].value
                  ? "primary"
                  : "secondary"
              }
              onClick={(e) =>
                setValues({
                  ...values,
                  [category]: { value: e.currentTarget.id },
                })
              }
              fullWidth
              variant={
                option.value !== values[category].value
                  ? "outlined"
                  : "contained"
              }
            >
              {option.display}
            </Button>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
