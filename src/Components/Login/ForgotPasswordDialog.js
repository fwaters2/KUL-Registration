import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "../../Firebase";

export default function FormDialog({ open, handleClose }) {
  const [email, setEmail] = React.useState("");
  const auth = firebase.auth();

  const handlePasswordReset = () => {
    console.log("in password reset");
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
        console.log("Email sent, please check your email!");
        alert("Email sent, please check your email!");

        handleClose();
      })
      .catch(function (error) {
        console.log("Error: " + error);
        // An error happened.
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Password Reset</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Submit your email address and we'll send you an email to reset your
          password.
        </DialogContentText>
        <TextField
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          autoComplete="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handlePasswordReset}
          color="primary"
          disabled={email === ""}
        >
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}
