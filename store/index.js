import { createStore } from 'vuex'

// const sleep = async () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(2)
//     }, 1000)
//   })
// }

export default createStore({
  state: {
    count: 0,
    color: 'red',
    activeTab: 'Home',
  },
  mutations: {
    increaseCounter(state, inc) {
      state.count += inc
    },
    decreaseCounter(state, dec) {
      state.count -= dec
    },
    changeColor(state, newColor) {
      state.color = newColor
    },
    changeActiveTab(state, tab) {
      state.activeTab = tab
    },
  },
  actions: {
    async increaseCounter({ commit }) {
      console.log('increasing...')
      //   const data = await sleep()
      const data = 1
      console.log(data)
      commit('increaseCounter', data)
    },
    decreaseCounter({ commit }) {
      console.log('decreasing...')
      commit('decreaseCounter', 1)
    },
  },
  getters: {
    square(state) {
      return state.count * state.count
    },
  },
})
