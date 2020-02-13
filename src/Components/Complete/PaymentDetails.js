import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from "@material-ui/core";
import FormContext from "../FormContext";

export default function PaymentDetails() {
  const formData = React.useContext(FormContext);
  const { language, values } = formData;
  const subtotal = values.checkout.subtotal;
  return (
    <div>
      <div>Unpaid</div>
      <div>
        {language.total}: {subtotal}
        {language.nt}
      </div>
      <Card>
        <CardHeader title={language.transferInfo} />
        <CardContent>
          {language.bankCode}: 005 <br />
          {language.acctNum}: 094005419233
        </CardContent>
        <CardActions>
          <Button fullWidth color="primary" variant="contained">
            Submit Last 4 Digits
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
