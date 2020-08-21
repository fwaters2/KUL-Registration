import React from "react";
import { Button, Grid } from "@material-ui/core";
import StepTitle from "../StepTitle";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";
import FormStep from "../../Templates/FormStep";

export default function Gender() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const gender = values.gender.value;
  const isComplete = gender !== "";

  function updateGender(newGender) {
    setValues({ ...values, gender: { value: newGender } });
  }
  return (
    <FormStep stepTitleString={language.gender} isComplete={isComplete}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant={gender !== "Female" ? "outlined" : "contained"}
            style={
              gender !== "Female"
                ? {
                    height: 150,
                    color: "#F4796B", //light pink
                  }
                : {
                    height: 150,
                    color: "white",
                    backgroundColor: "#F4796B", //light pink
                  }
            }
            fullWidth
            onClick={() => updateGender("Female")}
          >
            {language.female}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={gender !== "Male" ? "outlined" : "contained"}
            style={
              gender !== "Male"
                ? {
                    height: 150,
                    color: "#232D65", //dark blue
                  }
                : {
                    height: 150,
                    color: "white",
                    backgroundColor: "#232D65", //dark blue
                  }
            }
            fullWidth
            onClick={() => updateGender("Male")}
          >
            {language.male}
          </Button>
        </Grid>
      </Grid>
    </FormStep>
  );
}
