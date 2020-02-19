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
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";
import StepTitle from "../StepTitle";

export default function Returning() {
  const formData = React.useContext(FormContext);
  const { language, setValues, values } = formData;
  const { seasons, source, referredBy } = values.returning;
  const handleChange = (field, value) => {
    setValues({
      ...values,
      returning: { ...values.returning, [field]: value }
    });
  };

  const isComplete = true;
  return (
    <>
      <StepTitle>{language.firstSeason}</StepTitle>
      {seasons === "unknown" ? (
        <>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                //className={classes.picButton}
                variant="contained"
                fullWidth
                onClick={() => handleChange("seasons", 0)}
                color="primary"
              >
                {language.yep}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                //className={classes.picButton}
                variant="contained"
                fullWidth
                onClick={() => handleChange("seasons", 1)}
                color="primary"
              >
                {language.nope}
              </Button>
            </Grid>
          </Grid>
        </>
      ) : seasons === 0 ? (
        <>
          <InputLabel>{language.hearAbout}</InputLabel>
          <Select
            fullWidth
            value={source}
            onChange={e => handleChange("source", e.target.value)}
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

          {source === "KUL Player" || source === "Friend" ? (
            <TextField
              id="standard-helperText"
              label={source === "Player" ? language.KULplayer : language.friend}
              value={referredBy}
              onChange={e => handleChange("referredBy", e.target.value)}
              helperText={language.credit}
              margin="normal"
            />
          ) : null}

          <Button
            color="primary"
            variant="contained"
            onClick={() => handleChange("seasons", "unknown")}
          >
            {language.back}
          </Button>
        </>
      ) : (
        <>
          <Slider
            value={seasons}
            onChange={(e, value) => handleChange("seasons", value)}
            min={1}
            max={8}
            valueLabelDisplay="on"
          />

          <InputLabel>{language.seasonsPlayed}</InputLabel>

          <Button
            color="primary"
            variant="contained"
            onClick={() => handleChange("seasons", "unknown")}
          >
            {language.back}
          </Button>
        </>
      )}

      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
