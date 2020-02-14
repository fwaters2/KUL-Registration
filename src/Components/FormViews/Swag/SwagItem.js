import React from "react";
import {
  ListItem,
  IconButton,
  Box,
  TextField,
  ListItemText
} from "@material-ui/core";
import { RemoveCircleOutline, AddCircleOutline } from "@material-ui/icons";
import FormContext from "../../FormContext";

export default function SwagItem(props) {
  const { item, itemName, cost } = props;
  const formData = React.useContext(FormContext);
  const { values, setValues } = formData;
  const { hatBlack, hatWhite, discBlack, discWhite } = values.swag.items;

  const handleButtonClick = (name, value, type) => {
    let newValue;
    switch (name) {
      case "hatBlack":
      case "hatWhite":
        newValue = 200;
        break;
      case "discBlack":
      case "discWhite":
        newValue = 400;
        break;
      default:
        newValue = 0;
    }
    newValue = type === "subtract" ? newValue * -1 : newValue;

    setValues({
      ...values,
      checkout: {
        subtotal:
          newValue +
          1200 +
          hatBlack * 200 +
          hatWhite * 200 +
          discBlack * 400 +
          discWhite * 400
      },
      swag: { ...values.swag, items: { ...values.swag.items, [name]: value } }
    });
    //setValues({ ...values, [name]: value });
  };

  return (
    <ListItem>
      {console.log("values", values)}
      {console.log("item", item)}
      {console.log("itemName", itemName)}
      <IconButton
        onClick={
          values.swag.items[item] === 0
            ? null
            : () =>
                handleButtonClick(item, values.swag.items[item] - 1, "subtract")
        }
      >
        <RemoveCircleOutline />
      </IconButton>
      <Box width="25px">
        <TextField
          inputProps={{
            style: { textAlign: "center" }
          }}
          value={values.swag.items[item]}
        ></TextField>
      </Box>
      <IconButton
        onClick={() =>
          handleButtonClick(item, values.swag.items[item] + 1, "add")
        }
      >
        <AddCircleOutline />
      </IconButton>
      <ListItemText primary={itemName} secondary={cost + "nt"} />
    </ListItem>
  );
}
