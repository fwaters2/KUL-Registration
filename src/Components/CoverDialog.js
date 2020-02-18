import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box
} from "@material-ui/core";
import FormContext from "./FormContext";
import FormContainer from "./FormContainer";

export default function CoverDialog(props) {
  const formData = React.useContext(FormContext);
  const { language } = formData;
  let open = true;
  const handleClose = () => {
    open = false;
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <FormContainer>
        <DialogTitle>{language.greetingTitle}</DialogTitle>
        <DialogContent>
          {language.greetingBody.map(x => (
            <Typography variang="body2">{x}</Typography>
          ))}
          <Box p="1em 0">
            <Typography variant="h5">{language.whatGet}</Typography>
            {language.getList.map(y => (
              <Typography variant="body" style={{ margin: ".4em 0" }}>
                - {y}
                <br />
              </Typography>
            ))}
          </Box>
        </DialogContent>
      </FormContainer>
      <DialogActions>
        <Button fullWidth variant="contained" color="secondary">
          {language.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
