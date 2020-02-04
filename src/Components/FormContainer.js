import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Switch,
  Button,
  IconButton,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem
} from "@material-ui/core";
import { AssignmentInd } from "@material-ui/icons";
import "./../Assets/KUL_final.svg";
import "../InitialState.json";
import firebase from "../Firebase";
const logo = require("./../Assets/KUL_final.svg");
const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3)
  },
  footer: {
    marginTop: theme.spacing(1),
    flexGrow: 1
  },
  picButton: {
    height: 150
  }
}));

export default function FormContainer(props) {
  const { toggleLanguage, lang, isSignedIn } = props.state;
  const { children } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
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
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <img src={logo} alt="logo" height="40px" />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              //justify="flex-end"
              alignItems="center"
            >
              <Grid item xs>
                <Typography align="right" variant="body2">
                  中文
                </Typography>
              </Grid>
              <Grid item>
                <Switch checked={lang === "ch"} onChange={toggleLanguage} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            {!isSignedIn ? (
              <IconButton>
                <AssignmentInd />
              </IconButton>
            ) : (
              <React.Fragment>
                <IconButton
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
                          placement === "bottom"
                            ? "center top"
                            : "center bottom"
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
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
        {children}
      </Paper>
    </Container>
  );
}
