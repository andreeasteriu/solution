import React, { useState } from "react";
import classes from "./Modal.module.css";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import data from "../../assets/data";
import { validateForm } from "../../helpers/validation";
import toastr from "toastr";
import "../../styles/toastr.css";

import ClipLoader from "react-spinners/ClipLoader";

const NewTextField = withStyles({
  root: {
    width: "100%",
    marginTop: "10px",
    "& label.Mui-focused": {
      color: "#f50057",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#f50057",
      },
      "& label.Mui-focused": {
        color: "black",
      },
    },
  },
})(TextField);

const SubmitButton = withStyles({
  root: {
    width: "100%",
    height: "56px",
    marginTop: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "17px",
    backgroundColor: "#E4215B",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#f02551",
    },
    "&:focused": {
      boxShadow: "none",
      backgroundColor: "black",
    },
    "&:active": {
      boxShadow: "none",
      transition: "0.1s",
      color: "pink",
    },
    "& .MuiButton-label": {
      color: "white",
    },
    textTransform: "none",
  },
})(Button);

const AuthModal = (props) => {
  const [showPage, setShowPage] = useState(props.page);
  const [loadingButton, setLoadingButton] = useState(false);
  const [post_title, setTitle] = useState("");
  const [post_description, setDescription] = useState("");

  const [files, setFiles] = useState([]);

  // const setNewFiles = (files) => setFiles(files);

  const handleClose = () => props.closeModal();

  let switchModalButtons, createPostContent;

  if (showPage === "Post") {
    createPostContent = (
      <React.Fragment>
        <div>
          <NewTextField
            id="outlined-title-input"
            label="Title"
            type="text"
            autoComplete="off"
            variant="outlined"
            value={post_title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <NewTextField
            id="outlined-multiline-static"
            label="Content"
            type="text"
            multiline
            rows={4}
            autoComplete="off"
            variant="outlined"
            value={post_description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* <div>
          <DragAndDrop files={files} setNewFiles={setNewFiles} />
        </div> */}
      </React.Fragment>
    );
  }

  const submitForm = async () => {
    // ====================== CREATE A POST ======================
    if (showPage === "Post") {
      // ====================== VALIDATION ======================
      const postContentData = [
        { type: "title", val: post_title },
        { type: "description", val: post_description },
      ];

      const isFormValid = validateForm(postContentData);
      if (!isFormValid.formIsValid)
        return toastr.error(`Invalid ${isFormValid.invalids.join(", ")}`);
      // const requestData = new FormData();

      const postContent = { title: post_title, description: post_description };

      // requestData.append("data", JSON.stringify(postContent));
      // files.map((file) => requestData.append("images", file, file.name));

      setLoadingButton(true);
      console.log(postContent);
      const res = data.unshift(postContent);
      setLoadingButton(false);

      // ====================== RESPONSE ======================
      if (res.status === 1) {
        toastr.success("You created a post", "Post was created successfully!");
        props.closeModal();
        window.location.reload(1);
      } else return toastr.error(res.response);
    }
  };

  let closeIcon;
  if (showPage) {
    closeIcon = (
      <div onClick={handleClose} className={classes.closeButton}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    );
  }
  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContainer}>
          <div className={classes.titleContainer}>
            <h1 style={{ paddingLeft: "1em" }}>Add your message</h1>
            {closeIcon}
          </div>
          <div className={classes.FormContainer}>
            <form className={classes.PostForm} noValidate autoComplete="off">
              {createPostContent ? createPostContent : undefined}

              <SubmitButton variant="contained" onClick={() => submitForm()}>
                {loadingButton ? (
                  <ClipLoader size={18} color={"#fff"} />
                ) : (
                  showPage
                )}
              </SubmitButton>

              {switchModalButtons ? switchModalButtons : undefined}
            </form>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default AuthModal;
