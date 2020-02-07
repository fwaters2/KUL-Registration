import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Birthday(props) {
  const { language, values, setValues } = props.state;
  const { birthday } = values.value;
  return (
    <React.Fragment>
      <i className="fas fa-birthday-cake fa-5x" />
      <TextField
        autoFocus
        id="date"
        label={language.birthday}
        type="date"
        value={birthday}
        //defaultValue="1990-01-01"
        onChange={e => setValues("value", e.target.value)}
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
      />
    </React.Fragment>
  );
}
