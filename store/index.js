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
    activeTab: '',
    showLoginModal: false,
    showRegisterModal: false,
    showAddBlogModal: false,
    showEditBlogModal: false,
    showEditCommentModal: false,
    toast: {
      show: false,
      title: 'test',
      body: 'test body',
    },
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : false,
    refresh: 1, //just for refetching purpose if needed
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
    toggleState(state, payload) {
      state[payload.key] = payload.value ? payload.value : !state[payload.key]
    },
    changeToast(state, payload) {
      state.toast = payload
    },
    triggerRefresh(state) {
      state.refresh += 1
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
