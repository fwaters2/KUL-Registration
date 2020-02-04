import React from "react";
import StateStore from "./StateStore";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StateStore />
    </ThemeProvider>
  );
}
