<template>
  <div>
    <b-img center src="images/logob.png" class="mt-5" />
    <b-card class="card-login mx-auto mt-2">
      <h6 slot="header">Login</h6>
      <b-alert variant="danger" dismissible :show="error !== ''" @dismissed="error = ''">{{ error }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="User" label-for="userInput">
          <b-form-input id="userInput" type="text" v-model="login.username" required placeholder="User" />
        </b-form-group>
        <b-form-group label="Password" label-for="passwordInput">
          <b-form-input id="passwordInput" type="password" v-model="login.password" required placeholder="Password" />
        </b-form-group>
        <b-button type="submit" variant="primary" block>Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { setToken } from '~/utils/auth'

export default {
  layout: 'simple',
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async onSubmit () {
      try {
        const { token, user } = await this.$axios.$post('login', this.login)
        setToken(token, user)
        this.$router.replace({ path: '/' })
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
      }
    }
  },
  middleware: 'anon'
}
</script>
