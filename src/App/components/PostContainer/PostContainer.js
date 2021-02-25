import React from "react";
import classes from "./PostContainer.module.css";

const PostContainer = (props, key) => {
  const { title, description, imagePath } = props.post;
  return (
    <div className={classes.PostContainer} key={key}>
      <div className={classes.imageContainer}>
        <img src={imagePath} className={classes.Image} alt="img" />
      </div>
      <h2 className={classes.Title}>{title}</h2>
      <p className={classes.Description}>{description}</p>
    </div>
  );
};

export default PostContainer;
