import React, { Component } from 'react';
import Display from './display';

class Counter extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { count } = this.state;

    setInterval(() => {
      this.setState({
        count: count + 1,
      });
    }, 1000);
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <Display count={count} />
      </div>
    );
  }
}

export default Counter;
