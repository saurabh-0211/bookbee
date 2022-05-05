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
    loggedIn: false,
    user: null,
    loading: false
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      axios
        .get('http://localhost:3000/bookbee/users/user', config)
        .then((res) => {
          console.log('hello');
          this.setState({
            loggedIn: true,
            user: res.data,
            loading: true
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loggedIn != prevState.loggedIn) {
      if (localStorage.getItem('token')) {
        const config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        };
        axios
          .get('http://localhost:3000/bookbee/users/user', config)
          .then((res) => {
            this.setState({
              loggedIn: true,
              user: res.data,
              loading: true
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.setState({
          loggedIn: false,
          user: null,
          loading: false
        });
      }
    }
  }

  handleLogin = (e) => {
    this.setState({ loggedIn: e });
  };

  render() {
    return (
      <div>
        <Router>
          <header>
            <Navbar user={this.state.user} handleLogin={this.handleLogin} />
            {/* handleLogin is passed cuz Logout is done here */}
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details user={this.state.user} />
            </Route>
            <Route path="/login">
              <Login user={this.state.user} handleLogin={this.handleLogin} />
            </Route>
            <Route path="/navbar"></Route>
            <Route path="/register">
              <Register handleLogin={this.handleLogin} />
            </Route>
            <Route exact path="/home" component={() => <Home user={this.state.user} />} />
            {/* <Route path="/home" render={(props) => <Home {...props} />} /> */}
            <Route path="/">
              <SearchParams user={this.state} />
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
