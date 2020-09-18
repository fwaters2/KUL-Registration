import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "rgb(40, 56, 149)" },
    secondary: { main: "rgb(220, 62, 67)" },
  },
  //for our form container
  title: {
    margin: 3,
  },
  paper: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 3,
  },
  footer: {
    marginTop: 1,
    flexGrow: 1,
  },
  picButton: {
    height: 150,
  },

  //Below here is under review to be removed

  root: {
    padding: 5,
  },
  button: {
    margin: 1,
  },
  vertSlider: {
    textAlign: "center",
    height: 300,
  },
  radioPage: {
    display: "flex",
  },
  total: {
    fontWeight: "700",
  },
});
export default theme;
