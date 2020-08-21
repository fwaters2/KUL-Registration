import React from "react";
import { Hidden } from "@material-ui/core";
import FormContainerDesktop from "./FormContainerDesktop";
import FormContainerMobile from "./FormContainerMobile";

export default function FormContainer(props) {
  return (
    <>
      <Hidden xsDown>
        <FormContainerDesktop {...props} />
      </Hidden>
      <Hidden smUp>
        <FormContainerMobile {...props} />
      </Hidden>
    </>
  );
}
