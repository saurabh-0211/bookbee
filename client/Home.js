import { Component } from 'react';

class Home extends Component {
  render() {
    if (this.props.user.loading === true) {
      return <h2> Hii, {this.props.user.user.name} </h2>;
    } else {
      return <h2> hello</h2>;
    }
  }
}

export default Home;
