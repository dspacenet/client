export default async function (ctx) {
  console.log('resolve-path-filter')
  if (!ctx.params.space) return
  if (/^(|\d+(\.\d+)*)$/.test(ctx.params.space)) {
    const { alias } = await ctx.app.$axios.$get(`meta/space/${ctx.params.space}`)
    ctx.redirect(`/space/${alias}`)
  }
}
