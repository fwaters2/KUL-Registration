import React from "react";
import firebase from "../../Firebase";
import StateStore from "../../StateStore";
import initialUserData from "./initialUserData.json";

export default function Auth({ match, isReferred }) {
  const [isSignedIn, updateUser] = React.useState(false);
  const [isRegistered, updateRegistration] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  let { referralId } = match.params;

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        updateUser(true);

        var docRef = firebase
          .firestore()
          .collection("Users")
          .doc(user.uid);
        docRef
          .get()
          .then(doc => {
            console.log("User is signed in:", doc);
            if (doc.exists) {
              console.log("A user profile exists", doc.data());
              if (doc.data().isRegistered) {
                console.log("User has completed Registration");
                updateRegistration(true);
              }
              setIsLoading(false);
            } else {
              console.log(
                "User is signed in but no user document yet (account just created)"
              );
              firebase
                .firestore()
                .collection("Users")
                .doc(user.uid)
                .set({
                  initialUserData,
                  wasReferred: isReferred,
                  referredBy: isReferred ? referralId : null
                })
                .then(console.log("User Account Created"))
                .catch(console.log("Error during User account Creation"));
              setIsLoading(false);
            }
          })
          .catch(error => {
            console.log("Error getting document:", error);
            alert("Error getting document:", error);
          });
      } else {
        console.log("No user is currently logged in");
        setIsLoading(false);
      }
    });

    return () => unsubscribe;
  }, [isReferred, referralId]);

  const authState = {
    isLoading,
    isSignedIn,
    isRegistered
  };

  return <StateStore authState={authState} />;
}
