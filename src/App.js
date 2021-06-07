import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokedex from "./Pokedex";
// this will be the main staging component
function App() {
  return (
    <Router>
      <div className="App">
        {/* Components go here */}
        <Switch>
          {/* Components that need to be redirected go here */}
          <Route path="/" exact component={Pokedex} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
