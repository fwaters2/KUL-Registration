import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid
} from "@material-ui/core";
import QrCode from "./QrCode";
import firebase from "../../Firebase";

export default function Referral(props) {
  const { values } = props.state;
  const [copySuccess, setCopySuccess] = React.useState("Copy");
  const [myReferrals, setMyReferrals] = React.useState([]);
  const linkRef = React.useRef(null);

  const userId = values.userId;
  const url = "http://localhost:3000/" + userId;
  function copyToClipboard(e) {
    linkRef.current.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
  }
  const seeReferrals = () => {
    let fbData = [];
    const myRef = firebase
      .firestore()
      .collection("Users")
      .where("referredBy", "==", values.userId);

    myRef.get().then(snapshot => {
      console.log("snapshot", snapshot);
      snapshot.docs.forEach(doc => {
        fbData = [...fbData, doc.data()];
        console.log(doc.data());
      });
      setMyReferrals(fbData);
    });
    console.log("userId", values.userId);
  };
  return (
    <Card>
      <CardHeader title="Refer a Friend" />

      <CardContent>
        <Typography>Your referral Link</Typography>
        <Grid container>
          <Grid item xs>
            <input ref={linkRef} readOnly value={url} />
          </Grid>

          <Grid item>
            <button onClick={copyToClipboard}>{copySuccess}</button>
          </Grid>
        </Grid>
        <Typography>Or have them scan your QR code!</Typography>
        <QrCode url={url} />

        <button onClick={seeReferrals}>Check for referrals</button>
        {myReferrals.length === 0 ? (
          <div>Sorry no referrals yet</div>
        ) : (
          myReferrals.map(referral => (
            <div>
              {console.log("referral", referral)}
              {referral.registrationId}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
