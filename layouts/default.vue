<template>
  <div>
    <NavBar/>
    <div class="content-wrapper no-bg">
      <nuxt/>
    </div>
    <my-footer />
    <logout-modal />
    <explorer-modal />
    <processes-modal />
    <terminal-modal />
    <report-modal />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import MyFooter from '~/components/MyFooter.vue'
import LogoutModal from '~/components/LogoutModal.vue'
import ExplorerModal from '~/components/ExplorerModal.vue'
import ProcessesModal from '~/components/ProcessesModal.vue'
import TerminalModal from '~/components/TerminalModal.vue'
import ReportModal from '~/components/ReportModal.vue'

export default {
  head: {
    bodyAttrs: {
      class: 'fixed-nav sticky-footer bg-gray',
      id: 'page-top'
    }
  },
  components: {
    NavBar, MyFooter, LogoutModal, ExplorerModal, ProcessesModal, TerminalModal, ReportModal
  }
}
</script>

<style>
.text-break {
  word-break: break-word;
}
.no-bg {
  background: initial;
}

.bg-gray {
  background-color:#5C6166;
}
</style>
