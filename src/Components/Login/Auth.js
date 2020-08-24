import React from "react";
import firebase from "../../Firebase";
import StateStore from "../../StateStore";
import AuthContext from "../AuthContext";
import initialRegData from "./initialRegData.json";
import { Hidden } from "@material-ui/core";
import initialUserData from "./initialUserData.json";
import initialRegistrationData from "./initialRegData.json";

export default function Auth() {
  const [isSignedIn, updateUser] = React.useState(false);
  const [isRegistered, updateRegistration] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [regData, setRegData] = React.useState(initialRegData);
  const [regDocId, setRegDocId] = React.useState("");
  const [userEmail, setuserEmail] = React.useState("");
  const [importedStep, setCurrentStep] = React.useState(0);
  const [greetingOpen, toggleGreeting] = React.useState(false);
  const [lang, toggleLang] = React.useState("en");
  console.log("outside of useEffect");

  firebase
    .auth()
    .getRedirectResult()
    .then(function (result) {
      let userData = {
        uid: "",
        email: "",
        firstName: "",
        lastName: "",
        photoURL: "",
      };
      console.log("redirect results outside useeffect", result);
    })
    .catch((err) => console.log(err));
  React.useEffect(() => {
    console.log("RUNNING");
    const db = firebase.firestore();
    const usersColRef = db.collection("Users");

    const setUpUserCollections = (userData) => {
      setIsLoading(true);
      console.log(userData);
      console.log("type", typeof userData);
      console.log("setting up initial firebase data. userData: ", userData);

      const email = userData.email;
      const userId = userData.uid;
      const firstName = userData.firstName;
      const lastName = userData.lastName;
      const photoURL = userData.photoURL;
      console.log("Creating Registration doc for user: ", userId);
      console.log("Firstname", firstName);
      console.log("pohoto Url", photoURL);
      const db = firebase.firestore();

      const registrationColRef = db.collection("Registration");
      const newInitialData = {
        ...initialRegistrationData,
        names: {
          firstName: firstName,
          lastName: lastName,
        },
        selfie: { abstain: false, photoURL: photoURL },
        email,
        contact: { ...initialRegistrationData.contact, email },
        userId: userId,
      };
      setRegData(newInitialData);
      return registrationColRef
        .add({
          ...newInitialData,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((regRef) => {
          console.log("Creating user document and adding registration id");
          const newRegDocId = regRef.id;
          setRegDocId(newRegDocId);

          const userDocRef = db.collection("Users").doc(userId);
          userDocRef.set({
            ...initialUserData,
            firstName: firstName,
            lastName: lastName,
            photoUrl: photoURL,
            email: email,
            registrationId: newRegDocId,
            created: firebase.firestore.FieldValue.serverTimestamp(),
          });
        })
        .then((data) => {
          console.log("final step of registering completed, data:", data);
          setIsLoading(false);
        });
    };
    const unsubscribe = firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        let userData = {
          uid: "",
          email: "",
          firstName: "",
          lastName: "",
          photoURL: "",
        };
        console.log("after getredirect results", result);
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          console.log("result", result);
          console.log("redirct successful, token:", token);
          const { displayName, photoURL } = result.user;
          const names = displayName.split(" ");
          const firstName = names[0];
          const lastName = names[names.length - 1];
          //userData = { ...userData, firstName, lastName, photoURL };
          console.log("firstname", firstName);
          userData.firstName = firstName;
          userData.lastName = lastName;
          userData.photoURL = photoURL;
          // ...
        }
        // The signed-in user info.
        // var user = result.user;

        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            console.log("Firing inside of if statement (user signed in?)");
            updateUser(true);
            setuserEmail(user.email);
            const authId = user.uid;
            console.log("user detected with id: ", authId);

            //First Get the User document for the signed in user
            const userDocRef = usersColRef.doc(authId);
            await userDocRef
              .get()
              .then(async (doc) => {
                userData.uid = authId;
                userData.email = user.email;
                if (!doc.data()) {
                  console.log("directly before get redirectresults");

                  console.log("no user data found so initializing db");
                  await setUpUserCollections(userData);
                } else {
                  console.log("User doc retrieved", doc.data());
                  //then check if they've completed registration

                  const registrationId = doc.data().registrationId;
                  console.log("setting regData with this Id: ", registrationId);
                  const regDocRef = db
                    .collection("Registration")
                    .doc(registrationId);

                  regDocRef
                    .get()
                    .then((doc) => {
                      console.log("Retrieved fbData: ", doc.data());
                      setRegDocId(doc.id);
                      toggleLang(doc.data().langPreference);
                      setRegData(doc.data());

                      setCurrentStep(doc.data().lastCompletedStep + 1);
                    })
                    .then(() => {
                      console.log(
                        "Retrieved the data and turning off the loading screen"
                      );
                      doc.data().isRegistered && updateRegistration(true);

                      setIsLoading(false);
                    });
                }
              })
              .catch((error) => {
                console.log("Error getting document:", error);
              });
          } else {
            toggleGreeting(true);
            console.log("No user is currently logged in");
            setIsLoading(false);
          }
        });
      })
      .catch(function (error) {
        console.log("returning redirect error", error);
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // // ...
      });
    return () => unsubscribe;
  }, []);

  const authState = {
    isLoading,
    isSignedIn,
    isRegistered,
    regData,
    greetingOpen,
    toggleGreeting,
    lang,
    toggleLang,
    importedStep: importedStep || 0,
  };
  const authContext = {
    setRegDocId,

    setIsLoading,
    isSignedIn,
    isRegistered,
    regDocId,
    userEmail,
  };

  return (
    <AuthContext.Provider value={authContext}>
      <Hidden xsDown>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <StateStore authState={authState} />
          </div>
          <div
            style={{
              margin: "2em",
              color: "#fde187",
              alignText: "center",
              alignSelf: "center",
            }}
          >
            Made with coffee and Electro Swing by{" "}
            <a
              style={{ color: "#e6825a", textDecoration: "none" }}
              href="https://twitter.com/Ultideveloper"
            >
              @Ultideveloper
            </a>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <StateStore authState={authState} />
      </Hidden>
    </AuthContext.Provider>
  );
}
