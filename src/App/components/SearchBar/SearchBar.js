import React from "react";
import classes from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";
import AddPost from "../AddPost/AddPost";

const SearchInput = withStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f0f2f5",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none !important",
        borderColor: "#f0f2f5",
      },
      "&:hover fieldset": {
        borderColor: "#f0f2f5",
      },
      "&:before fieldset": {
        borderColor: "#f0f2f5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f0f2f5",
        borderWidth: "1px",
      },
      "& .MuiAutocomplete-input": {
        lineHeight: "1.9",
      },
    },
  },
})(TextField);

const SearchAutocomplete = withStyles({
  root: {
    "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {
      transform: "translate(14px, 14px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
  },
  inputRoot: {
    padding: "5px 0 !important",
  },
  endAdornment: {
    top: "calc(50% - 12px)",
  },
})(Autocomplete);

const SearchBar = ({
  value,
  setValue,
  searchTerm,
  setSearchTerm,
  options,
  setModal,
}) => {
  return (
    <div className={classes.SearchBar}>
      <SearchAutocomplete
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        inputValue={searchTerm}
        onInputChange={(e, newInputValue) => {
          setSearchTerm(newInputValue);
        }}
        options={options}
        noOptionsText="No results found"
        style={{ width: 500, margin: "auto" }}
        renderInput={(params) => (
          <div className={classes.Search}>
            <div className={classes.SearchIcon}>
              <SearchIcon />
            </div>
            <SearchInput
              {...params}
              label=""
              placeholder="Search"
              type="string"
              variant="outlined"
            />
          </div>
        )}
      />
      <AddPost setModal={setModal} />
    </div>
  );
};

export default SearchBar;
