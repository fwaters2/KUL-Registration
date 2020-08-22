import React from "react";
import { Grid, FormLabel } from "@material-ui/core";

//import FormContext from "../FormContext";

import FormStep from "../../Templates/FormStep";

export default function Hotel() {
  // const formData = React.useContext(FormContext);
  // const { language, values, setValues } = formData;
  //const gender = values.gender.value;
  const isComplete = true; // gender !== "";

  //   function updateGender(newGender) {
  //     setValues({ ...values, gender: { value: newGender } });
  //   }
  return (
    <FormStep stepTitleString={"Hotel Assistance"} isComplete={isComplete}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormLabel>
            Would you be interesting in receiving accomodation information?
          </FormLabel>
        </Grid>
      </Grid>
    </FormStep>
  );
}
