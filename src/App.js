import React from "react";
import "./App.css";

import Pokedex from "./Pokedex";
// this will be the main staging component
function App() {
  return (
    <div className="App">
      {/* Components go here */}
      <Pokedex />
      {/* Components that need to be redirected go here */}
    </div>
  );
}

export default App;
