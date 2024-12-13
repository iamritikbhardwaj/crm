
import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";
import { GoogleAutoCompleteKey } from "../../appConstants";
import PropTypes from "prop-types";
import "../../../src/App.css"
const AutoCompleteAddress = (props) => {

  const { ref } = usePlacesWidget({
    apiKey: GoogleAutoCompleteKey,
    onPlaceSelected: props.onPlaceSelected,
    options: {
      types: ["address"],
      componentRestrictions: { country: "us" || "in"},

    },
  });
  const disableAutocomplete = () => {
    const inputElement = document.getElementById("inputField"); // Replace with the actual ID of your input element
    if (inputElement) {
      inputElement.setAttribute("autocomplete", "off");
    }
  };
  window.addEventListener("load", disableAutocomplete);

  return (

    <TextField
      inputRef={ref}
      inputProps={{
        maxLength: 100,
        // padding: "10px",
      }}
      helperText={props.helperText}
      error={props.error}

      autoComplete="off"
      disabled={props.disabled}
      className="GoogleInput"
      onChange={props.onChange}
      inputclassname="GoogleInput"
      fullWidth
      id={"outlined-error"}
      value={props.value}
      placeholder={props.defaultValue}
      label="Street Address"
      // InputLabelProps={{ shrink: true }}
      variant={props.variant === "standard" ? "standard" : "outlined"}
      sx={{

        '& .MuiOutlinedInput-input': {
          padding: 1.814
        },

        // '& input': {

        //   padding: 1.814,
        //   boxSizing: 'border-box',
        // },


        marginTop: 2
      }}
    />

  );
};


export default AutoCompleteAddress;

AutoCompleteAddress.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
  value: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  variant: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};