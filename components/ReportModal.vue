<template>
  <b-modal id="reportModal" title="Report Sending" v-model="modalShow" size="lg" ok-title="Send Report" @ok="sendReport">
    <b-alert variant="danger" :show="true" dismissible v-for="(error, index) in errors" :key="index">{{error}}</b-alert>
    <b-input-group prepend="Report Type:" class="mb-1">
      <b-form-select v-model="type" :options="options"/>
    </b-input-group>
    <b-form-textarea v-model="message" placeholder="Message" rows="5" />
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      errors: [],
      modalShow: false,
      type: '',
      options: [
        { value: '', text: 'Select a report type' },
        { value: 'bug', text: 'Bug' },
        { value: 'feature', text: 'Feature Request' },
        { value: 'other', text: 'Other' }
      ]
    }
  },
  methods: {
    async sendReport (event) {
      event.preventDefault()
      try {
        await this.$axios.$post('/control/report', {
          message: this.message,
          type: this.type
        })
        this.message = ''
        this.type = ''
        this.modalShow = false
      } catch (error) {
        this.errors.push(error.response ? error.response.data : error.message)
      }
    }
  }
}
</script>
