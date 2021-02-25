import React from "react";
import classes from "./Home.module.css";
import PostContainer from "../../components/PostContainer/PostContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import CreatePagination from "../../components/Pagination/Pagination";
import data from "../../assets/data";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const titles = data.map((val) => {
    return val.title;
  });
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [showModal, setShowModal] = useState("");

  const setModal = (modalName) => setShowModal(modalName);
  const closeModal = () => {
    setShowModal(undefined);
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  let modalToShow;
  if (showModal)
    modalToShow = <Modal page={showModal} closeModal={closeModal} />;

  return (
    <React.Fragment>
      <div className={classes.Home}>
        <h1 className={classes.Title}>Create your own glowing message.</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          options={titles}
          value={value}
          setValue={setValue}
          setModal={setModal}
        />
        <div className={classes.GridContainer}>
          {data
            .filter((val) => {
              if (searchTerm === "") return val;
              else if (
                val.title.toLowerCase().startsWith(searchTerm.toLowerCase())
              )
                return val;
              return undefined;
            })
            .slice(indexofFirstPost, indexOfLastPost)
            .map((val, key) => {
              return <PostContainer key={key} post={val} />;
            })}
        </div>
        <div className={classes.PaginationContainer}>
          <CreatePagination
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={data.length}
          />
        </div>
      </div>
      {modalToShow ? modalToShow : undefined}
    </React.Fragment>
  );
};

export default Home;
