import React from "react";
import { List, ListItem, ListItemText, Link } from "@material-ui/core";

export default function HowToTransfer() {
  return (
    <List>
      <ListItem>
        <ListItemText
          primary="How To Transfer"
          secondary="Bank Code: 808  Account #: 0727-968-026168"
        />
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
          secondary="'Fund Transfer' to the account above and grab a reciept"
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Step 4"
          secondary="Message the last 4 digits of your account to Donna"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Facebook"
          secondary={
            <Link href="https://www.facebook.com/Gringo17">
              Message Forrest
            </Link>
          }
        />
      </ListItem>
    </List>
  );
}
