import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import Home from "./pages/Home/Home";
import toastr from "toastr";
import toastrSetup from "./helpers/toastrSettings";

const App = () => {
  toastr.options = toastrSetup;
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
};

export default App;
