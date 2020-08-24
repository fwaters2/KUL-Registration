import React from "react";
import { Grid, FormLabel, Button } from "@material-ui/core";

import FormContext from "../FormContext";

import FormStep from "../../Templates/FormStep";

export default function Hotel() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const hotel = values.hotel.value;
  const isComplete = hotel !== "";

  function updateChoice(newChoice) {
    setValues({ ...values, hotel: { value: newChoice } });
  }
  return (
    <FormStep
      stepTitleString={language.hotelAssistance}
      isComplete={isComplete}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginTop: "2em",
        }}
      >
        <FormLabel>{language.hotelQuestion}</FormLabel>
        <Grid container spacing={1} style={{ marginTop: "2em" }}>
          <Grid item xs={6}>
            <Button
              variant={hotel !== "Yes" ? "outlined" : "contained"}
              style={
                hotel !== "Yes"
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
              onClick={() => updateChoice("Yes")}
            >
              {language.yes}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={hotel !== "No" ? "outlined" : "contained"}
              style={
                hotel !== "No"
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
              onClick={() => updateChoice("No")}
            >
              {language.no}
            </Button>
          </Grid>
        </Grid>
      </div>
    </FormStep>
  );
}
