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

  const handleButtonClick = (name, value) => {
    setValues({
      ...values,
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
            : () => handleButtonClick(item, values.swag.items[item] - 1)
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
        onClick={() => handleButtonClick(item, values.swag.items[item] + 1)}
      >
        <AddCircleOutline />
      </IconButton>
      <ListItemText primary={itemName} secondary={cost + "nt"} />
    </ListItem>
  );
}
