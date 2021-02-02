import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { GET_ERRORS } from '../../actions/types';

const WordForm = () => {
  useEffect(() => {
    
  }, []);
}

export default WordForm;

// export class WordForm extends Component {
//   static propTypes = {
//     word: PropTypes.object.isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this._handleKeydown = this._handleKeydown.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//   }

//   componentDidMount() {
//     document.addEventListener('keydown', this._handleKeydown);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this._handleKeydown);
//   }

//   _handleKeydown(e) {
//     if (e.ctrlKey) {
//       if (e.keyCode === 13) {
//         e.target.closest('form').dispatchEvent(new Event('submit'));
//       }
//       if (e.key === 's') {
//         this.props.history.push(`/word/${this.props.word.id}`);
//       }
//     }
//   }

//   _handleSubmit(e) {
//     e.preventDefault();
//     const isValid = this._validate(e.target);

//     if (isValid) {
//       this.props.history.push(`/word/check/${this.props.word.nextId}`)
//     }
//   }

//   _validate(target) {
//     const word = this.props.word;
//     const { sentence: sentenceField } = target.elements;

//     const isValidSentence = this._validateField(sentenceField, word.sentences.map(sentence => sentence.text));

//     if (word.category === 'verb') {
//       const {
//         präsens: präsensField,
//         präteritum: präteritumField,
//         perfekt: perfektField,
//       } = target.elements;

//       return isValidSentence && 
//         this._validateField(präsensField, word.verbs[0].text) &&
//         this._validateField(präteritumField, word.verbs[1].text) &&
//         this._validateField(perfektField, word.verbs[2].text);
//     }

//     if (word.category === 'noun') {
//       const {
//         artikel: artikelField,
//         plural_ending: pluralEndingField,
//       } = target.elements;

//       return isValidSentence &&
//         this._validateField(artikelField, word.artikel) &&
//         this._validateField(pluralEndingField, word.plural_ending);
//     }
//   }

//   _validateField(field, values) {
//     const arrValues = !Array.isArray(values) ? [values] : values;

//     let isValidField = true;

//     arrValues.map((value) => {
//       if (value !== field.value) {
//         const errorMessage = `${field.name} invalid`;
//         this.props.dispatch({
//           type: GET_ERRORS,
//           payload: {
//             msg: errorMessage,
//           }
//         });
//         isValidField = false;
//       }
//     });

//     return isValidField;
//   }

//   render() {
//     const word = this.props.word;

//     const headerText = word.category == 'noun'
//       ? (
//         <>
//           <span className="form__artikel">
//             <input type="text" name="artikel" />
//           </span>,
//           <span className="form__text">
//             {word.text}
//           </span>
//           <span className="form__ending">
//             {'-'}<input type="text" name="plural_ending" />
//           </span>
//         </>
//       )
//       : (
//         <span className="form__text">
//           {word.text}
//         </span>
//       );

//     const verbInputs = [];
//     if (word.category == 'verb') {
//       for (const [index, verb] of word.verbs.entries()) {
//         verbInputs.push(
//           <li key={index} className="form__verb">
//             <input type="text" name={verb.verb_form.toLowerCase()} />
//           </li>
//         );
//       }
//     }

//     return (
//       <form className="form" onSubmit={this._handleSubmit}>
//         <h1 className="form__header">
//           {headerText}
//         </h1>
//         <ul className="form__verbs">
//           {verbInputs}
//         </ul>
//         <p className="form__sentence">
//           <textarea rows={10} cols={50} name="sentence" />
//         </p>
//         <p className="form__nav">
//           <button className="form__nav-button" type="submit">Check (Ctrl+Enter)</button>
//           |
//           <Link className="form__nav-button" to={`/word/${word.id}`}>Hint (Ctrl+s)</Link>
//         </p>
//       </form>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   const id = ownProps.match.params.word_id;
//   const words = state.words.words;

//   const word = words.find(word => parseInt(word.id, 10) === parseInt(id, 10));

//   return { word };
// };


// export default connect(mapStateToProps)(WordForm);
