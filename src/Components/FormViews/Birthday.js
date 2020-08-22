import React from "react";
import TextField from "@material-ui/core/TextField";
import FormContext from "../FormContext";
import FormStep from "../../Templates/FormStep";
import { FormLabel } from "@material-ui/core";

export default function Birthday() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const birthday = values.birthday.value;
  const isComplete = birthday !== "1990-01-01";
  const handleChange = (e) => {
    setValues({ ...values, birthday: { value: e.target.value } });
  };

  return (
    <FormStep stepTitleString="Birthday" isComplete={isComplete}>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginTop: "2em",
        }}
      >
        <i className="fas fa-birthday-cake fa-5x" />
        <TextField
          style={{ margin: "2em 0" }}
          autoFocus
          id="date"
          label={language.birthday}
          type="date"
          value={birthday}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <FormLabel>Must be 18+</FormLabel>
      </div>
    </FormStep>
  );
}
