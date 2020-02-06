import React from "react";
import MultipleChoice from "../MultipleChoice";
import { Grid, Button } from "@material-ui/core";

export default function Experience(props) {
  const { language, classes, values, step, stepChange } = props;

  const handleButtonClick = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <React.Fragment>
      <MultipleChoice
        language={language}
        classes={classes}
        category="EXP"
        values={values}
        handleButtonClick={handleButtonClick}
        step={step}
        stepChange={stepChange}
      />
      <Grid container className={classes.footer} spacing={3}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => stepChange(step - 1)}
          >
            {language.back}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disabled={!values.EXP}
            onClick={() => stepChange(step + 1)}
          >
            {language.next}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
