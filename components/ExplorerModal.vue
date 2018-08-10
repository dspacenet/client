<template>
  <b-modal id="explorerModal" title="Memory Explorer" v-model="modalShow" size="lg" ok-only ok-title="Close">
    <b-input-group prepend="Path:" class="mb-3">
      <b-form-input v-model="path" placeholder="Path of the space to explore" type="text"></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="explore">Explore</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-table striped hover show-empty small :items="items" />
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      path: '',
      items: [],
      error: '',
      modalShow: false
    }
  },
  methods: {
    async explore () {
      try {
        this.items = (await this.$axios.$get(`space/${this.path}?filter=false`)).map((post) => {
          post.content = decodeURI(post.content)
          return post
        })
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
      }
    }
  }
}
</script>
