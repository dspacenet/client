<template>
  <b-form @submit.prevent="submitMessage">
    <b-alert variant="danger" :show="true" dismissible v-for="(error, index) in errors" :key="index">{{error}}</b-alert>
    <b-form-textarea v-model="program" placeholder="Post your program or message here. Press SHIFT+ENTER to insert a line break." class="m-1"/>
    <b-button type="submit" class="m-1" v-b-tooltip.hover title="Post Message" variant="primary">
      <icon name="paper-plane" /> Post Message
    </b-button>
    <b-button @click="onSubmit" type="button" class="m-1" v-b-tooltip.hover title="Post Program" variant="primary">
      <icon name="play" /> Post Program
    </b-button>
  </b-form>
</template>

<script>
import 'vue-awesome/icons/paper-plane'
import 'vue-awesome/icons/play'

export default {
  props: ['path'],
  data () {
    return {
      program: '',
      isLoading: false,
      errors: []
    }
  },
  methods: {
    onSubmit () {
      this.submitProgram(this.program)
    },
    submitMessage () {
      this.submitProgram(`post("${encodeURI(this.program)}")`)
    },
    async submitProgram (program) {
      this.isLoading = true
      try {
        await this.runProgram(program, this.path || 'global', {
          storeProcess: this.path !== ''
        })
        this.program = ''
      } catch (error) {
        this.errors.push(error.response ? error.response.data : error.message)
      }
      this.isLoading = false
    },
    runProgram (program, path, options) {
      return this.$axios.$post(`space/${path}`, Object.assign({ program }, options))
    }
  }
}
</script>
