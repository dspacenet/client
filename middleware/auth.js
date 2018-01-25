export default function (ctx) {
  if (!ctx.store.state.token) {
    ctx.redirect('/login')
  }
}
