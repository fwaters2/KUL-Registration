import "./ch.json";
import "./en.json";
const en = require("./en.json");
const ch = require("./ch.json");

export default function handleLang(lang) {
  switch (lang) {
    case "en":
      return en;
    case "ch":
      return ch;
    default:
      console.log("Error with language");
  }
}
