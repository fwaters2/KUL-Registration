import React from "react";
import {
  Typography,
  Grid,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import QrCode from "./QrCode";
import firebase from "../../Firebase";
import FormContext from "../FormContext";
import { ExpandMore, Person } from "@material-ui/icons";

export default function Referral(props) {
  const { handleChange, expanded } = props;
  const formData = React.useContext(FormContext);
  const { values } = formData;
  const [copySuccess, setCopySuccess] = React.useState("Copy");
  const [myReferrals, setMyReferrals] = React.useState([]);
  const linkRef = React.useRef(null);

  React.useEffect(() => {
    const myRef = firebase
      .firestore()
      .collection("Users")
      .where("referredBy", "==", values.userId);

    myRef.onSnapshot(snapshot => {
      let fbData = [];

      console.log("snapshot", snapshot);
      snapshot.docs.forEach(doc => {
        fbData = [...fbData, doc.data()];
        console.log("referral data", doc.data());
      });
      setMyReferrals(fbData);
    });
    console.log("userId", values.userId);
  }, [values.userId]);

  const userId = values.userId;
  const urlPrefix =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://kul-spring-20.firebaseapp.com";
  const url = `${urlPrefix}/${userId}`;
  function copyToClipboard(e) {
    linkRef.current.select();
    document.execCommand("copy");
    setCopySuccess("Copied!");
  }

  return (
    <>
      <ExpansionPanel
        expanded={expanded === "referral"}
        onChange={handleChange("referral")}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography variant="body2">Refer a Friend</Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Box>
            <Typography>Your QR code!</Typography>
            <Box p="1em" style={{ display: "flex", justifyContent: "center" }}>
              <QrCode url={url} />
            </Box>
            <Typography>Or copy your referral link:</Typography>
            <Grid container>
              <Grid item xs={12}>
                <input
                  ref={linkRef}
                  readOnly
                  value={url}
                  style={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant={copySuccess === "Copied!" ? "inherit" : "contained"}
                  color={copySuccess === "Copied" ? "inherit" : "primary"}
                  onClick={copyToClipboard}
                >
                  {copySuccess}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <List>
        <Typography variant="h5">{`My Referrals (${myReferrals.length}):`}</Typography>
        {myReferrals.length === 0 ? (
          <Typography>Sorry no referrals yet</Typography>
        ) : (
          myReferrals.map(referral => (
            <ListItem key={referral.photoUrl}>
              <ListItemIcon>
                {referral.photoUrl ? (
                  <div>
                    <img
                      style={{
                        height: "35px",
                        width: "35px",
                        objectFit: "cover"
                      }}
                      src={referral.photoUrl}
                      alt={referral.firstName}
                    />
                  </div>
                ) : (
                  <Person />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  referral.firstName
                    ? `${referral.firstName} ${referral.lastName}`
                    : referral.email
                }
                secondary={referral.status}
              />
            </ListItem>
          ))
        )}
      </List>
    </>
  );
}
