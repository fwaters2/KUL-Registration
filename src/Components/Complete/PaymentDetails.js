import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from "@material-ui/core";

export default function PaymentDetails(props) {
  const { language } = props.state;
  return (
    <div>
      <div>Unpaid</div>
      <div>
        {language.total}: 1,200{language.nt}
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
