import React from "react";
import {
  Button,
  Slider,
  MenuItem,
  Select,
  InputLabel,
  Input,
  TextField,
  Grid
} from "@material-ui/core";

export default function Returning(props) {
  const {
    language,
    handleComplexChange,
    handleChange,
    values,
    handleSliderChange,
    classes,
    step,
    stepChange
  } = props;

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  // function handleChange(event) {
  //   setValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value
  //   }));
  // }

  return (
    <React.Fragment>
      {values.seasons === "unknown" ? (
        <React.Fragment>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                className={classes.picButton}
                variant="contained"
                fullWidth
                onClick={handleComplexChange("seasons", 0)}
                color="primary"
              >
                {language.yep}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.picButton}
                variant="contained"
                fullWidth
                onClick={handleComplexChange("seasons", 1)}
                color="primary"
              >
                {language.nope}
              </Button>
            </Grid>
          </Grid>
        </React.Fragment>
      ) : values.seasons === 0 ? (
        <React.Fragment>
          <InputLabel>{language.hearAbout}</InputLabel>
          <Select
            fullWidth
            value={values.source}
            onChange={handleChange("source")}
            input={<Input />}
          >
            <MenuItem value={""}>
              <em>{language.referredBy}</em>
            </MenuItem>
            <MenuItem value={"Facebook"}>Facebook</MenuItem>
            <MenuItem value="Google">{language.google}</MenuItem>
            <MenuItem value="Pickup">{language.pickup}</MenuItem>
            <MenuItem value="KUL Player">{language.KULplayer}</MenuItem>
            <MenuItem value="Friend">{language.friend}</MenuItem>
          </Select>

          {values.source === "KUL Player" || values.source === "Friend" ? (
            <TextField
              id="standard-helperText"
              label={
                values.source === "Player"
                  ? language.KULplayer
                  : language.friend
              }
              value={values.referredBy}
              onChange={handleChange("referredBy")}
              helperText={language.credit}
              margin="normal"
            />
          ) : null}

          <Button
            color="secondary"
            onClick={handleComplexChange("seasons", "unknown")}
          >
            {language.back}
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Slider
            value={values.seasons}
            onChange={handleSliderChange("seasons")}
            min={1}
            max={7}
            valueLabelDisplay="on"
          />
          <InputLabel>{language.seasonsPlayed}</InputLabel>
          <Button
            color="secondary"
            onClick={handleComplexChange("seasons", "unknown")}
          >
            {language.back}
          </Button>
        </React.Fragment>
      )}
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
            disabled={!values.source && !values.seasons}
            onClick={() => stepChange(step + 1)}
          >
            {language.next}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
