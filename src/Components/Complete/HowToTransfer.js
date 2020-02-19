import React from "react";
import { List, ListItem, ListItemText, Link } from "@material-ui/core";
import FormContext from "../FormContext";

export default function HowToTransfer() {
  const formData = React.useContext(FormContext);
  const { language } = formData;
  return (
    <List>
      <ListItem>
        <ListItemText primary={language.howToTransfer} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Step 1"
          secondary="Find an ATM at any Bank or convenience store"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Step 2"
          secondary="Insert your Taiwanese Bank card and click 'ENGLISH'"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Step 3"
          secondary="Fund Transfer' to the account above and grab a reciept"
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Step 4"
          secondary="Submit (below) last 4 Digits of YOUR account and wait at least 24 hours for confirmation"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Facebook"
          secondary={
            <>
              {"Your payment status not updated? "}
              <Link color="secondary" href="https://www.facebook.com/Gringo17">
                Message Forrest
              </Link>
            </>
          }
        />
      </ListItem>
    </List>
  );
}
