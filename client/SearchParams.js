import { useState, useEffect } from 'react';
import Book from './Book';

const SEMESTER = ['1', '2', '3', '4', '5', '6'];

const SearchParams = () => {
  const [search, setSearch] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [books, setBooks] = useState([]);
  const subjects = [];

  useEffect(() => {
    requestBooks();
  }, []);

  async function requestBooks() {
    const res = await fetch(
      `http://localhost:3000/bookbee/books?semester=${semester}&subject=${subject}&search=${search}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors'
      }
    );
    const json = await res.json();

    console.log(json);
    setBooks(json.books);
  }

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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
