import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getWord, getNextWord, getPrevWord } from '../../actions/words';

import './WordDetail.scss';

const WordDetail = () => {
  const [word, setWord] = useState({
    category: '',
    sentences: [],
    verbs: [],
  });
  const { wordId } = useParams();

  const headerText = word.category == 'noun'
    ? `${word.artikel}, ${word.text}, -${word.plural_ending}`
    : word.text;

  const isVerb = word.category == 'verb';

  useEffect(() => {
    getWord(wordId).then(response => setWord(response));
  }, [wordId]);

  const history = useHistory();

  const handlePrevBtnClick = () => {
    getNextWord(wordId, { dir: 'prev' }).then(response => history.push(`/word/${response.id}`));
  };

  const handleNextBtnClick = () => {
    getNextWord(wordId).then(response => history.push(`/word/${response.id}`));
  };

  return (
    <article className="word-detail">
      <h1 className="word-detail__header">
        <span>{headerText}</span>
        <a
          className="word-detail__edit-link"
          href={word.change_url}
          target="_blank"
        >
          Edit
        </a>
      </h1>
      <ul>
        {isVerb && word.verbs.map((verb, index) => {
          return (
            <li key={index}>
              <span>{verb.text}</span>
            </li>
          )
        })}
      </ul>
      <ol className="word-detail__sentences">
        {word.sentences.map((sentence, index) => {
          return (<li key={index} className="word-detail__sentence">
            <span>{sentence.text}</span>
            <a
              className="word-detail__edit-link"
              href={sentence.change_url}
              target="_blank"
            >
              Edit
            </a>
          </li>)
        })}
      </ol>
      <p className="word-detail__nav">
        <button className="word-detail__nav-button" onClick={handlePrevBtnClick}>{'< Prev (a)'}</button>
        |
        <Link className="word-detail__nav-button" to={`/word/check/${word.id}`}>{'Challenge (w)'}</Link>
        |
        <button className="word-detail__nav-button" onClick={handleNextBtnClick}>{'Next (d) >'}</button>
      </p>
    </article>
  );
};

export default WordDetail;

// export class WordDetail extends Component {
//   static propTypes = {
//     word: PropTypes.object.isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this._handleKeydown = this._handleKeydown.bind(this);
//   }

//   componentDidMount() {
//     const { id } = useParams();
//     alert(`ID: ${id}`);
//     document.addEventListener('keydown', this._handleKeydown);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this._handleKeydown);
//   }

//   _handleKeydown(e) {
//     const word = this.props.word;

//     const PREV_KEY = 'a';
//     const NEXT_KEY = 'd';
//     const CHALLENGE_KEY = 'w';

//     switch (e.key) {
//       case PREV_KEY:
//         this.props.history.push(`/word/${word.prevId}`);
//         break;
//       case NEXT_KEY:
//         this.props.history.push(`/word/${word.nextId}`);
//         break;
//       case CHALLENGE_KEY:
//         this.props.history.push(`/word/check/${word.id}`);
//         break;
//       default:
//         return;
//     }
//   }

//   render() {
//     const word = this.props.word;

//     const headerText = word.category == 'noun'
//       ? `${word.artikel}, ${word.text}, -${word.plural_ending}`
//       : word.text;

//     const sentences = [];
//     for (const [index, sentence] of word.sentences.entries()) {
//       sentences.push(
//         <li key={index} className="word-detail__sentence">
//           <span>{sentence.text}</span>
//           <a
//             className="word-detail__edit-link"
//             href={sentence.change_url}
//             target="_blank"
//           >
//             Edit
//           </a>
//         </li>
//       )
//     }

//     const verbs = [];
//     if (word.category == 'verb') {
//       for (const [index, verb] of word.verbs.entries()) {
//         verbs.push(
//           <li key={index}>
//             <span>{verb.text}</span>
//           </li>
//         );
//       }
//     }

//     return (
//       <article className="card">
//         <h1 className="word-detail__header">
//           <span>{headerText}</span>
//           <a
//             className="word-detail__edit-link"
//             href={word.change_url}
//             target="_blank"
//           >
//             Edit
//           </a>
//         </h1>
//         <ul>
//           {verbs}
//         </ul>
//         <ol className="word-detail__sentences">
//           {sentences}
//         </ol>
//         <p className="word-detail__nav">
//           <Link className="word-detail__nav-button" to={`/word/${word.prevId}`}>{'< Prev (a)'}</Link>
//           |
//           <Link className="word-detail__nav-button" to={`/word/check/${word.id}`}>{'Challenge (w)'}</Link>
//           |
//           <Link className="word-detail__nav-button" to={`/word/${word.nextId}`}>{'Next (d) >'}</Link>
//         </p>
//       </article>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   const id = ownProps.match.params.word_id;
//   const words = state.words.words;

//   const word = words.find(word => parseInt(word.id, 10) === parseInt(id, 10));
//   const index = words.indexOf(word);

//   word.prevId = words.indexOf(words[index - 1]) > -1 ? words[index - 1].id : words[words.length - 1].id;
//   word.nextId = words.indexOf(words[index + 1]) > -1 ? words[index + 1].id : words[0].id;

//   return { word };
// };

// const mapStateToProps = state => ({
//   currentWord: state.words.currentWord,
// });

// export default connect(
//   mapStateToProps,
//   { getWord },
// )(WordDetail);
