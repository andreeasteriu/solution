import classes from "./Home.module.css";
import PostContainer from "../../components/PostContainer/PostContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import data from "../../assets/data";
function Home() {
  return (
    <div className={classes.Home}>
      <SearchBar />
      <div className={classes.GridContainer}>
        {data.map((post) => {
          return <PostContainer post={post} />;
        })}
      </div>
    </div>
  );
}

export default Home;
