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
  const { language, setValues, handleChange, values } = props.state;

  return (
    <React.Fragment>
      {values.seasons === "unknown" ? (
        <React.Fragment>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                //className={classes.picButton}
                variant="contained"
                fullWidth
                onClick={() => setValues({ ...values, seasons: 0 })}
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
                onClick={() => setValues({ ...values, seasons: 1 })}
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
            onClick={() => setValues({ ...values, seasons: "unknown" })}
          >
            {language.back}
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Slider
            value={values.seasons}
            onChange={(e, value) => setValues({ ...values, seasons: value })}
            min={1}
            max={8}
            valueLabelDisplay="on"
          />

          <InputLabel>{language.seasonsPlayed}</InputLabel>
          <Button
            color="secondary"
            onClick={() => setValues({ ...values, seasons: "unknown" })}
          >
            {language.back}
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
