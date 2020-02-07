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
  const { facebookContact, facebookId, lineContact, lineId } = values;
  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">{language.bestWay}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={facebookContact}
                onClick={() => setValues("facebookContact", !facebookContact)}
              />
            }
            label="Facebook"
          />
          {facebookContact ? (
            <TextField
              label={language.fbContact}
              value={facebookId}
              onChange={e => setValues("facebookId", e.target.value)}
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={lineContact}
                onClick={() => setValues("lineContact", !lineContact)}
              />
            }
            label="Line"
          />
          {lineContact ? (
            <TextField
              label={language.lineID}
              value={lineId}
              onChange={e => setValues("lineId", e.target.value)}
            />
          ) : null}
        </FormGroup>
      </FormControl>
    </React.Fragment>
  );
}
