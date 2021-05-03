import {
  FOOD_ADD,
  FOOD_REDUCE,
  FOOD_RESET,
} from '@/store/goods/goodsMutationsType'

const state = {
  foodList: [],
}

const getters = {
  count(state) {
    return (name) => {
      let arr = state.foodList.filter((item) => item.name === name)

      if (!arr.length) {
        return 0
      } else {
        return arr[0].count
      }
    }
  },
}

const mutations = {
  [FOOD_ADD](state, payload) {
    let current
    let inspection = state.foodList.filter((item, index) => {
      if (item.name === payload.name) {
        current = index
        return true
      }
    }).length

    if (inspection) {
      state.foodList[current].count++
    } else {
      payload.count = 1
      state.foodList.push(payload)
    }
  },
  [FOOD_REDUCE](state, payload) {
    for (let i = 0; i < state.foodList.length; i++) {
      if (state.foodList[i].name === payload.name) {
        state.foodList[i].count - 1 === 0
          ? state.foodList.splice(i, 1)
          : state.foodList[i].count--
        return
      }
    }
  },
  [FOOD_RESET](state) {
    state.foodList = []
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
