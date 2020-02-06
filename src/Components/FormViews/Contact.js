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
  const { language, values, setValues } = props.state;

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
              onChange={e =>
                setValues({ ...values, facebookID: e.target.value })
              }
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
              onChange={e => setValues({ ...values, lineID: e.target.value })}
            />
          ) : null}
        </FormGroup>
      </FormControl>
    </React.Fragment>
  );
}
