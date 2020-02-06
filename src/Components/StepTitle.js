import React from "react";
import { Typography } from "@material-ui/core";

export default function StepTitle(props) {
  const { children } = props;
  return <Typography variant="h5">{children}</Typography>;
}
