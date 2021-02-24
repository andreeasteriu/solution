import classes from "./PostContainer.module.css";

function PostContainer(props) {
  const { title, description, imagePath } = props.post;
  return (
    <div className={classes.PostContainer}>
      <img src={imagePath} className={classes.Image} alt="img" />
      <div className={classes.Title}>{title}</div>
      <div className={classes.Description}>{description}</div>
    </div>
  );
}

export default PostContainer;
