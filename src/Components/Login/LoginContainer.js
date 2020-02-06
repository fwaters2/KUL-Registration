import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Register from "./Register";
import SignIn from "./SignIn";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index}>
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function LoginContainer(props) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const { language } = props;

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={theme.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={language.register} />
          <Tab label={language.signIn} />
        </Tabs>
      </AppBar>
      <div index={value}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Register language={language} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <SignIn language={language} />
        </TabPanel>
      </div>
    </div>
  );
}
