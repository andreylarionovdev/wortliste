import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getWords } from '../../actions/words';

export class WordList extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
    getWords: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getWords();
  }

  render() {
    return (
      <ul>
        {this.props.words.map(word => {
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
    )
  }
}

const mapStateToProps = state => ({
  words: state.words.words,
})

export default connect(
  mapStateToProps,
  { getWords },
)(WordList);
