import { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Results';
import useSubjectList from './useSubjectList';

const SEMESTER = ['1', '2', '3', '4', '5', '6', '7', '8'];

const SearchParams = ({ user }) => {
  const [search, setSearch] = useStickyState('', 'search');
  const [semester, setSemester] = useStickyState('', 'semester');
  const [subject, setSubject] = useStickyState('', 'subject');
  const [books, setBooks] = useState([]);
  const [subjects] = useSubjectList(semester);
  const [page, setPage] = useState(1);

  const requestBooks = () => {
    axios
      .get(
        `http://localhost:3000/bookbee/books/?semester=${semester}&subject=${subject}&page=${page}`
      )
      .then((response) => {
        const myBooks = response.data;
        setBooks(myBooks);
        // console.log(myBooks);
      });
  };

  const searchBooks = () => {
    axios
      .get(`http://localhost:3000/bookbee/books/search/?searchText=${search}&page=${page}`)
      .then((res) => {
        const myBooks = res.data;
        setBooks(myBooks);
      });
  };

  useEffect(() => requestBooks(), [page]);

  function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const pageIncr = () => {
    setPage(page + 1);
  };
  const pageDecr = () => {
    page === 1 ? setPage(1) : setPage(page - 1);
  };
  const pageReset = () => {
    setPage(1);
  };

  return (
    <div className="search-params">
      <div className="manual-search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestBooks();
          }}
        >
          <label htmlFor="semester">Semester</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option />
            {SEMESTER.map((semester) => (
              <option value={semester} key={semester}>
                {semester}
              </option>
            ))}
          </select>

          <label htmlFor="subject">Subject</label>
          <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option />
            {subjects.map((subject) => (
              <option value={subject} key={subject}>
                {subject}
              </option>
            ))}
          </select>

          <button onClick={pageReset}>Submit</button>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchBooks();
          }}
        >
          <label htmlFor="search">Search</label>
          <input
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Titles, Book..."
          />
          <button onClick={pageReset}>Search</button>
        </form>
      </div>
      <div>
        <Results books={books} />
        <div className="page-btn">
          <button onClick={pageDecr}>prev</button>
          <button onClick={pageIncr}>next</button>
        </div>
      </div>
    </div>
  );
};

export default SearchParams;
