import { getStore } from '../../utils/mUtils'

const state = {
  token: getStore('token'),
  id: '',
  name: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
