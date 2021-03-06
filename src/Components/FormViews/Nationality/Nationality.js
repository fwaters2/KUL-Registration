import React from "react";
import {
  TextField,
  MenuItem,
  //Grid,
  //Button,
  Box,
  Divider
} from "@material-ui/core";
import { country_list } from "./natAssets";
// import "./Flags/Flag_of_the_United_States.svg";
// import "./Flags/Flag_of_Canada_(Pantone).svg";
// import "./Flags/Flag_of_the_Republic_of_China.svg";
// import "./Flags/Flag_of_the_United_Kingdom.svg";
// import "./Flags/Flag_of_Iraq.svg";
// import "./Flags/Flag_of_Australia_(converted).svg";
// import "./Flags/Flag_of_Palau.svg";
// import "./Flags/Flag_of_South_Africa.svg";
// import "./Flags/Flag_of_the_Philippines.svg";
import FormContext from "../../FormContext";
import ButtonNavigation from "../../ButtonNavigation";
import StepTitle from "../../StepTitle";
import WorldMap from "./WorldMap";
// const flagUSA = require("./Flags/Flag_of_the_United_States.svg");
// const flagCanada = require("./Flags/Flag_of_Canada_(Pantone).svg");
// const flagTaiwan = require("./Flags/Flag_of_the_Republic_of_China.svg");
// const flagEngland = require("./Flags/Flag_of_the_United_Kingdom.svg");
// const flagIraq = require("./Flags/Flag_of_Iraq.svg");
// const flagAustralia = require("./Flags/Flag_of_Australia_(converted).svg");
// const flagPalau = require("./Flags/Flag_of_Palau.svg");
// const flagSA = require("./Flags/Flag_of_South_Africa.svg");
// const flagPhil = require("./Flags/Flag_of_the_Philippines.svg");

export default function Nationality() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const nationality = values.nationality.value;
  const isComplete = nationality !== "";
  const handleChange = e => {
    setValues({ ...values, nationality: { value: e.target.value } });
  };
  // const handleClick = country => {
  //   setValues({ ...values, nationality: { value: country } });
  // };

  // const rowOne = [{ country: "Taiwan", image: flagTaiwan }];
  // const rowTwo = [
  //   { country: "United States", image: flagUSA },
  //   { country: "Canada", image: flagCanada }
  // ];
  // const rowThree = [
  //   { country: "United Kingdom", image: flagEngland },
  //   { country: "Iraq", image: flagIraq },
  //   { country: "Australia", image: flagAustralia },
  //   { country: "Palau", image: flagPalau },
  //   { country: "South Africa", image: flagSA },
  //   { country: "Philippines", image: flagPhil }
  // ];

  // const svgButton = (country, image, size, height) => (
  //   <Grid
  //     key={country}
  //     item
  //     xs={size}
  //     onClick={() => handleClick(country)}
  //     container
  //     justify="center"
  //   >
  //     <Button
  //       style={{ height: height, padding: 0 }}
  //       variant={nationality === country ? "outlined" : "contained"}
  //     >
  //       <svg>
  //         <filter id="greyscale">
  //           <feColorMatrix
  //             type="matrix"
  //             values="0.33 0.33 0.33 0 0
  //                          0.33 0.33 0.33 0 0
  //                          0.33 0.33 0.33 0 0
  //                          0 0 0 1 0"
  //           />
  //         </filter>
  //         <image
  //           id={country}
  //           href={image}
  //           width="100%"
  //           filter={nationality !== country ? "url(#greyscale)" : null}
  //         />
  //       </svg>
  //     </Button>
  //   </Grid>
  // );

  // function svgExperiment() {
  //   return (
  //     <React.Fragment>
  //       <Grid spacing={2} container>
  //         {rowOne.map(flag =>
  //           svgButton(flag.country, flag.image, flag.size, "160px")
  //         )}
  //         {rowTwo.map(flag => svgButton(flag.country, flag.image, 6, "83px"))}
  //         {rowThree.map(flag => svgButton(flag.country, flag.image, 2, "32px"))}
  //       </Grid>
  //     </React.Fragment>
  //   );
  // }
  const commonSelections = [
    "Taiwan",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Iraq",
    "South Africa",
    "Philippines",
    "Palau",
    "Ireland"
  ];

  return (
    <>
      <StepTitle>{language.nationality}</StepTitle>

      <TextField
        autoFocus
        select
        id="country"
        label={language.otherCountry}
        fullWidth
        value={nationality}
        onChange={handleChange}
      >
        {commonSelections.map(option => (
          <MenuItem key={option} value={option}>
            <strong>{option}</strong>
          </MenuItem>
        ))}
        <Divider />
        {country_list.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Box marginY="1em">
        <WorldMap />
      </Box>

      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
