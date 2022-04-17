import { useState, useEffect } from 'react';
import axios from 'axios';

const localCache = [];

export default function useSubjectList(semester) {
  const [subjectList, setSubjectList] = useState([]);
  const [status, setStatus] = useState('unloaded');
  let setOfSubjects = new Set();

  useEffect(() => {
    if (!semester) {
      setSubjectList([]);
    } else if (localCache[semester]) {
      setSubjectList(localCache[semester]);
    } else {
      requestSubjectList();
    }
    async function requestSubjectList() {
      setSubjectList([]);
      setStatus('loading');

      axios
        .get(`http://localhost:3000/bookbee/books?semester=${semester}`)
        .then((response) => {
          const json = response.data;
          json
            .map((data) => data.subject)
            .forEach((item) => setOfSubjects.add(item));

          localCache[semester] = [...setOfSubjects].map((data) => data) || [];
          setSubjectList(localCache[semester]);
          setStatus('loaded');
        });
    }
  }, [semester]);
  return [subjectList, status];
}
