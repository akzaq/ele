import { SELLER_SET } from '@/store/seller/sellerMutationsType'

const state = {
  seller: '',
}

const getters = {}

const mutations = {
  [SELLER_SET](state, payload) {
    state.seller = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
