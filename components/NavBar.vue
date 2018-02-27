<template>
  <b-navbar toggleable="md" fixed="top" type="dark" class="bg-dark-transparent">
    <b-navbar-brand to="/">
      <img src="/images/logo.png" alt="DSpaceNet" height="24">
      DSpaceNet
    </b-navbar-brand>
    <b-navbar-toggle target="navbarResponsive"/>
    <b-collapse is-nav id="navbarResponsive">
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="'/space/' + username">
          <b-img rounded="circle" width="22" height="22" :src="'/images/' + username + '.jpg'" />
          {{username}} ({{userId}})
        </b-nav-item>
        <b-nav-item to="/explorer" title="Explore" v-b-tooltip.hover>
          <icon name="binoculars" />
          <span class="d-lg-none">Space Explorer</span>
        </b-nav-item>
        <b-nav-item title="Help" v-b-popover.bottom.hover="'P:= post(c)  | whenever c do P | P || Q | repeat P | until c do P | when c do P | while c do P | now c do P | now c then P else Q | kill(c)'">
          <icon name="question-circle" />
          <span class="d-lg-none">Help</span>
        </b-nav-item>
        <b-nav-item title="Logout" v-b-modal.logoutModal v-b-tooltip.hover>
          <icon name="sign-out" />
          <span>Logout</span>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/binoculars'
import 'vue-awesome/icons/sign-out'

export default {
  data () {
    return {
      username: this.$auth.state.user.name,
      userId: this.$auth.state.user.id
    }
  }
}
</script>

<style>
.bg-dark-transparent {
  background-color: rgba(52,58,64,.95) !important;
}
</style>
