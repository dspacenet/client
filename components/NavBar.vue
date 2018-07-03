<template>
  <b-navbar toggleable="md" fixed="top" type="dark" class="bg-dark-transparent">
    <b-navbar-brand to="/">
      <img src="/images/logo.png" alt="DSpaceNet" height="24">
      DSpaceNet
    </b-navbar-brand>
    <b-navbar-toggle target="navbarResponsive"/>
    <b-collapse is-nav id="navbarResponsive">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown class="mr-2">
          <template slot="button-content">
          <icon name="bell"/>
          <span class="d-lg-none">
            Alerts
            <b-badge pill variant="warning" v-if="notifications.length">{{notifications.length}}</b-badge>
          </span>
          <span class="indicator text-warning d-none d-lg-block">
            <icon name="circle" scale="0.6"/>
          </span>
          </template>
          <b-dropdown-header>Notifications</b-dropdown-header>
          <template v-for="notification in notifications">
          <b-dropdown-divider :key="notification.clock" />
          <b-dropdown-item :key="notification.clock">
            <span class="text-success">
              <strong><icon name="info-circle" class="mx-1" />{{notification.user_msg}}</strong>
            </span>
            <span class="small float-right text-muted">{{notification.clock}}</span>
            <div class="dropdown-message small">{{notification.msg}}.</div>
          </b-dropdown-item>
          </template>
        </b-nav-item-dropdown>
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
import 'vue-awesome/icons/bell'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/info-circle'

export default {
  data () {
    return {
      username: this.$auth.state.user ? this.$auth.state.user.name : '',
      userId: this.$auth.state.user ? this.$auth.state.user.id : '',
      notifications: []
    }
  },
  methods: {
    async getNotifications () {
      try {
        this.notifications = await this.$axios.$get(`space/${this.userId}.12`)
      } catch (error) {
        this.error = error.response ? error.response.error : error.message
      }
    }
  },
  mounted () {
    this.getNotifications()
  }
}
</script>

<style>
.bg-dark-transparent {
  background-color: rgba(52,58,64,.95) !important;
}

.indicator {
  position: absolute;
  top: -3px;
  left: 21px;
}

.dropdown-message {
  max-width: 250px;
  overflow: hidden;
}
</style>
