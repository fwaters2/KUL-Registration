import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid, Button } from "@material-ui/core";

export default function Birthday(props) {
  const { language, handleChange, values, step, stepChange, classes } = props;
  // const [month, changeMonth] = React.setState(06)
  // const [day, changeDay]=React.setState(17)
  // const [year, changeYear] = React.setState(1990)
  // function localBday(month, day, year){
  //   console.log("hello")

  // }
  return (
    <React.Fragment>
      {/* {localBday()} */}
      <i className="fas fa-birthday-cake fa-5x" />
      <TextField
        autoFocus
        id="date"
        label={language.birthday}
        type="date"
        value={values.birthday}
        //defaultValue="1990-01-01"
        onChange={handleChange("birthday")}
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
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
            disabled={!values.birthday}
            fullWidth
            onClick={() => stepChange(step + 1)}
          >
            {language.next}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
