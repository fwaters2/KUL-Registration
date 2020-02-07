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
  const { language, values, setValues } = props.state;
  const inputLabel = React.useRef(null);
  const { jerseyBack, size, jerseyNum1, jerseyNum2 } = values;
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
            value={jerseyBack}
            onChange={e => setValues("jerseyBack", e.target.value)}
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
            value={jerseyNum1}
            onChange={e => setValues("jerseyNum1", e.target.value)}
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
            value={jerseyNum2}
            onChange={e => setValues("jerseyNum2", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel ref={inputLabel}>{language.size}</InputLabel>
            <Select
              fullWidth
              value={size}
              onChange={e => setValues("size", e.target.value)}
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
