import React from "react";
import { Grid, Typography, Switch } from "@material-ui/core";
import FormContext from "../FormContext";
import { ReactComponent as Logo } from "../../Assets/KUL_final_top.svg";
import SecondaryStepper from "../Steppers/SecondaryStepper";

const Header = () => {
  const formData = React.useContext(FormContext);
  const { toggleLanguage, lang, openGreeting } = formData;

  return (
    <>
      <Grid
        style={{
          paddingBottom: ".5em",
        }}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item onClick={() => openGreeting()}>
          <Logo
            style={{
              height: "80px",
              margin: "-20px -15px",
            }}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            //justify="flex-end"
            alignItems="center"
          >
            <Typography align="right" variant="body2">
              En
            </Typography>
            <Grid item>
              <Switch checked={lang === "ch"} onChange={toggleLanguage} />
            </Grid>
            <Grid item xs>
              <Typography align="left" variant="body2">
                中文
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SecondaryStepper style={{ marginBottom: "1em" }} step={formData.step} />
    </>
  );
};

export default Header;
