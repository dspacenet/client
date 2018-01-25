import Vuex from 'vuex'
import { getTokenFromCookie } from '~/utils/auth'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      user: {}
    },
    mutations: {
      setUser (state, { token, user }) {
        state.token = token
        state.user = user
      },
      logout (state) {
        state.token = null
        state.user = null
      }
    },
    actions: {
      async nuxtServerInit (state, context) {
        const token = getTokenFromCookie(context.req)
        if (!token) return
        context.app.$axios.setToken(token, 'Bearer')
      }
    }
  })
}

export default createStore
