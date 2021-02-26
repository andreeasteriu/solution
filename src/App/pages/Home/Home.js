import React, { useEffect } from "react";
import classes from "./Home.module.css";
import PostContainer from "../../components/PostContainer/PostContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import toastr from "toastr";
import CreatePagination from "../../components/Pagination/Pagination";
import { getFeedPosts, removePost } from "../../helpers/posts";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [posts, setPosts] = useState(undefined);
  const [value, setValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      if (posts === undefined) {
        const posts = await getFeedPosts();
        if (posts) setPosts(posts);
        else toastr.error("Something went wrong!");
      }
    };

    if (posts === undefined) fetchPosts();
  }, [posts]);

  // DELETE POST
  const handleDeletePost = async (id) => {
    const result = await removePost(id);
    if (result.status === 1) {
      const indexDeleted = posts.findIndex((post) => post.id === id);
      const newPosts = [...posts];
      newPosts.splice(indexDeleted, 1);
      setPosts(newPosts);
      toastr.success("Property deleted successfully!");
    }
  };

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

  if (posts === undefined) {
    return (
      <div className="loading">
        <ClipLoader size={50} color={"#f50057"} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.Home}>
        <h1 className={classes.Title}>Create your own glowing message.</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          options={
            posts
              ? posts.map((val) => {
                  return val.title;
                })
              : undefined
          }
          value={value}
          setValue={setValue}
          setModal={setModal}
        />
        <div className={classes.GridContainer}>
          {posts
            .filter((post) => {
              if (searchTerm === "") return post;
              else if (
                post.title.toLowerCase().startsWith(searchTerm.toLowerCase())
              )
                return post;
              return undefined;
            })
            .slice(indexofFirstPost, indexOfLastPost)
            .map((post) => {
              return (
                <PostContainer
                  key={post.id}
                  post={post}
                  handleDeletePost={handleDeletePost}
                />
              );
            })}
        </div>
        <div className={classes.PaginationContainer}>
          <CreatePagination
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
          />
        </div>
      </div>
      {modalToShow ? modalToShow : undefined}
    </React.Fragment>
  );
};

export default Home;
