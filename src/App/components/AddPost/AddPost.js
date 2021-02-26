import React from "react";
import classes from "./AddPost.module.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const AddPost = ({ setModal }) => {
  return (
    <React.Fragment>
      <div className={classes.AddContainer}>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => setModal("Post")}
        >
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
};

export default AddPost;
