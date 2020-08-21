import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Paper,
  Switch,
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import { AssignmentInd } from "@material-ui/icons";
import "./../Assets/KUL_final.svg";
import firebase from "../../Firebase";
import FormContext from "../FormContext";
import { ReactComponent as Logo } from "../../Assets/taiwanalogo_white.svg";
import SecondaryStepper from "../Steppers/SecondaryStepper";
//const logo = require("./../Assets/taiwanalogo_white.svg");
const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2em",
  },
  footer: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
  },
  picButton: {
    height: 150,
  },
}));

const Header = (props) => {
  const formData = React.useContext(FormContext);
  const { toggleLanguage, lang, isSignedIn, language, openGreeting } = formData;

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const handleSignOut = () => {
    firebase.auth().signOut();
    window.location.reload();
  };
  return (
    <>
      <Grid
        style={{
          paddingBottom: ".5em",
        }}
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item onClick={() => openGreeting()}>
          <Logo
            style={{
              height: "80px",
              margin: "-20px -15px",
            }}
          />
        </Grid>

        <Grid item>
          <Grid
            container
            direction="row"
            //justify="flex-end"
            alignItems="center"
          >
            <Typography align="right" variant="body2">
              En
            </Typography>
            <Grid item>
              <Switch checked={lang === "ch"} onChange={toggleLanguage} />
            </Grid>
            <Grid item xs>
              <Typography align="left" variant="body2">
                中文
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {!isSignedIn ? (
            <IconButton style={{ marginRight: "-.5em" }}>
              <AssignmentInd />
            </IconButton>
          ) : (
            <React.Fragment>
              <IconButton
                style={{ marginRight: "-.5em" }}
                color="primary"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <AssignmentInd />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ zIndex: 5 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleSignOut}>
                            {language.logout}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
      <SecondaryStepper style={{ marginBottom: "1em" }} step={formData.step} />
    </>
  );
};

export default Header;
