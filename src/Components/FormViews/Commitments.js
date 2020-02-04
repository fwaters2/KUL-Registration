import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";

export default function Commitments(props) {
  const { language, values, setValues } = props.state;

  const dates = ["10/19", "10/26", "11/9", "11/16", "11/23", language.finals];

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item container justify="center" alignItems="center" xs={8}>
          <i className="fas fa-calendar-alt fa-10x" />
        </Grid>
        <Grid item xs={4}>
          {dates.map((date, index) => (
            <FormControl fullWidth variant="outlined" key={"day1"}>
              <InputLabel ref={inputLabel} htmlFor="outlined-date-simple">
                {date}
              </InputLabel>
              <Select
                fullWidth
                value={values.commitments["day" + (index + 1)]}
                onChange={e =>
                  setValues({
                    ...values,
                    commitments: {
                      ...values.commitments,
                      ["day" + (index + 1)]: e.target.value
                    }
                  })
                }
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
    </React.Fragment>
  );
}
