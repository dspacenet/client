export default function (ctx) {
  console.log('auth-filter')
  if (!ctx.store.state.token) {
    ctx.redirect('/login')
  }
}
