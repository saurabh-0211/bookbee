import { Component } from 'react';

class Home extends Component {
  render() {
    if (this.props.user) {
      return <h2> Hii, {this.props.user.name} </h2>;
    }
  }
}

export default Home;
