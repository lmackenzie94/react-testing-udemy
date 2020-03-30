import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  handleIncrement = () => {
    return;
  };
  render() {
    return (
      // we use 'babel-plugin-react-remove-properties'
      // to remove data attrs in production
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is {this.state.counter}</h1>
        <button
          data-test="increment-button"
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Add 1
        </button>
      </div>
    );
  }
}

export default App;
