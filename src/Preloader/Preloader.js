import React from "react";
import logo from "../Assets/KUL_final.svg";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="Container">
      <img src={logo} alt="logo" />
      <div className="Container-Text">Loading...</div>
      <div className="Container-StickFig">
        <div className="Head Color" />
        <div className="Stick Body Color" />
        <div className="Stick Appendage Left Arm Color" />
        <div className="Stick Appendage CatchArm Color StickOneArm" />
        <div className="Stick Appendage Left Leg Color" />
        <div className="Stick Appendage Right Leg Color" />
      </div>
      <div className="Frisbee" />
      <div className="Container-StickFig StickTwo">
        <div className="Head Color" />
        <div className="Stick Body Color" />
        <div className="Stick Appendage Left Arm Color" />
        <div className="Stick Appendage CatchArm Color StickTwoArm" />
        <div className="Stick Appendage Left Leg Color" />
        <div className="Stick Appendage Right Leg Color" />
      </div>
    </div>
  );
}

export default Preloader;
