import React from "react";
import classes from "./AddPost.module.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const AddPost = ({ setModal }) => {
  return (
    <Fab
      size="small"
      color="secondary"
      aria-label="add"
      className={classes.margin}
      onClick={() => setModal("Post")}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddPost;
