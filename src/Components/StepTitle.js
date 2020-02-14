import React from "react";
import { Typography, Box } from "@material-ui/core";

export default function StepTitle(props) {
  const { children } = props;
  return (
    <Box marginY="1em">
      <Typography variant="h5">{children}</Typography>
    </Box>
  );
}
