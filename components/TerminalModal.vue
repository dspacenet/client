<template>
  <b-modal id="terminalModal" title="Master Terminal" v-model="modalShow" size="lg" ok-only ok-title="Close" @show="refresh">
    <b-alert variant="danger" :show="true" dismissible v-for="(error, index) in errors" :key="index">{{error}}</b-alert>
    <b-input-group prepend="Path:" class="mb-1">
      <b-form-input v-model="path" placeholder="Path of the space where the program will be executed, left empty for global" type="text"></b-form-input>
    </b-input-group>
    <b-input-group>
      <b-form-textarea v-model="program" placeholder="Code to execute" :class="{loading: isLoading}" rows="5" />
      <b-input-group-append>
        <b-button @click="runProgram" type="button" v-b-tooltip.hover title="Run Code" variant="primary">
          <icon name="play" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      path: '',
      program: '',
      errors: [],
      isLoading: false,
      modalShow: false
    }
  },
  methods: {
    async runProgram () {
      this.isLoading = true
      try {
        await this.$axios.$post(`space/${this.path || 'global'}`, {
          program: this.program,
          raw: true
        })
        this.program = ''
      } catch (error) {
        this.errors.push(error.response ? error.response.data : error.message)
      }
      this.isLoading = false
    }
  }
}
</script>
