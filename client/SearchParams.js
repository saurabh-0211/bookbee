import { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import useSubjectList from './useSubjectList';

const SEMESTER = ['1', '2', '3', '4', '5', '6', '7', '8'];

const SearchParams = () => {
  const [search, setSearch] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [books, setBooks] = useState([]);
  const [subjects] = useSubjectList(semester);

  const bookRequest = () => {
    axios.get(`http://localhost:3000/bookbee/books`).then((response) => {
      const myBooks = response.data;
      setBooks(myBooks);
    });
  };

  useEffect(() => bookRequest(), []);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Titles, Book.."
        />
        <label htmlFor="semester">Semester</label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option />
          {SEMESTER.map((semester) => (
            <option value={semester} key={semester}>
              {semester}
            </option>
          ))}
        </select>

        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option />
          {subjects.map((subject) => (
            <option value={subject} key={subject}>
              {subject}
            </option>
          ))}
        </select>
        <button onClick={bookRequest}>Submit</button>
        {books.map((book) => (
          <Book
            // subject={book.subject}
            bookName={book.bookName}
            // semester={book.semester}
            key={book._id}
          />
        ))}
      </form>
    </div>
  );
};

export default SearchParams;
