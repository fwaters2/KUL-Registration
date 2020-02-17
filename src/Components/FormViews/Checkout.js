import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Grid, Divider } from "@material-ui/core";
import "../../Assets/KUL.svg";
import firebase from "../../Firebase";
import FormContext from "../FormContext";
import AuthContext from "../AuthContext";
import StepTitle from "../StepTitle";
const logo = require("../../Assets/KUL.svg");

export default function Checkout(props) {
  const formData = React.useContext(FormContext);
  const {
    firstName,
    lastName,
    chName,
    nickname,
    nationality,
    birthday,
    gender,
    selfie: photoUrl
  } = formData;
  const authData = React.useContext(AuthContext);
  const { language, values, step, stepChange } = formData;
  const { regDocId } = authData;
  const items = [
    { item: "hatBlack", itemName: language.blackHat, cost: 200 },
    { item: "hatWhite", itemName: language.whiteHat, cost: 200 },
    { item: "discBlack", itemName: language.blackDisc, cost: 400 },
    { item: "discWhite", itemName: language.whiteDisc, cost: 400 }
  ];
  const swagOrders = () => {
    //Goal: An array of orders
    const regOrder = {
      userId: values.userId,
      item: "Early Bird Registration",
      cost: 1200,
      dateOrdered: firebase.firestore.FieldValue.serverTimestamp()
    };

    let completeArray = [];
    items.forEach(x => {
      if (values.swag.items[x.item] !== 0) {
        let itemNum = values.swag.items[x.item];
        let itemArray = [];
        while (itemNum > 0) {
          console.log(itemNum);
          itemNum--;
          itemArray = [
            ...itemArray,
            {
              userId: values.userId,
              item: x.item,
              cost: x.cost,
              dateOrdered: firebase.firestore.FieldValue.serverTimestamp()
            }
          ];
        }
        completeArray = [...completeArray, ...itemArray];
      } else return completeArray;
    });

    return [...completeArray, regOrder];
  };

  const collectionsAttributes = {
    isDelivered: false,
    dateDelivered: null,
    isPaid: false,
    datePaid: null,
    paidTo: null,
    bankNumbers: null
  };
  const usersAttributes = {
    firstName,
    lastName,
    chName,
    nickname,
    gender,
    nationality,
    birthday,
    photoUrl,
    status: "Unpaid",
    isRegistered: true
  };

  const handleSubmission = () => {
    const userId = values.userId;
    const db = firebase.firestore();
    console.log("userId", userId);
    console.log("reDocId", regDocId);
    Promise.all([
      db
        .collection("Users")
        .doc(userId)
        .update(usersAttributes),
      db
        .collection("Registration")
        .doc(regDocId)
        .set({
          ...values,
          completed: true,
          completedRegistration: firebase.firestore.FieldValue.serverTimestamp()
        }),
      ...swagOrders().map(order => db.collection("Orders").add(order)),
      ...swagOrders().map(order =>
        db.collection("Collections").add({ ...order, ...collectionsAttributes })
      )
    ])
      .then(result => {
        console.log("completed a bunch of promises:", result.length);
        window.location.reload();
      })
      .catch(error =>
        console.log("Error adding documents to collections/orders", error)
      );
  };

  return (
    <>
      <StepTitle>{language.checkout}</StepTitle>
      <List disablePadding style={{ flex: 1, width: "100%" }}>
        <ListItem
        //className={classes.listItem}
        >
          <ListItemText
            primary={<img src={logo} alt="logo" height="20px" />}
            secondary={language.earlyBird}
          />
          <Typography variant="body2">1200nt</Typography>
        </ListItem>
        {items.map(product =>
          values.swag.items[product.item] !== 0 ? (
            <ListItem
              //className={classes.listItem}
              key={product.item}
            >
              <ListItemText
                primary={
                  product.itemName + "(" + values.swag.items[product.item] + ")"
                }
                secondary={product.cost}
              />
              <Typography variant="body2">
                {values.swag.items[product.item] * product.cost + language.nt}
              </Typography>
            </ListItem>
          ) : null
        )}
        <Divider variant="middle" />
        <ListItem
        //style={{ borderTop: "1px solid black" }}
        //className={classes.listItem}
        >
          <ListItemText primary={language.total} />
          <Typography
            variant="subtitle1"
            //className={classes.total}
          >
            {values.checkout.subtotal + language.nt}
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
      <br />
      <Button color="primary" fullWidth onClick={() => stepChange(step - 1)}>
        {language.back}
      </Button>
    </>
  );
}
