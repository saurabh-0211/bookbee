import { Component } from 'react';

class Home extends Component {
  render() {
    console.log(this.props);
    if (localStorage.getItem('token')) {
      return <h2> Hii, {this.props.user.name} </h2>;
    } else {
      return <h2> Login and then come</h2>;
    }
  }
}

export default Home;
