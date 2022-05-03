import { Component } from 'react';

class Home extends Component {
  componentDidMount() {
    console.log('hello');
  }
  render() {
    return <h2>You aren't logged in</h2>;
  }
}

export default Home;
