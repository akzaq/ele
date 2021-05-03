import { RATINGS_SET } from '@/store/ratings/ratingsMutationsType'

const state = {
  ratings: '',
}

const getters = {}

const mutations = {
  [RATINGS_SET](state, payload) {
    state.ratings = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
