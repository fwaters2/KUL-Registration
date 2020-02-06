import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import StepTitle from "../StepTitle";

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

export default function Gender(props) {
  const { language, values, setValues } = props.state;
  const classes = useStyles();

  return (
    <React.Fragment>
      <StepTitle>{language.gender}</StepTitle>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant={values.gender === "Female" ? "outlined" : "contained"}
            className={classes.female}
            fullWidth
            onClick={() => setValues({ ...values, gender: "Female" })}
          >
            <i className="fas fa-venus fa-5x" />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={values.gender === "Male" ? "outlined" : "contained"}
            className={classes.male}
            fullWidth
            onClick={() => setValues({ ...values, gender: "Male" })}
          >
            <i className="fas fa-mars fa-5x" />
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
