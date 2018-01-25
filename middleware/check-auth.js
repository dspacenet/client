import { getUserFromServer, getUserFromLocalStorage } from '~/utils/auth'

export default async function (ctx) {
  if (ctx.isServer && !ctx.req) return
  const { user, token } = ctx.isServer ? await getUserFromServer(ctx.req, ctx.app.$axios) : getUserFromLocalStorage()
  ctx.app.$axios.setToken(token, 'Bearer')
  ctx.store.commit('setUser', { user, token })
}
