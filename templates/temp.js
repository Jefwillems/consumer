import Vue from 'vue';
import types from './types';

const _fetch = (url, options) => {
  return fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    ...options,
  }).then(data => data.json());
};

export default {
  fetch_categories({ commit, }) {
    fetch('https://opentdb.com/api_category.php')
      .then(data => data.json())
      .then(json => {
        const catgs = json.trivia_categories ? json.trivia_categories : [];
        commit(types.mutations.UPDATE_CATEGORIES, catgs);
      });
  },
  fetch_questions({ commit, state, }) {
    let url = 'https://opentdb.com/api.php?amount=10';
    if (state.selected_category.id !== -1) {
      url += `&category=${state.selected_category.id}`;
    }
    if (state.current_difficulty.id !== -1) {
      url += `&difficulty=${state.current_difficulty.label}`;
    }
    fetch(url)
      .then(data => data.json())
      .then(json => {
        const questions = json.results ? json.results : [];
        commit(types.mutations.UPDATE_QUESTIONS, questions);
      })
      .catch(error => Vue.$log.debug(error));
  },
};
