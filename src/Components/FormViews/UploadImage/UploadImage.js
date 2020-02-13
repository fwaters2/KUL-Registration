import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Firebase from "../../../Firebase";
import FormContext from "../../FormContext";
import ButtonNavigation from "../../ButtonNavigation";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export default function UploadImage() {
  const formData = React.useContext(FormContext);
  const { language, values, setValues } = formData;
  const { abstain, photoUrl } = values.selfie;
  function handleChange(field, value) {
    setValues({ ...values, selfie: { ...values.selfie, [field]: value } });
  }
  const [file, setFile] = React.useState();

  const handleFileChange = newFile => {
    setFile(newFile[newFile.length - 1]);
  };
  const isComplete = photoUrl !== null || abstain;

  function uploadToStorage(newFile) {
    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = Firebase.storage()
      .ref()
      .child("draftPhoto/" + newFile.name)
      .put(newFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      Firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case Firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case Firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("default case in progress");
        }
      },
      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          //more cases

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("default case");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          handleChange("photoUrl", downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  }

  const handleSubmit = () => {
    uploadToStorage(file);
  };
  return (
    <div>
      {console.log("isComplete", isComplete)}
      {console.log("photo equals null", photoUrl !== null, "abstain", abstain)}
      <DropzoneArea
        dropzoneText="Upload a selfie! #duckface"
        onChange={handleFileChange}
      />
      <br />
      <br />
      <FormControlLabel
        control={
          <Checkbox
            checked={abstain}
            onChange={() => handleChange("abstain", !abstain)}
            value="abstain"
            color="primary"
          />
        }
        label="I would prefer not to"
      />
      <button onClick={handleSubmit}>Submit</button>
      <img height="200px" src={photoUrl} alt="test" />;
      <ButtonNavigation isComplete={isComplete} />
    </div>
  );
}
