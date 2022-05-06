import Results from './Results';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Recommend = () => {
  const [books, setBooks] = useState([]);
  const requestBooks = () => {
    axios.get(`http://localhost:3000/bookbee/books/?semester=`).then((response) => {
      const myBooks = response.data;
      setBooks(myBooks);
      // console.log(myBooks);
    });
  };
  useEffect(() => requestBooks(), []);
  return (
    <div className="recommend">
      <Results books={books} />
    </div>
  );
};

export default Recommend;
