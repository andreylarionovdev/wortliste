import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

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
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.word_id;
  return {
    word: state.words.words.find(word => parseInt(word.id, 10) === parseInt(id, 10))
  }
};

export default connect(mapStateToProps)(WordDetail);
