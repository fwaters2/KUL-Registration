import React from "react";
import QRCode from "qrcode.react";

export default function QrCode(props) {
  const { url } = props;
  return <QRCode value={url} />;
}
