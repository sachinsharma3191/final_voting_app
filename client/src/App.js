import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Router from './routing/Router';

import "./App.css";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}

export default App;
