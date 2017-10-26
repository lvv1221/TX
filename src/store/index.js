import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = {
  state: {
    readWords: [],
    costTime: '',
    title: '',
    uuid: '',
    fileId: ''
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
    },
    setTitle(state, title) {
      state.title = title
    },
    setUuid(state, uuid) {
      state.uuid = uuid
    },
    setFileId(state, fileId) {
      state.fileId = fileId
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
    },
    setTitle({commit}, title) {
      commit('setTitle', title)
    },
    setUuid({commit}, uuid) {
      commit('setUuid', uuid)
    },
    setFileId({commit}, fileId) {
      commit('setFileId', fileId)
    }
  },
  // 严格模式
  strict: process.env.NODE_ENV === 'development'
}

export default new Vuex.Store(store)
