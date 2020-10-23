import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

export class WordDetail extends Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this._handleKeydown = this._handleKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeydown);
  }

  _handleKeydown(e) {
    const word = this.props.word;

    const PREV_KEY = 'a';
    const NEXT_KEY = 'd';
    const CHALLENGE_KEY = 'w';

    switch (e.key) {
      case PREV_KEY:
        this.props.history.push(`/word/${word.prevId}`);
        break;
      case NEXT_KEY:
        this.props.history.push(`/word/${word.nextId}`);
        break;
      case CHALLENGE_KEY:
        this.props.history.push(`/word/check/${word.id}`);
        break;
      default:
        return;
    }
  }

  render() {
    const word = this.props.word;

    const headerText = word.category == 'noun'
      ? `${word.artikel}, ${word.text}, -${word.plural_ending}`
      : word.text;

    const sentences = [];
    for (const [index, sentence] of word.sentences.entries()) {
      sentences.push(
        <li key={index} className="card__sentence">
          <span>{sentence.text}</span>
          <a
            className="card__edit-link"
            href={sentence.change_url}
            target="_blank"
          >
            Edit
          </a>
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
          <span>{headerText}</span>
          <a
            className="card__edit-link"
            href={word.change_url}
            target="_blank"
          >
            Edit
          </a>
        </h1>
        <ul>
          {verbs}
        </ul>
        <ol className="card__sentences">
          {sentences}
        </ol>
        <p className="card__nav">
          <Link className="card__nav-button" to={`/word/${word.prevId}`}>{'< Prev (a)'}</Link>
          |
          <Link className="card__nav-button" to={`/word/check/${word.id}`}>{'Challenge (w)'}</Link>
          |
          <Link className="card__nav-button" to={`/word/${word.nextId}`}>{'Next (d) >'}</Link>
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
