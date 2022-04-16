import ReactDOM from 'react-dom';
import Book from './Book';
import LoginForm from './components/auth/login';


const App = () => {
  return (
    <div>
      <h1>Adopt Me</h1>
      <LoginForm></LoginForm>
      <Book name="Luna" animal="Dog" breed="Havanese" />
      <Book name="Pepper" animal="Bird" breed="Cockatiel" />
      <Book name="Beam" animal="Dog" breed="Wheaten Terrier" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
