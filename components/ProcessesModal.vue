<template>
  <b-modal id="processesModal" title="Process View" v-model="modalShow" size="lg" ok-only ok-title="Close" @show="refresh">
    <b-table striped hover show-empty small :items="items" :busy="busy" />
    <b-button variant="primary" @click="refresh">Refresh</b-button>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      path: '',
      items: [],
      error: '',
      busy: false,
      modalShow: false
    }
  },
  methods: {
    async refresh () {
      this.busy = true
      try {
        this.items = await this.$axios.$get('process/')
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
      }
      this.busy = false
    }
  }
}
</script>
