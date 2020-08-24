import React from "react";
import { Container, Grid } from "@material-ui/core";
import { ReactComponent as BlackLogo } from "../../Assets/taiwanalogo_black.svg";
import Header from "../Header/Header";
import FormContext from "../FormContext";

export default function FormContainerDesktop(props) {
  const formData = React.useContext(FormContext);
  const { language } = formData;
  const { children } = props;

  const open = false;
  const anchorRef = React.useRef(null);
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Container component="main" maxWidth="md">
      <Grid
        container
        direction="row"
        alignItems="stretch"
        justify="space-around"
        style={{ minHeight: "725px" }}
      >
        <Grid
          item
          md={6}
          sm={4}
          style={{
            fontSize: "10pt",
            color: "#e6825a",
            padding: "2em",
            backgroundColor: "#19171bbb",
            borderRadius: "2em 0 0 2em",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "VarelaRound",
              fontWeight: "bolder",
              lineHeight: "2em",
            }}
          >
            <BlackLogo />
            <div>{language.coverDate}</div>
          </div>
        </Grid>

        <Grid
          item
          md={6}
          sm={8}
          xs={12}
          style={{
            padding: "2em",
            backgroundColor: "white",
            borderRadius: "0 2em 2em 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {children}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
