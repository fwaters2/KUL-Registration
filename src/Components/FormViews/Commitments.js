import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, Typography } from "@material-ui/core";
import FormContext from "../FormContext";
import ButtonNavigation from "../ButtonNavigation";
import StepTitle from "../StepTitle";

export default function Commitments() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const dateObject = values.commitments.dates;
  const dates = Object.keys(dateObject); //["day1", "day2", "day3",..."]

  const isComplete = !dates
    .map(date => dateObject[date].response !== "")
    .includes(false);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const handleChange = (field, value) => {
    setValues({
      ...values,
      commitments: {
        ...values.commitments,
        dates: {
          ...values.commitments.dates,
          [field]: { ...values.commitments.dates[field], response: value }
        }
      }
    });
  };
  return (
    <>
      <StepTitle>{language.commitments}</StepTitle>
      <Grid container>
        <Grid item container justify="center" alignItems="center" xs={8}>
          <i className="fas fa-calendar-alt fa-10x" />
          <Typography variant="caption">{language.banquet}</Typography>
        </Grid>
        <Grid item xs={4}>
          {dates.map((date, index) => (
            <FormControl fullWidth variant="outlined" key={date}>
              <InputLabel ref={inputLabel} htmlFor="outlined-date-simple">
                {dateObject[date].date}
              </InputLabel>
              <Select
                fullWidth
                value={dateObject[date].response}
                onChange={e => handleChange(date, e.target.value)}
                input={
                  <OutlinedInput
                    labelWidth={labelWidth}
                    name="date"
                    id="outlined-date-simple"
                  />
                }
              >
                <MenuItem value={"In"}>{language.going}</MenuItem>
                <MenuItem value={"Likely"}>{language.likely}</MenuItem>
                <MenuItem value={"Unlikely"}>{language.unlikely}</MenuItem>
                <MenuItem value={"Out"}>{language.out}</MenuItem>
              </Select>
            </FormControl>
          ))}
        </Grid>
      </Grid>
      <ButtonNavigation isComplete={isComplete} />
    </>
  );
}
