import React from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Box,
} from "@material-ui/core";
import FormContext from "../FormContext";
import { ExpandMore } from "@material-ui/icons";
import FourDigits from "./FourDigits";
import HowToTransfer from "./HowToTransfer";
import Firebase from "../../Firebase";

export default function PaymentDetails(props) {
  const { expanded, handleChange } = props;
  const formData = React.useContext(FormContext);
  const { language, values } = formData;
  const [dialogOpen, toggleDialog] = React.useState(false);
  const [digits, setDigits] = React.useState("");

  React.useEffect(() => {
    const docRef = Firebase.firestore()
      .collection("Users")
      .doc(formData.values.userId);
    docRef.get().then((doc) => setDigits(doc.data().fourDigits));
  }, [formData.values.userId]);

  const subtotal = values.checkout.subtotal;
  const handleSubmit = () => {
    Firebase.firestore().collection("Users").doc(formData.userId).update({
      status: "Transfer Pending",
      fourDigits: digits,
      digitsSubmitted: Firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <div>
      <Box marginY="2em" alignItems="center">
        <Typography variant="body2" align="center">
          Owed:{" "}
          <strong style={{ color: "red" }}>{subtotal + language.nt}</strong>
        </Typography>

        <Typography variant="body2" align="center">
          {language.transferInfo}
        </Typography>
      </Box>
      <Box>
        <Typography>{language.bankCode}: 005</Typography>
        <Typography>{language.acctNum}: 048005408850</Typography> <br />
      </Box>
      <ExpansionPanel
        expanded={expanded === "payment"}
        onChange={handleChange("payment")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          Instructions
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <HowToTransfer />
            <Button
              fullWidth
              color={digits === "" ? "primary" : "secondary"}
              variant="contained"
              onClick={handleSubmit}
            >
              {digits === "" ? language.submitLastFour : "Change Digits"}
            </Button>
          </div>
        </ExpansionPanelDetails>
        <FourDigits
          toggleDialog={toggleDialog}
          open={dialogOpen}
          digits={digits}
          setDigits={setDigits}
          handleClose={() => toggleDialog(false)}
        />
      </ExpansionPanel>
    </div>
  );
}
