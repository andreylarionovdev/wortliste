import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export class WordDetail extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
  };

  render() {
    const word = this.props.word;

    const headerText = word.category == 'noun'
      ? `${word.artikel}, ${word.text}, -${word.plural_ending}`
      : word.text;

    const sentences = [];
    for (const [index, sentence] of word.sentences.entries()) {
      sentences.push(
        <li key={index} className="card__sentence">
          <span>{sentence}</span>
        </li>
      )
    }

    const verbs = [];
    if (word.category == 'verb') {
      for (const [index, verb] of word.verbs.entries()) {
        verbs.push(
          <li key={index}>
            <span>{verb}</span>
          </li>
        );
      }
    }

    return (
      <article className="card">
        <h1 className="card__header">
          {headerText}
        </h1>
        <ul>
          {verbs}
        </ul>
        <ol className="card__sentences">
          {sentences}
        </ol>
        <p className="card__nav">
          <Link className="card__nav-button" to={`/word/${word.prevId}`}>{'< Prev'}</Link>
          |
          <Link className="card__nav-button" to={`/word/${word.nextId}`}>{'Next >'}</Link>
        </p>
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.word_id;
  const words = state.words.words;

  const word = words.find(word => parseInt(word.id, 10) === parseInt(id, 10));
  const index = words.indexOf(word);

  word.prevId = words.indexOf(words[index - 1]) > -1 ? words[index - 1].id : words[words.length - 1].id;
  word.nextId = words.indexOf(words[index + 1]) > -1 ? words[index + 1].id : words[0].id;

  return { word };
};

export default connect(mapStateToProps)(WordDetail);
