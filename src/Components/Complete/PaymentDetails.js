import React from "react";
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Box
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
    const unregister = docRef
      .get()
      .then(doc => setDigits(doc.data().fourDigits));
    return unregister;
  }, [formData.values.userId]);

  const subtotal = values.checkout.subtotal;
  return (
    <div>
      <ExpansionPanel
        expanded={expanded === "payment"}
        onChange={handleChange("payment")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Box>
            <Typography variant="body2">
              Owed:{" "}
              <strong style={{ color: "red" }}>{subtotal + language.nt}</strong>
            </Typography>

            <Typography variant="body2">{language.transferInfo}</Typography>
          </Box>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Box>
            <Typography>{language.bankCode}: 005</Typography>
            <Typography>{language.acctNum}: 094005419233</Typography> <br />
            <HowToTransfer />
            <Button
              fullWidth
              color={digits === "" ? "primary" : "secondary"}
              variant="contained"
              onClick={() => toggleDialog(true)}
            >
              {digits === "" ? language.submitLastFour : "Change Digits"}
            </Button>
          </Box>
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
