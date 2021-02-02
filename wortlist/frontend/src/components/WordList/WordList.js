import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWords } from '../../actions/words';

const WordList = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    getWords().then(response => setWords(response));
  }, []);

  return (
    <ul>
      {words.map(word => {
        const linkText = word.category === 'noun'
          ? `${word.text},${word.artikel}`
          : word.text;

        return (
          <li key={word.id}>
            <Link to={`/word/${word.id}`}>{linkText}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default WordList;
