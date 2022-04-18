import ReactDOM from 'react-dom';
import Book from './Book';
import LoginForm from './components/auth/login';
import SearchParams from './SearchParams';

const App = () => {
  return (
    <div>
      <h1>Adopt Me</h1>
      {/* <LoginForm></LoginForm> */}
      <SearchParams />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
