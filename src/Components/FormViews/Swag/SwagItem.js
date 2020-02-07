import React from "react";
import {
  ListItem,
  IconButton,
  Box,
  TextField,
  ListItemText
} from "@material-ui/core";
import { RemoveCircleOutline, AddCircleOutline } from "@material-ui/icons";

export default function SwagItem(props) {
  const { item, itemName, cost, values, setValues } = props;

  const handleButtonClick = (name, value) => {
    setValues("items", { ...values.items, [name]: value });
    //setValues({ ...values, [name]: value });
  };

  return (
    <ListItem>
      {console.log("values", values)}
      {console.log("item", item)}
      {console.log("itemName", itemName)}
      <IconButton
        onClick={
          values.items[item] === 0
            ? null
            : () => handleButtonClick(item, values.items[item] - 1)
        }
      >
        <RemoveCircleOutline />
      </IconButton>
      <Box width="25px">
        <TextField
          inputProps={{
            style: { textAlign: "center" }
          }}
          value={values.items[item]}
        ></TextField>
      </Box>
      <IconButton
        onClick={() => handleButtonClick(item, values.items[item] + 1)}
      >
        <AddCircleOutline />
      </IconButton>
      <ListItemText primary={itemName} secondary={cost + "nt"} />
    </ListItem>
  );
}
