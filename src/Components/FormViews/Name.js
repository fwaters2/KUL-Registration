import React from "react";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";
import StepTitle from "../StepTitle";

export default function Name() {
  const contextData = React.useContext(FormContext);

  const { language, values, setValues } = contextData;
  const { firstName, lastName, chName, nickname } = values.names;

  const isComplete = firstName !== "" && lastName !== "";
  const handleChange = (fieldName) => (e) => {
    setValues({
      ...values,
      names: { ...values.names, [fieldName]: e.target.value },
    });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "2em" }}>
        <StepTitle>{language.basicInfo}</StepTitle>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
              onChange={handleChange("firstName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              autoComplete="lname"
              label={language.lastName}
              margin="normal"
              variant="outlined"
              helperText={language.required}
              fullWidth
              value={lastName}
              onChange={handleChange("lastName")}
            />
          </Grid>
        </Grid>

        <TextField
          label={language.enName}
          fullWidth
          margin="normal"
          variant="outlined"
          value={nickname}
          onChange={handleChange("nickname")}
        />
      </div>
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
