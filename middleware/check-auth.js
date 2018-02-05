import { getUserFromServer, getUserFromLocalStorage } from '~/utils/auth'

export default async function (ctx) {
  console.log('check-auth-filter')
  if (ctx.isServer && !ctx.req) return
  console.log('server is loading user')
  const { user, token } = ctx.isServer ? await getUserFromServer(ctx.req, ctx.app.$axios) : getUserFromLocalStorage()
  console.log('user loaded')
  ctx.app.$axios.setToken(token, 'Bearer')
  ctx.store.commit('setUser', { user, token })
}
