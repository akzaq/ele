import Vue from 'vue'
import Vuex from 'vuex'
import goods from '@/store/goods'
import seller from '@/store/seller'
import ratings from '@/store/ratings'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    goods,
    seller,
    ratings,
  },
})
