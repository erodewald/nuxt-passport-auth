import axios from 'axios'

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    if (req.user) {
      commit('SET_USER', req.user)
    }
  },
  async login ({ commit }, { email, password }) {
    if (!email || !password) throw new Error('Email and password are required')
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      throw new Error('Wrong email or password')
    }
  },
  async register ({ commit }, { email, password }) {
    if (!email || !password) throw new Error('Email and password are required')
    try {
      const { data } = await axios.post('/api/auth/register', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      switch (error.response.status || 500) {
        case 409: throw new Error('Such email is already registered')
        case 500: throw new Error('Internal server error')
      }
    }
  },

  async logout ({ commit }) {
    const { data } = await axios.post('/api/auth/logout')
    if (data.ok) commit('SET_USER', null)
  }

}
