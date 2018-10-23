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
          <span class="indicator text-warning d-none d-lg-block"  v-if="notifications.length">
            <icon name="circle" scale="0.6"/>
          </span>
          </template>
          <b-dropdown-header>Notifications</b-dropdown-header>
          <template v-if="notifications.length">
          <template v-for="notification in notifications">
          <b-dropdown-divider :key="notification.uid" />
          <b-dropdown-item :key="notification.uid">
            <span class="text-success">
              <strong><icon name="info-circle" class="mx-1" />{{notification.user}}</strong>
            </span>
            <span class="small float-right text-muted" @click.stop="removeNotification(notification.pid)">
              <icon name="trash" />
            </span>
            <div class="dropdown-message small">{{notification.content}}.</div>
          </b-dropdown-item>
          </template>
          </template>
          <b-dropdown-item v-else>
            <div class="dropdown-message small">No hay nuevas notificaciones.</div>
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="'/space/' + username">
          <b-img rounded="circle" width="22" height="22" :src="'/images/' + username + '.jpg'" />
          {{username}} ({{userId}})
        </b-nav-item>
        <b-nav-item-dropdown class="mr-2" v-if="rank === 'admin'">
          <template slot="button-content" >
          <icon name="wrench" title="Control Panel" v-b-tooltip.hover />
          <span class="d-lg-none">Control Panel</span>
          </template>
          <b-dropdown-item v-b-modal.explorerModal>
            <icon name="binoculars" /> Memory Explorer
          </b-dropdown-item>
          <b-dropdown-item v-b-modal.processesModal>
            <icon name="cogs" /> Process View
          </b-dropdown-item>
          <b-dropdown-item v-b-modal.terminalModal>
            <icon name="terminal" /> Master Terminal
          </b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item @click="$axios.$delete('control/spaces')">
            <icon name="sync-alt"/> Reset Memory
          </b-dropdown-item>
          <b-dropdown-item @click="$axios.$delete('control/process')">
            <icon name="ban" /> Kill All Process
          </b-dropdown-item>
          <b-dropdown-item @click="$axios.$delete('control/clocks')">
            <icon name="ban" /> Kill All Clocks
          </b-dropdown-item>
          <b-dropdown-item @click="$axios.$post('control/restart')">
            <icon name="power-off" /> Restart Core
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item title="Help" v-b-popover.bottom.hover="'P:= post(c)  | whenever c do P | P || Q | repeat P | until c do P | when c do P | while c do P | now c do P | now c then P else Q | kill(c)'">
          <icon name="question-circle" />
          <span class="d-lg-none">Help</span>
        </b-nav-item>
        <b-nav-item title="Logout" v-b-modal.logoutModal v-b-tooltip.hover>
          <icon name="sign-out-alt" />
          <span>Logout</span>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import 'vue-awesome/icons/question-circle'
import 'vue-awesome/icons/binoculars'
import 'vue-awesome/icons/sign-out-alt'
import 'vue-awesome/icons/bell'
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/trash'
import 'vue-awesome/icons/wrench'
import 'vue-awesome/icons/cogs'
import 'vue-awesome/icons/sync-alt'
import 'vue-awesome/icons/ban'
import 'vue-awesome/icons/terminal'
import 'vue-awesome/icons/power-off'
export default {
  data () {
    return {
      username: this.$auth.state.user ? this.$auth.state.user.name : '',
      userId: this.$auth.state.user ? this.$auth.state.user.id : '',
      rank: this.$auth.state.user ? this.$auth.state.user.rank : 'user',
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
    },
    updateNotifications (path, changes) {
      if (path === `${this.userId}.12`) {
        this.notifications = changes.added.concat(this.notifications.filter(post => !changes.removed.includes(post.id)))
      }
    },
    removeNotification (pid) {
      this.$axios.$post(`space/${this.userId}.12`, { program: `rm("${pid}",*,*)` })
    }
  },
  mounted () {
    this.getNotifications()
    this.$io.emit('bind', `${this.userId}.12`)
    this.$io.on('update', this.updateNotifications)
  },
  dismounted () {
    this.$io.emit('unbind', `${this.userId}.12`)
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
  min-width: 200px;
  overflow: hidden;
}
</style>
