import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

export default function Name(props) {
  const { language, handleChange, values } = props.state;

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
            onChange={handleChange("firstName")}
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
            onChange={handleChange("lastName")}
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
        onChange={handleChange("chName")}
      />
      <TextField
        id="standard-required"
        label={language.enName}
        fullWidth
        margin="normal"
        variant="outlined"
        value={values.nickName}
        onChange={handleChange("nickName")}
      />
    </React.Fragment>
  );
}
