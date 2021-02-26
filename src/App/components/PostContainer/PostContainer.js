import React from "react";
import classes from "./PostContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const PostContainer = (props, key) => {
  const { id, title, description, imagePath } = props.post;

  return (
    <div className={classes.PostContainer} key={key}>
      <div
        onClick={(e) => {
          props.handleDeletePost(id);
        }}
        className={classes.closeButton}
      >
        <FontAwesomeIcon icon={faTimes} />
      </div>

      <div className={classes.imageContainer}>
        <img src={imagePath} className={classes.Image} alt="img" />
      </div>
      <h2 className={classes.Title}>{title}</h2>
      <p className={classes.Description}>{description}</p>
    </div>
  );
};

export default PostContainer;
