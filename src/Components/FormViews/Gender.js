import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import StepTitle from "../StepTitle";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";

const useStyles = makeStyles(theme => ({
  female: {
    height: 150,
    color: "deepPink"
  },
  male: {
    height: 150,
    color: "blue"
  },
  footer: {
    marginTop: theme.spacing(1),
    flexGrow: 1
  }
}));

export default function Gender() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const gender = values.gender.value;
  const isComplete = gender !== "";
  const classes = useStyles();

  function updateGender(newGender) {
    setValues({ ...values, gender: { value: newGender } });
  }
  return (
    <React.Fragment>
      <StepTitle>{language.gender}</StepTitle>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant={gender === "Female" ? "outlined" : "contained"}
            className={classes.female}
            fullWidth
            onClick={() => updateGender("Female")}
          >
            <i className="fas fa-venus fa-5x" />
          </Button>
        </Grid>
        <Grid item xs={6}>
          {console.log("genderTest", gender)}
          <Button
            variant={gender === "Male" ? "outlined" : "contained"}
            className={classes.male}
            fullWidth
            onClick={() => updateGender("Male")}
          >
            <i className="fas fa-mars fa-5x" />
          </Button>
        </Grid>
      </Grid>
      <ButtonNavigation isComplete={isComplete} />
    </React.Fragment>
  );
}
