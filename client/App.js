import ReactDOM from 'react-dom';
import Book from './Book';

const App = () => {
  return (
    <div>
      <h1>Adopt Me</h1>
      <Book name="Luna" animal="Dog" breed="Havanese" />
      <Book name="Pepper" animal="Bird" breed="Cockatiel" />
      <Book name="Beam" animal="Dog" breed="Wheaten Terrier" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
