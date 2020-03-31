import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false
    };
  }

  decrementCounter = () => {
    if (this.state.counter === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ counter: this.state.counter - 1 });
    }
  };

  // for challenge #3, I separated the incrementCounter onClick
  incrementCounter = () => {
    if (this.state.error) {
      this.setState({ error: false });
    }
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      // we use 'babel-plugin-react-remove-properties'
      // to remove data attrs in production
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is {this.state.counter}</h1>
        <div data-test="error-message" className={`error ${errorClass}`}>
          The counter cannot go below 0
        </div>
        <button data-test="increment-button" onClick={this.incrementCounter}>
          Add 1
        </button>
        <button data-test="decrement-button" onClick={this.decrementCounter}>
          Add 1
        </button>
      </div>
    );
  }
}

export default App;
