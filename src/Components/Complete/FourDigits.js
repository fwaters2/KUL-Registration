import React from "react";
import {
  Dialog,
  TextField,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import Firebase from "../../Firebase";
import FormContext from "../FormContext";
export default function FourDigits({
  open,
  handleClose,
  toggleDialog,
  digits,
  setDigits
}) {
  const regInfo = React.useContext(FormContext);
  const { userId } = regInfo.values;

  const handleSubmit = () => {
    Firebase.firestore()
      .collection("Users")
      .doc(userId)
      .update({
        status: "Transfer Pending",
        fourDigits: digits,
        digitsSubmitted: Firebase.firestore.FieldValue.serverTimestamp()
      });
    handleClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>My Last 4 digits</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          type="number"
          value={digits}
          onChange={e => setDigits(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleDialog(false)}>Back</Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
