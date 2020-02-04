import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Button } from "@material-ui/core";
import "./Flags/Flag_of_the_United_States.svg";
import "./Flags/Flag_of_Canada_(Pantone).svg";
import "./Flags/Flag_of_the_Republic_of_China.svg";
import "./Flags/Flag_of_the_United_Kingdom.svg";
import "./Flags/Flag_of_Iraq.svg";
import "./Flags/Flag_of_Australia_(converted).svg";
import "./Flags/Flag_of_Palau.svg";
import "./Flags/Flag_of_South_Africa.svg";
import "./Flags/Flag_of_the_Philippines.svg";
// const flagUSA = require("./Flags/Flag_of_the_United_States.svg");
// const flagCanada = require("./Flags/Flag_of_Canada_(Pantone).svg");
// const flagTaiwan = require("./Flags/Flag_of_the_Republic_of_China.svg");
// const flagEngland = require("./Flags/Flag_of_the_United_Kingdom.svg");
// const flagIraq = require("./Flags/Flag_of_Iraq.svg");
// const flagAustralia = require("./Flags/Flag_of_Australia_(converted).svg");
// const flagPalau = require("./Flags/Flag_of_Palau.svg");
// const flagSA = require("./Flags/Flag_of_South_Africa.svg");
// const flagPhil = require("./Flags/Flag_of_the_Philippines.svg");
var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];
export default function Nationality(props) {
  const { language, handleChange, values, step, stepChange, classes } = props;
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
  //     item
  //     xs={size}
  //     onClick={handleComplexChange("nationality", country)}
  //     container
  //     justify="center"
  //   >
  //     <Button

  //       style={{ height: height, padding: 0 }}
  //       variant={values.nationality === country ? "outlined" : "contained"}
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
  //           filter={values.nationality === country ? "url(#greyscale)" : null}
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

  return (
    <React.Fragment>
      {/* {svgExperiment()} */}
      <br />
      <TextField
        autoFocus
        id="country"
        label={language.otherCountry}
        fullWidth
        value={values.nationality}
        select
        onChange={handleChange("nationality")}
      >
        {country_list.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Grid container className={classes.footer} spacing={3}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => stepChange(step - 1)}
          >
            {language.back}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disabled={!values.nationality}
            onClick={() => stepChange(step + 1)}
          >
            {language.next}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
