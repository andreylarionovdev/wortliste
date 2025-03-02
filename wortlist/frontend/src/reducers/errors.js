import { GET_ERRORS } from '../actions/types';

const initialState = {
  msg: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
      };
    default:
      return state;
  }
}