import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

export default function Name(props) {
  const { language, values, setValues } = props.state;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            autoComplete="fname"
            id="standard-required"
            label={language.firstName}
            margin="normal"
            helperText={language.required}
            variant="outlined"
            value={values.firstName}
            autoFocus
            fullWidth
            onChange={e => setValues({ ...values, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            autoComplete="lname"
            id="standard-required"
            label={language.lastName}
            margin="normal"
            variant="outlined"
            helperText={language.required}
            fullWidth
            value={values.lastName}
            onChange={e => setValues({ ...values, lastName: e.target.value })}
          />
        </Grid>
      </Grid>
      <TextField
        id="standard-required"
        label={language.chName}
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.chName}
        onChange={e => setValues({ ...values, chName: e.target.value })}
      />
      <TextField
        id="standard-required"
        label={language.enName}
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.nickName}
        onChange={e => setValues({ ...values, nickName: e.target.value })}
      />
    </React.Fragment>
  );
}
