import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./Pics/hatBlack2.png";
import "./Pics/Hat_White.jpg";
import "./Pics/Disc_Black.jpg";
import "./Pics/Disc_White.jpg";
import { List, Box } from "@material-ui/core";
import SwagItem from "./SwagItem";
const blackHatPic = require("./Pics/hatBlack2.png");
const whiteHatPic = require("./Pics/Hat_White.jpg");
const blackDiscPic = require("./Pics/Disc_Black.jpg");
const whiteDiscPic = require("./Pics/Disc_White.jpg");
const items = [
  { item: "hatBlack", itemName: "Black Hat", cost: 200 },
  { item: "hatWhite", itemName: "White Hat", cost: 200 },
  { item: "discBlack", itemName: "Black Disc", cost: 400 },
  { item: "discWhite", itemName: "White Disc", cost: 400 }
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "Black Hat",
    imgPath: blackHatPic
  },
  {
    label: "Red/White/Blue Hat",
    imgPath: whiteHatPic
  },
  {
    label: "Black Disc",
    imgPath: blackDiscPic
  },
  {
    label: "White Disc",
    imgPath: whiteDiscPic
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  },
  footer: {
    marginTop: theme.spacing(1),
    flexGrow: 1
  }
}));

export default function Carousel(props) {
  const { values, setValues, language } = props.state;
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }
  const handleButtonClick = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {language.next}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {language.back}
          </Button>
        }
      />

      <List dense>
        {items.map(item => (
          <SwagItem
            key={item.item}
            handleButtonClick={handleButtonClick}
            item={item.item}
            itemName={item.itemName}
            cost={item.cost}
            values={values}
          />
        ))}
      </List>
      <Box textAlign="center">
        <Typography>
          Subtotal:{" "}
          {1200 +
            values.hatBlack * 200 +
            values.hatWhite * 200 +
            values.discBlack * 400 +
            values.discWhite * 400 +
            "nt"}
        </Typography>
      </Box>
    </div>
  );
}
