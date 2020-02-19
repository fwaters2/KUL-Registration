import React from "react";
import { Grid, Button, Box } from "@material-ui/core";
import FormContext from "../FormContext";

export default function CopyLink() {
  const formData = React.useContext(FormContext);
  const { values } = formData;
  const [copySuccess, setCopySuccess] = React.useState("Copy");
  const linkRef = React.useRef(null);

  const userId = values.userId;
  const urlPrefix =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kul-spring-20.firebaseapp.com";
  const url = `${urlPrefix}/${userId}`;
  function copyToClipboard(e) {
    linkRef.current.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box p="1em">
          <input ref={linkRef} readOnly value={url} style={{ width: "100%" }} />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          variant={copySuccess === "Copied!" ? "text" : "contained"}
          color={copySuccess === "Copied" ? "inherit" : "primary"}
          onClick={copyToClipboard}
        >
          {copySuccess}
        </Button>
      </Grid>
    </Grid>
  );
}
