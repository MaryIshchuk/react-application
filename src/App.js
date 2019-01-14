import React, { Component } from 'react';

// import Loader from './components/Loader/Loader';
import MainWindow from './components/MainWindow/MainWindow';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainWindow />
        {/* <Loader /> */}
      </div>
    );
  }
}

export default App;
