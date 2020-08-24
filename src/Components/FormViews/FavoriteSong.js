import React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import FormContext from "../FormContext";
import FormStep from "../../Templates/FormStep";

export default function FavoriteSong() {
  const formData = React.useContext(FormContext);
  const { values, setValues, language } = formData;
  const { song } = values;
  const { favoriteSong, isBlank } = song;
  const isComplete = isBlank || favoriteSong !== "";
  function handleChange(field, value) {
    setValues({ ...values, song: { ...values.song, [field]: value } });
  }
  //   function updateGender(newGender) {
  //     setValues({ ...values, gender: { value: newGender } });
  //   }
  return (
    <FormStep stepTitleString={language.songTitle} isComplete={isComplete}>
      <div
        style={{
          flex: 1,
          marginTop: "2em",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label={language.songHelperText}
          margin="normal"
          helperText={"Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          variant="outlined"
          value={favoriteSong}
          autoFocus
          fullWidth
          //onChange={handleChange("firstName")}

          onChange={(e) => handleChange("favoriteSong", e.target.value)}
        />
        <FormControlLabel
          style={{ margin: 0 }}
          control={
            <Checkbox
              checked={isBlank}
              onChange={() => handleChange("isBlank", !isBlank)}
              //onChange={() => handleChange("abstain", !abstain)}
              value="abstain"
              color="primary"
            />
          }
          label={language.noSong}
        />
      </div>
    </FormStep>
  );
}
