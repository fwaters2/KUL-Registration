import React from "react";
import { Button, Grid } from "@material-ui/core";

export default function MultipleChoice(props) {
  const { category } = props;
  const { language, values, handleButtonClick } = props.state;
  const choices = {
    Skills: {
      options: [
        {
          display: language.skillOptions[0],
          value: "New"
        },
        {
          display: language.skillOptions[1],
          value: "Cutter"
        },
        {
          display: language.skillOptions[2],
          value: "2nd Handler"
        },
        {
          display: language.skillOptions[3],
          value: "Handler"
        }
      ]
    },
    EXP: {
      options: [
        { display: language.expOptions[0], value: "Newbie" },
        { display: language.expOptions[1], value: "Rookie" },
        { display: language.expOptions[2], value: "Intermediate" },
        { display: language.expOptions[3], value: "Experienced" },

        { display: language.expOptions[4], value: "Expert" }
      ]
    },
    ATHL: {
      options: [
        {
          display: language.athlOptions[0],
          value: "Slowest"
        },
        {
          display: language.athlOptions[1],
          value: "Slow"
        },
        {
          display: language.athlOptions[2],
          value: "Average"
        },
        {
          display: language.athlOptions[3],
          value: "Fast"
        },
        {
          display: language.athlOptions[4],
          value: "Fastest"
        }
      ]
    },

    English: {
      options: [
        { display: language.native, value: "Native" },
        { display: language.fluent, value: "Fluent" },
        { display: language.intermediate, value: "Intermediate" },
        { display: language.learning, value: "Learning!" },
        { display: language.nonExistent, value: "Non-existent" }
      ]
    },
    Chinese: {
      options: [
        { display: language.native, value: "Native" },
        { display: language.fluent, value: "Fluent" },
        { display: language.intermediate, value: "Intermediate" },
        { display: language.learning, value: "Learning!" },
        { display: language.nonExistent, value: "Non-existent" }
      ]
    },

    Party: {
      options: [
        { display: language.intOption1, value: "High" },
        { display: language.intOption2, value: "Middle" },
        { display: language.intOption3, value: "Low" }
      ]
    },
    Improve: {
      options: [
        { display: language.intOption1, value: "High" },
        { display: language.intOption2, value: "Middle" },
        { display: language.intOption3, value: "Low" }
      ]
    }
  };
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {choices[category].options.map(option => (
          <Grid item xs={12} key={option.value}>
            <Button
              id={option.value}
              color={"primary"}
              onClick={e => handleButtonClick(category, e.currentTarget.id)}
              fullWidth
              variant={
                option.value === values[category] ? "outlined" : "contained"
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
