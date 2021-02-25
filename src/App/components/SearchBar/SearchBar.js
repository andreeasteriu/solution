import classes from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBar = ({ value, setValue, searchTerm, setSearchTerm, options }) => {
  console.log(value);
  return (
    <div className={classes.SearchBar}>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={searchTerm}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => (
          <div className={classes.Search}>
            <div className={classes.SearchIcon}>
              <SearchIcon />
            </div>
            <TextField {...params} label="Controllable" variant="outlined" />
          </div>
        )}
      />
    </div>
  );
};

export default SearchBar;
