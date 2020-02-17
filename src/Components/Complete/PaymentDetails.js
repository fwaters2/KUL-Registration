import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Box,
  Divider
} from "@material-ui/core";
import FormContext from "../FormContext";
import { ExpandMore } from "@material-ui/icons";
import FourDigits from "./FourDigits";

export default function PaymentDetails(props) {
  const { expanded, handleChange } = props;
  const formData = React.useContext(FormContext);
  const { language, values } = formData;
  const [dialogOpen, toggleDialog] = React.useState(false);

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
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => toggleDialog(true)}
            >
              Submit Last 4 Digits
            </Button>
          </Box>
        </ExpansionPanelDetails>
        <FourDigits
          toggleDialog={toggleDialog}
          open={dialogOpen}
          handleClose={() => toggleDialog(false)}
        />
      </ExpansionPanel>
    </div>
  );
}
