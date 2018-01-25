<template>
  <div>
    <NavBar/>
    <div class="content-wrapper no-bg">
      <nuxt/>
    </div>
    <MyFooter />
    <LogoutModal />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import MyFooter from '~/components/MyFooter.vue'
import LogoutModal from '~/components/LogoutModal.vue'

export default {
  head: {
    bodyAttrs: {
      class: 'fixed-nav sticky-footer bg-gray',
      id: 'page-top'
    }
  },
  components: {
    NavBar, MyFooter, LogoutModal
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
