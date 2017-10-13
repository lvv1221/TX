import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = {
  state: {
    readWords: [],
    costTime: ''
  },
  getters: {
    getLength: state => {
      return state.readWords.length
    }
  },
  mutations: {
    addWord (state, word) {
      state.readWords.push(word)
    },
    setWords (state, words) {
      state.readWords = words
    },
    setTime (state, time) {
      state.costTime = time
    }
  },
  actions: {
    addWord ({commit}, word) {
      commit('addWord',word)
    },
    setWords ({commit}, words) {
      commit('setWords',words)
    },
    setTime ({commit}, time) {
      commit('setTime', time)
    }
  },
  // 严格模式
  strict: process.env.NODE_ENV === 'development'
}

export default new Vuex.Store(store)
