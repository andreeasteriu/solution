import React from "react";
import { Pagination } from "@material-ui/lab";

const CreatePagination = ({ setCurrentPage, postsPerPage, totalPosts }) => {
  const pagesCount = Math.ceil(totalPosts / postsPerPage);
  console.log(postsPerPage);

  //   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //     pagesCount.push(i);
  //   }

  const handleClick = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Pagination
      count={pagesCount}
      onChange={handleClick}
      color="secondary"
      variant="outlined"
    />
  );
};

export default CreatePagination;
