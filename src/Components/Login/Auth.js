import React from "react";
import firebase from "../../Firebase";
import StateStore from "../../StateStore";
import AuthContext from "../AuthContext";

export default function Auth({ match, isReferred }) {
  const [isSignedIn, updateUser] = React.useState(false);
  const [isRegistered, updateRegistration] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [regData, setRegData] = React.useState({});
  const [regDocId, setRegDocId] = React.useState("");
  const [userEmail, setuserEmail] = React.useState("");
  let { referralId } = match.params;

  React.useEffect(() => {
    const db = firebase.firestore();
    const usersColRef = db.collection("Users");
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        updateUser(true);
        setuserEmail(user.email);
        const authId = user.uid;
        console.log("user detected with id: ", authId);
        //First Get the User document for the signed in user
        const userDocRef = usersColRef.doc(authId);
        userDocRef
          .get()
          .then(doc => {
            console.log("User doc retrieved", doc.data());
            //then check if they've completed registration

            const registrationId = doc.data().registrationId;
            console.log("setting regData with this Id: ", registrationId);
            const regDocRef = db.collection("Registration").doc(registrationId);

            regDocRef
              .get()
              .then(doc => {
                console.log("Retrieved fbData: ", doc.data());
                setRegDocId(doc.id);

                setRegData(doc.data());
              })
              .then(() => {
                console.log(
                  "Retrieved the data and turning off the loading screen"
                );
                doc.data().isRegistered && updateRegistration(true);
                setIsLoading(false);
              });
          })
          .catch(error => {
            console.log("Error getting document:", error);
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
    isRegistered,
    regData
  };
  const authContext = {
    isSignedIn,
    isRegistered,
    isReferred,
    referralId,
    regDocId,
    userEmail
  };

  return (
    <AuthContext.Provider value={authContext}>
      <StateStore authState={authState} />
    </AuthContext.Provider>
  );
}
