import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

export default function Name(props) {
  const { language, values, setValues, isStepCompleted } = props.state;
  const { firstName, lastName, chName, nickname } = values;

  return (
    <React.Fragment>
      {console.log(
        "resulr in name component",
        isStepCompleted("names", ["firstName", "lastName"])
      )}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            autoComplete="fname"
            label={language.firstName}
            margin="normal"
            helperText={language.required}
            variant="outlined"
            value={firstName}
            autoFocus
            fullWidth
            onChange={e => setValues("firstName", e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            autoComplete="lname"
            label={language.lastName}
            margin="normal"
            variant="outlined"
            helperText={language.required}
            fullWidth
            value={lastName}
            onChange={e => setValues("lastName", e.target.value)}
          />
        </Grid>
      </Grid>
      <TextField
        label={language.chName}
        fullWidth
        margin="normal"
        variant="outlined"
        value={chName}
        onChange={e => setValues("chName", e.target.value)}
      />
      <TextField
        label={language.enName}
        fullWidth
        margin="normal"
        variant="outlined"
        value={nickname}
        onChange={e => setValues("nickname", e.target.value)}
      />
    </React.Fragment>
  );
}
