import React from "react";
import { TextField, MenuItem, Grid, Button } from "@material-ui/core";
import { country_list } from "./natAssets";
import "./Flags/Flag_of_the_United_States.svg";
import "./Flags/Flag_of_Canada_(Pantone).svg";
import "./Flags/Flag_of_the_Republic_of_China.svg";
import "./Flags/Flag_of_the_United_Kingdom.svg";
import "./Flags/Flag_of_Iraq.svg";
import "./Flags/Flag_of_Australia_(converted).svg";
import "./Flags/Flag_of_Palau.svg";
import "./Flags/Flag_of_South_Africa.svg";
import "./Flags/Flag_of_the_Philippines.svg";
const flagUSA = require("./Flags/Flag_of_the_United_States.svg");
const flagCanada = require("./Flags/Flag_of_Canada_(Pantone).svg");
const flagTaiwan = require("./Flags/Flag_of_the_Republic_of_China.svg");
const flagEngland = require("./Flags/Flag_of_the_United_Kingdom.svg");
const flagIraq = require("./Flags/Flag_of_Iraq.svg");
const flagAustralia = require("./Flags/Flag_of_Australia_(converted).svg");
const flagPalau = require("./Flags/Flag_of_Palau.svg");
const flagSA = require("./Flags/Flag_of_South_Africa.svg");
const flagPhil = require("./Flags/Flag_of_the_Philippines.svg");

export default function Nationality(props) {
  const { language, values, setValues } = props.state;
  const nationality = values.value;
  const rowOne = [{ country: "Taiwan", image: flagTaiwan }];
  const rowTwo = [
    { country: "United States", image: flagUSA },
    { country: "Canada", image: flagCanada }
  ];
  const rowThree = [
    { country: "United Kingdom", image: flagEngland },
    { country: "Iraq", image: flagIraq },
    { country: "Australia", image: flagAustralia },
    { country: "Palau", image: flagPalau },
    { country: "South Africa", image: flagSA },
    { country: "Philippines", image: flagPhil }
  ];

  const svgButton = (country, image, size, height) => (
    <Grid
      key={country}
      item
      xs={size}
      onClick={() => setValues("value", country)}
      container
      justify="center"
    >
      <Button
        style={{ height: height, padding: 0 }}
        variant={nationality === country ? "outlined" : "contained"}
      >
        <svg>
          <filter id="greyscale">
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                           0.33 0.33 0.33 0 0
                           0.33 0.33 0.33 0 0
                           0 0 0 1 0"
            />
          </filter>
          <image
            id={country}
            href={image}
            width="100%"
            filter={nationality !== country ? "url(#greyscale)" : null}
          />
        </svg>
      </Button>
    </Grid>
  );

  function svgExperiment() {
    return (
      <React.Fragment>
        <Grid spacing={2} container>
          {rowOne.map(flag =>
            svgButton(flag.country, flag.image, flag.size, "160px")
          )}
          {rowTwo.map(flag => svgButton(flag.country, flag.image, 6, "83px"))}
          {rowThree.map(flag => svgButton(flag.country, flag.image, 2, "32px"))}
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {svgExperiment()}
      <br />
      <TextField
        autoFocus
        id="country"
        label={language.otherCountry}
        fullWidth
        value={nationality}
        select
        onChange={e => setValues("value", e.target.value)}
      >
        {country_list.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );
}
