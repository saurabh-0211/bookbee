import { Component, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import SearchParams from './SearchParams';
import Details from './Details';
import Navbar from './Navbar';
import Home from './Home';
import axios from 'axios';

class App extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    axios
      .get('http://localhost:3000/bookbee/users/user', config)
      .then((res) => {
        this.setState({
          user: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Router>
          <header>
            <Navbar user={this.state.user} />
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/navbar"></Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/home" component={() => <Home user={this.state.user} />} />
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
