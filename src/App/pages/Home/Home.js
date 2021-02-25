import classes from "./Home.module.css";
import PostContainer from "../../components/PostContainer/PostContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import CreatePagination from "../../components/Pagination/Pagination";
import data from "../../assets/data";
import { useState } from "react";

const Home = () => {
  const titles = data.map((val) => {
    return val.title;
  });
  const [value, setValue] = useState(titles[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className={classes.Home}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        options={titles}
        value={value}
        setValue={setValue}
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
  );
};

export default Home;
