import axios from 'axios';

export const getWords = () => {
  return axios.get('/api/words/').then(res => res.data);
};

export const getWord = (id) => {
  return axios.get(`/api/words/${id}`).then(res => res.data);
};

export const getNextWord = (id, data) => {
  return axios.post(`/api/words/${id}/next/`, data).then(res => res.data);
};