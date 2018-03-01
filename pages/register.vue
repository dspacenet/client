<template>
  <div>
    <b-img center src="images/logob.png" class="mt-5" />
    <b-card class="card-register mx-auto mt-2 mb-5" v-show="!registrationComplete" >
      <h6 slot="header">Register an Account</h6>
      <b-alert variant="danger" dismissible :show="error !== ''" @dismissed="error = ''">{{ error }}</b-alert>
      <b-form @submit.prevent="onSubmit">
        <b-form-group>
          <b-form-row>
            <b-col>
              <label for="firtNameInput">First name</label>
              <b-form-input id="firtNameInput" type="text" v-model="register.firstName" required placeholder="Enter first name" />
            </b-col>
            <b-col>
              <label for="lastNameInput">Last name</label>
              <b-form-input id="lastNameInput" type="text" v-model="register.lastName" required placeholder="Enter last name" />
            </b-col>
          </b-form-row>
        </b-form-group>
        <b-form-group label="Email address" label-for="emailInput">
          <b-form-input id="emailInput" type="email" v-model="register.email" required placeholder="Enter email" />
        </b-form-group>
        <b-form-group>
          <b-form-row>
            <b-col>
              <label for="passwordInput">Password</label>
              <b-form-input id="passwordInput" type="password" v-model="register.password" required placeholder="Password" />
            </b-col>
            <b-col>
              <label for="passwordConfirmationInput">Confirm Password</label>
              <b-form-input id="passwordConfirmationInput" type="password" v-model="register.passwordConfirmation" required placeholder="Confirm password" />
            </b-col>
          </b-form-row>
        </b-form-group>
        <b-button type="submit" variant="primary" block>Register</b-button>
      </b-form>
      <div class="text-center small mt-3">
        <nuxt-link to="/login">Login Page</nuxt-link>
      </div>
    </b-card>
    <b-alert class="registration-complete mt-3" variane="success" :show="registrationComplete">
      <h4 class="alert-heading">Well done!</h4>
      <p>A request to join DSpaceNet has been send to an Administrador,
        you will receive an confirmation email with your credentials when the
        Administrador accept your request.</p>
      <hr />
      <nuxt-link class="alert-link" to="/login">Return to login page</nuxt-link>
    </b-alert>
  </div>
</template>

<script>

export default {
  options: {
    layout: 'simple',
    auth: false
  },
  data () {
    return {
      register: {
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
        email: ''
      },
      error: '',
      registrationComplete: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios.$post('singup', {
          firstName: this.register.firstName,
          lastName: this.register.lastName,
          password: this.register.password,
          passwordConfirmation: this.register.passwordConfirmation,
          email: this.register.email
        })
        this.registrationComplete = true
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
      }
    }
  }
}
</script>

<style>
.registration-complete {
  width: 500px;
  margin: 0 auto;
}
</style>
