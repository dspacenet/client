<script>
import { unsetToken } from '~/utils/auth'
export default {
  async asyncData (ctx) {
    unsetToken()
    ctx.redirect('/login')
  }
}
</script>
