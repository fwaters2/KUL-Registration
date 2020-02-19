import React from "react";
import TextField from "@material-ui/core/TextField";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";

export default function Birthday() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const birthday = values.birthday.value;
  const isComplete = birthday !== "1990-01-01";
  const handleChange = e => {
    setValues({ ...values, birthday: { value: e.target.value } });
  };

  return (
    <>
      <i className="fas fa-birthday-cake fa-5x" />
      <TextField
        autoFocus
        id="date"
        label={language.birthday}
        type="date"
        value={birthday}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
      />

      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
