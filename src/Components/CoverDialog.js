import React from "react";
import {
  Dialog,
  Button,
  Typography,
  Box,
  ListItem,
  ListItemText
} from "@material-ui/core";
import FormContext from "./FormContext";
import FormContainer from "./FormContainer";

export default function CoverDialog({ open, onClose }) {
  const formData = React.useContext(FormContext);

  const { language } = formData;

  function Subtitle(props) {
    return <Typography variant="h6">{props.children}</Typography>;
  }
  function BodyText(props) {
    return <Typography variant="body1">{props.children}</Typography>;
  }
  function BulletPoints(props) {
    return (
      <ListItem>
        <ListItemText primary={props.children}></ListItemText>
      </ListItem>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <FormContainer>
        <Box m=".5em">
          <Typography variant="h5" align="center">
            {language.greetingTitle}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {language.ready}
        </Button>

        {language.greetingBody.map(x => (
          <BodyText key={x}>{x}</BodyText>
        ))}

        <Subtitle variant="h6">{language.whatGet}</Subtitle>
        {language.getList.map(y => (
          <BulletPoints key={y}>{y}</BulletPoints>
        ))}

        <Subtitle>{language.schedule}</Subtitle>
        <BodyText>{language.schedBasics}</BodyText>
        {language.schedDates.map(x => (
          <BulletPoints key={x}>{x}</BulletPoints>
        ))}

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onClose}
        >
          {language.ready}
        </Button>
      </FormContainer>
    </Dialog>
  );
}
