import React from "react";
import Header from "../Header/Header";

export default function FormContainerMobile(props) {
  const { children } = props;
  const open = false;
  const anchorRef = React.useRef(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div
      style={{
        padding: "2em",
        minHeight: "calc(100vh - 4em)",
        backgroundColor: "rgba(255,255,255,.9)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
