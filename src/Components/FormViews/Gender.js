import React from "react";
import { Button, Grid } from "@material-ui/core";
import StepTitle from "../StepTitle";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";

export default function Gender() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const gender = values.gender.value;
  const isComplete = gender !== "";

  function updateGender(newGender) {
    setValues({ ...values, gender: { value: newGender } });
  }
  return (
    <React.Fragment>
      <StepTitle>{language.gender}</StepTitle>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button
            variant={gender === "Female" ? "outlined" : "contained"}
            style={
              gender === "Female"
                ? {
                    height: 150,
                    color: "deepPink"
                  }
                : {
                    height: 150,
                    color: "white",
                    backgroundColor: "deepPink"
                  }
            }
            fullWidth
            onClick={() => updateGender("Female")}
          >
            <i className="fas fa-venus fa-5x" />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={gender === "Male" ? "outlined" : "contained"}
            style={
              gender === "Male"
                ? {
                    height: 150,
                    color: "blue"
                  }
                : {
                    height: 150,
                    color: "white",
                    backgroundColor: "blue"
                  }
            }
            fullWidth
            onClick={() => updateGender("Male")}
          >
            <i className="fas fa-mars fa-5x" />
          </Button>
        </Grid>
      </Grid>
      <ButtonNavigation isComplete={isComplete} />
    </React.Fragment>
  );
}
