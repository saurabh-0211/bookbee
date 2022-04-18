import { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Results';
import useSubjectList from './useSubjectList';

const SEMESTER = ['1', '2', '3', '4', '5', '6', '7', '8'];

const SearchParams = () => {
  const [search, setSearch] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [books, setBooks] = useState([]);
  const [subjects] = useSubjectList(semester);

  const requestBooks = () => {
    axios
      .get(
        `http://localhost:3000/bookbee/books?semester=${semester}&subject=${subject}`
      )
      .then((response) => {
        const myBooks = response.data;
        setBooks(myBooks);
        console.log(myBooks);
      });
  };

  useEffect(() => requestBooks(), []);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestBooks();
        }}
      >
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
        <button>Submit</button>
      </form>
      <Results books={books} />
    </div>
  );
};

export default SearchParams;
