import React from "react";
import {
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  FormLabel
} from "@material-ui/core";
import ButtonNavigation from "../ButtonNavigation";
import FormContext from "../FormContext";

export default function Contact() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const { facebookContact, facebookId, lineContact, lineId } = values.contact;
  const isComplete = true;
  const handleChange = (field, value) => {
    setValues({ ...values, contact: { [field]: value } });
  };
  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">{language.bestWay}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={facebookContact}
                onClick={() =>
                  handleChange("facebookContact", !facebookContact)
                }
              />
            }
            label="Facebook"
          />
          {facebookContact ? (
            <TextField
              label={language.fbContact}
              value={facebookId}
              onChange={e => handleChange("facebookId", e.target.value)}
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={lineContact}
                onClick={() => handleChange("lineContact", !lineContact)}
              />
            }
            label="Line"
          />
          {lineContact ? (
            <TextField
              label={language.lineID}
              value={lineId}
              onChange={e => handleChange("lineId", e.target.value)}
            />
          ) : null}
        </FormGroup>
      </FormControl>
      <ButtonNavigation isComplete={isComplete} />
    </React.Fragment>
  );
}
