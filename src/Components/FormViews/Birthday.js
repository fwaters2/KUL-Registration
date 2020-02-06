import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Birthday(props) {
  const { language, values, setValues } = props.state;
  // const [month, changeMonth] = React.setState(06)
  // const [day, changeDay]=React.setState(17)
  // const [year, changeYear] = React.setState(1990)
  // function localBday(month, day, year){
  //   console.log("hello")

  // }
  return (
    <React.Fragment>
      {/* {localBday()} */}
      <i className="fas fa-birthday-cake fa-5x" />
      <TextField
        autoFocus
        id="date"
        label={language.birthday}
        type="date"
        value={values.birthday}
        //defaultValue="1990-01-01"
        onChange={e => setValues({ ...values, birthday: e.target.value })}
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
      />
    </React.Fragment>
  );
}
