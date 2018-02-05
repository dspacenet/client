<template>
  <b-modal id="logoutModal" title="Ready to leave?" v-model="modalShow">
    Select "Logout" below if you are ready to end your current session.
    <template slot="modal-footer">
      <b-btn variant="danger" type="button" @click="$auth.logout()">Logout</b-btn>
      <b-btn variant="secundary" type="button" @click="modalShow = false" >Cancel</b-btn>
    </template>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      modalShow: false
    }
  }
}
</script>
