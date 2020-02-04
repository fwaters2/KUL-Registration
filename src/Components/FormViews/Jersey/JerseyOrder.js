import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Input
} from "@material-ui/core";
import "./Sizes only.PNG";
import "./Jersey only.PNG";
const JerseyShirt = require("./Jersey only.PNG");
const JerseySizes = require("./Sizes only.PNG");
export default function JerseyOrder(props) {
  const { language, values, handleChange } = props.state;
  const inputLabel = React.useRef(null);
  //const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);
  return (
    <React.Fragment>
      <Grid container spacing={1} alignItems="center">
        {" "}
        <Grid item xs={12}>
          <TextField
            id="standard-required"
            label={language.nameBack}
            margin="normal"
            helperText={language.required}
            variant="outlined"
            autoFocus
            fullWidth
            value={values.jerseyBack}
            onChange={handleChange("jerseyBack")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="standard-required"
            label={language.jerseyNum}
            margin="normal"
            helperText={language.required}
            variant="outlined"
            fullWidth
            type="number"
            value={values.jerseyNum1}
            onChange={handleChange("jerseyNum1")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="standard-required"
            label={language.backup}
            margin="normal"
            variant="outlined"
            helperText={language.required}
            fullWidth
            type="number"
            value={values.jerseyNum2}
            onChange={handleChange("jerseyNum2")}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel}>{language.size}</InputLabel>
            <Select
              fullWidth
              value={values.size}
              onChange={handleChange("size")}
              input={
                <Input
                //labelWidth={labelWidth}
                />
              }
            >
              <MenuItem value={"XS"}>XS</MenuItem>
              <MenuItem value={"S"}>S</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"XL"}>XL</MenuItem>
              <MenuItem value={"2XL"}>2XL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container justify="center" item sm={6} xs={12}>
          <img width="150em" src={JerseyShirt} alt="Jersey" />
        </Grid>
        <Grid container justify="center" item sm={6} xs={12}>
          <img src={JerseySizes} alt="Jersey Sizing" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
