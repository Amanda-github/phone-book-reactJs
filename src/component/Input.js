import React from "react";
import { TextField } from "@material-ui/core";

const styles = {
  inputWrapper: {
    marginBottom: 20,
  },
};

const Input = ({ value, onChange, label, helperText, contact }) => {
  return (
    <div>
      <TextField
        id="outlined-full-width"
        label={label}
        helperText={helperText}
        fullWidth
        style={contact ? null : styles.inputWrapper}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
