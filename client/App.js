import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SearchParams from './SearchParams';
import Details from './Details';
import Navbar from './components/navbar';

const App = () => {
  return (
    <div>
      <Router>
        <header>
          <Navbar />
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
          <Route path="/">
            <SearchParams />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
