import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Grid, Divider } from "@material-ui/core";
import "../../Assets/KUL.svg";
import firebase from "../../Firebase";
const logo = require("../../Assets/KUL.svg");
const items = [
  { item: "hatBlack", itemName: "Black Hat", cost: 200 },
  { item: "hatWhite", itemName: "White Hat", cost: 200 },
  { item: "discBlack", itemName: "Black Disc", cost: 400 },
  { item: "discWhite", itemName: "White Disc", cost: 400 }
];
export default function Checkout(props) {
  const { language, values, setValues, step, stepChange } = props.state;

  const registerPlayer = () => {
    setValues({ ...values, isRegistered: true });
  };
  const handleSubmission = () => {
    registerPlayer();
    firebase
      .firestore()
      .collection("Registration")
      .add({ ...values, isRegistered: true, timeStamp: new Date() });
  };

  return (
    <React.Fragment>
      <List disablePadding style={{ flex: 1, width: "100%" }}>
        <ListItem
        //className={classes.listItem}
        >
          <ListItemText
            primary={<img src={logo} alt="logo" height="20px" />}
            secondary={"KUL Registration"}
          />
          <Typography variant="body2">1400nt</Typography>
        </ListItem>
        {items.map(product =>
          values[product.item] ? (
            <ListItem
              //className={classes.listItem}
              key={product.item}
            >
              <ListItemText
                primary={product.itemName + "(" + values[product.item] + ")"}
                secondary={product.cost}
              />
              <Typography variant="body2">
                {values[product.item] * product.cost + "nt"}
              </Typography>
            </ListItem>
          ) : null
        )}
        <Divider variant="middle" />
        <ListItem
        //style={{ borderTop: "1px solid black" }}
        //className={classes.listItem}
        >
          <ListItemText primary="Total" />
          <Typography
            variant="subtitle1"
            //className={classes.total}
          >
            {values.hatBlack * 200 +
              values.hatWhite * 200 +
              values.discBlack * 400 +
              values.discWhite * 400 +
              1400 +
              "nt"}
          </Typography>
        </ListItem>
      </List>
      <Button
        onClick={handleSubmission}
        variant="contained"
        color="primary"
        fullWidth
      >
        {language.submitFinish}
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => stepChange(step - 1)}
          >
            {language.back}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
