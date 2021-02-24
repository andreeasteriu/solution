import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className={classes.App}>
      <Router basename="/">
        <div className={classes.Root}>
          <Switch>
            <Route exact path="/" component={(props) => <Home {...props} />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
