import { GET_WORDS, GET_WORD } from '../actions/types.js';

const initialState = {
  words: [],
  currentWord: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload,
      };
    case GET_WORD:
      return {
        ...state,
        currentWord: action.payload,
      };
    default:
      return state;
  }
};