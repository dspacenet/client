<template>
  <div>
    <b-table ref="table" striped hover :items="provider" :busy="isBusy" />
    <b-btn @click="refresh" variant="success">Refresh</b-btn>

  </div>
</template>

<script>
export default {
  props: ['path'],
  data () {
    return {
      isBusy: false
    }
  },
  methods: {
    async provider (ctx) {
      this.isBusy = true
      try {
        const items = await this.$axios.$get(`space/${this.path}.2`)
        this.isBusy = false
        return items.map((item) => {
          return { PID: item.clock, sourceCode: decodeURI(item.msg), user: item.user_msg }
        })
      } catch (error) {
        this.isBusy = false
        return []
      }
    },
    refresh () {
      this.$refs.table.refresh()
    }
  }
}
</script>
