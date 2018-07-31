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

const baseUrl = 'petstore.swagger.io/api'

export default {
  findPets({ commit, }) {
    _fetch(baseUrl + `/pets`, {
      method: "GET"
    })
    .then(data=> {
      commit('findPets', data);
    });
  },
  addPet({ commit, }) {
    _fetch(baseUrl + `/pets`, {
      method: "POST"
    })
    .then(data=> {
      commit('addPet', data);
    });
  },
  findPetById({ commit, }, id) {
    _fetch(baseUrl + `/pets/${id}`, {
      method: "GET"
    })
    .then(data=> {
      commit('findPetById', data);
    });
  },
  deletePet({ commit, }, id) {
    _fetch(baseUrl + `/pets/${id}`, {
      method: "DELETE"
    })
    .then(data=> {
      commit('deletePet', data);
    });
  },
};
