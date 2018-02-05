export default function (ctx) {
  console.log('anon-filter')
  if (ctx.store.state.token) {
    ctx.redirect('/')
  }
}
