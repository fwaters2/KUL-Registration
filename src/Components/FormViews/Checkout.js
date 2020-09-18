import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Divider } from "@material-ui/core";
import "../../Assets/KUL.svg";
import firebase from "../../Firebase";
import FormContext from "../FormContext";
import AuthContext from "../AuthContext";
import StepTitle from "../StepTitle";
const logo = require("../../Assets/taiwanalogo_white.svg");

export default function Checkout(props) {
  const formData = React.useContext(FormContext);
  const [currentlyRegistered, setCurrentlyRegistered] = React.useState(0);
  const {
    names: { firstName, lastName, nickname },
    selfie: { photoUrl },
  } = formData.values;
  const subtotal = formData.values.checkout.subtotal;
  const { setValues } = formData;

  const nationality = formData.values.nationality.value;
  const gender = formData.values.gender.value;
  const birthday = formData.values.birthday.value;
  const authData = React.useContext(AuthContext);

  const { language, values, step, stepChange } = formData;
  const { regDocId } = authData;
  React.useEffect(() => {
    function updatePrice(newPrice) {
      setValues({ ...values, checkout: { subtotal: newPrice } });
    }
    const unsubscribe = () =>
      firebase
        .firestore()
        .collection("Users")
        .where("isRegistered", "==", true)
        .get()
        .then((snap) => {
          snap.size < 50 ? updatePrice(800) : updatePrice(1000);

          setCurrentlyRegistered(snap.size); // will return the collection size
          return null;
        });
    return unsubscribe();
  }, []);

  const usersAttributes = {
    firstName,
    lastName,

    nickname: nickname || "",
    gender,
    nationality,
    birthday,
    photoUrl: photoUrl || null,
    status: "Unpaid",
    isRegistered: true,
    regNumber: currentlyRegistered + 1,
  };

  const handleSubmission = () => {
    const userId = values.userId;
    const db = firebase.firestore();
    console.log("userId", userId);
    console.log("reDocId", regDocId);
    Promise.all([
      db.collection("Users").doc(userId).update(usersAttributes),
      db
        .collection("Registration")
        .doc(regDocId)
        .set({
          ...values,
          completed: true,
          completedRegistration: firebase.firestore.FieldValue.serverTimestamp(),
        }),
    ])
      .then((result) => {
        console.log("completed a bunch of promises:", result.length);
        alert("Registration Successful!");
        window.location.reload();
      })
      .catch((error) =>
        console.log("Error adding documents to collections/orders", error)
      );
  };

  return (
    <>
      {console.log("regData", formData)}
      <div style={{ textAlign: "center" }}>
        <StepTitle>
          {language.checkout + " (#" + (currentlyRegistered + 1) + ")"}
        </StepTitle>
      </div>
      <List disablePadding style={{ flex: 1, width: "100%" }}>
        <ListItem
        //className={classes.listItem}
        >
          <ListItemText
            primary={<img src={logo} alt="logo" height="80px" />}
            secondary={
              currentlyRegistered <= 50
                ? language.earlyBird
                : language.registration
            }
          />
          <Typography variant="body2">{subtotal + "nt"}</Typography>
        </ListItem>
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
        color="secondary"
        fullWidth
      >
        {language.submitFinish}
      </Button>
      <br />
      <Button color="secondary" fullWidth onClick={() => stepChange(step - 1)}>
        {language.back}
      </Button>
    </>
  );
}
