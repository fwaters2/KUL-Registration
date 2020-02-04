import React from "react";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  FormLabel
} from "@material-ui/core";

export default function Contact(props) {
  const { language, values, setValues, handleChange } = props.state;

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">{language.bestWay}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.facebookContact}
                onClick={() =>
                  setValues({
                    ...values,
                    facebookContact: !values.facebookContact
                  })
                }
              />
            }
            label="Facebook"
          />
          {values.facebookContact ? (
            <TextField
              label={language.fbContact}
              value={values.facebookID}
              onChange={handleChange("facebookID")}
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={values.lineContact}
                onClick={() =>
                  setValues({ ...values, lineContact: !values.lineContact })
                }
              />
            }
            label="Line"
          />
          {values.lineContact ? (
            <TextField
              label={language.lineID}
              value={values.lineID}
              onChange={handleChange("lineID")}
            />
          ) : null}
        </FormGroup>
      </FormControl>
    </React.Fragment>
  );
}
