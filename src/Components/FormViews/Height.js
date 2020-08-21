import React from "react";
import { Slider, Grid, Typography, makeStyles } from "@material-ui/core";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";
import StepTitle from "../StepTitle";
import FormStep from "../../Templates/FormStep";

const useStyles = makeStyles({
  vertSlider: {
    textAlign: "center",
    height: 300,
  },
});

export default function Height() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const classes = useStyles();
  const height = values.height.value;
  function unitConverter(cm) {
    let alltheinches = Math.floor(cm / 2.54);
    let inches = alltheinches % 12;
    let feet = Math.floor(alltheinches / 12);
    return feet + "ft " + inches + "in";
  }
  const isComplete = height !== null;
  return (
    <FormStep stepTitleString={language.height} isComplete={isComplete}>
      <Grid container alignItems="center" style={{ marginTop: "2em" }}>
        <Grid item xs={8} container justify="center">
          {height === null ? (
            <Typography variant="h6">{language.tall}</Typography>
          ) : (
            <Typography variant="h3">
              {height}
              {language.cm}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} className={classes.vertSlider}>
          <Slider
            color="secondary"
            defaultValue={170}
            value={height}
            onChange={(e, value) =>
              setValues({ ...values, height: { value: value } })
            }
            aria-labelledby="input-slider"
            orientation="vertical"
            min={140}
            max={220}
            valueLabelDisplay="on"
            valueLabelFormat={unitConverter}
          />
        </Grid>
      </Grid>
    </FormStep>
  );
}
