import React from "react";
import { Grid, TextField, MenuItem, FormLabel } from "@material-ui/core";
import "./Sizes only.PNG";
import "./Jersey only.PNG";
import ButtonNavigation from "../../ButtonNavigation";
import FormContext from "../../FormContext";
import StepTitle from "../../StepTitle";
import FormStep from "../../../Templates/FormStep";
const JerseyShirt = require("./Jersey only.PNG");
const JerseySizes = require("./Sizes only.PNG");

export default function JerseyOrder() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const { jerseyBack, size, jerseyNum1, jerseyNum2 } = values.jersey;
  const handleChange = (field, value) => {
    setValues({ ...values, jersey: { ...values.jersey, [field]: value } });
  };
  const isComplete = size !== "";
  return (
    <FormStep stepTitleString={language.teamJersey} isComplete={isComplete}>
      <div style={{ flex: 1, marginTop: "2em" }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <FormLabel>
              Unfortunately we can't guarantee the sizes as teams aren't
              determined until the day before the tournament, but we'll have all
              sizes available for each team (need chinese)
            </FormLabel>
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
              <MenuItem value={"XS"}>XS</MenuItem>
              <MenuItem value={"S"}>S</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"XL"}>XL</MenuItem>
              <MenuItem value={"2XL"}>2XL</MenuItem>
            </TextField>
            {/* </Select>
          </FormControl> */}
          </Grid>
        </Grid>
      </div>
    </FormStep>
  );
}
