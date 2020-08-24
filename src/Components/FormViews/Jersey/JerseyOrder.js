import React from "react";
import { Grid, TextField, MenuItem, FormLabel } from "@material-ui/core";
import "./Sizes only.PNG";
import "./Jersey only.PNG";
import FormContext from "../../FormContext";
import FormStep from "../../../Templates/FormStep";

export default function JerseyOrder() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const { size } = values.jersey;
  const handleChange = (field, value) => {
    setValues({ ...values, jersey: { ...values.jersey, [field]: value } });
  };
  const isComplete = size !== "";
  return (
    <FormStep stepTitleString={language.teamJersey} isComplete={isComplete}>
      <div style={{ flex: 1, marginTop: "2em" }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <FormLabel>{language.jerseyExplanation}</FormLabel>
            <TextField
              select
              id="standard-required"
              label={language.size}
              margin="normal"
              variant="outlined"
              helperText={language.required}
              fullWidth
              type="number"
              value={size}
              onChange={(e) => handleChange("size", e.target.value)}
            >
              {/* <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel}>{language.size}</InputLabel>
            <Select
              fullWidth
              value={size}
              onChange={e => handleChange("size", e.target.value)}
              input={
                <Input
                //labelWidth={labelWidth}
                />
              }
            > */}

              <MenuItem value={"S"}>S</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"XL"}>XL</MenuItem>
            </TextField>
            {/* </Select>
          </FormControl> */}
          </Grid>
        </Grid>
      </div>
    </FormStep>
  );
}
