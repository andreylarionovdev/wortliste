import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export class WordForm extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('submit', this._handleSubmit);
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log('react submit');
    console.log(this.props.word);
  }

  render() {
    const word = this.props.word;

    const headerText = word.category == 'noun'
      ? (
          <>
            <span className="form__artikel">
              <input type="text" />
            </span>,
            <span className="form__text">
              {word.text}
            </span>
            <span className="form__ending">
              {'-'}<input type="text" />
            </span>
          </>
        )
      : (
          <span className="form__text">
            {word.text}
          </span>
        );

    const verbInputs = [];
    if (word.category == 'verb') {
      for (const [index, verb] of word.verbs.entries()) {
        verbInputs.push(
          <li key={index} className="form__verb">
            <input type="text" />
          </li>
        );
      }
    }

    return (
      <form className="form">
        <h1 className="form__header">
          {headerText}
        </h1>
        <ul className="form__verbs">
          {verbInputs}
        </ul>
        <p className="form__sentence">
          <textarea rows={10} columns={30} />
        </p>
        <p className="form__nav">
          <button className="form__nav-button form__nav-button_type_submit">Check</button>
          <Link className="form__nav-link" to={`/word/${word.id}`}>{'Hint'}</Link>
        </p>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.word_id;
  const words = state.words.words;

  const word = words.find(word => parseInt(word.id, 10) === parseInt(id, 10));

  return { word };
};


export default connect(mapStateToProps)(WordForm);
