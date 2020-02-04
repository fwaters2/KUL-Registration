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
  const {
    item,
    itemName,
    cost,
    values,
    handleButtonClick
  } = props;

  return (
    <ListItem>
      <IconButton onClick={values[item] === 0 ? null : () => handleButtonClick(item, values[item] - 1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Box width="25px">
        <TextField
          inputProps={{
            style: { textAlign: "center" }
          }}
          value={values[item]}
        ></TextField>
      </Box>
      <IconButton onClick={() => handleButtonClick(item, values[item] + 1)}>
        <AddCircleOutline />
      </IconButton>
      <ListItemText primary={itemName} secondary={cost + "nt"} />

    </ListItem>
  );
}
