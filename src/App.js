import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Auth from "./Components/Login/Auth";
import FacebookProvider from "react-facebook/dist/FacebookProvider";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="background" />
      {/* <FacebookProvider appId="735258927045179"> */}
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Auth {...props} isReferred={false} />}
          />
          <Route
            path="/:referralId"
            render={(props) => <Auth {...props} isReferred={true} />}
          />
        </Switch>
      </BrowserRouter>
      {/* </FacebookProvider> */}
    </ThemeProvider>
  );
}
