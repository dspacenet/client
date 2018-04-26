<template>
    <b-card title="Space Explorer">
      <b-alert variant="danger" dismissible :show="error !== ''" @dismissed="error = ''">{{ error }}</b-alert>
      <b-input-group prepend="Path:" class="mb-3">
        <b-form-input v-model="path" placeholder="Path of the space to explore" type="text"></b-form-input>
        <b-input-group-append>
          <b-button variant="primary" @click="explore">Explore</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-table striped hover show-empty :items="items" />
    </b-card>
</template>

<script>

export default {
  layout: 'simple',
  data () {
    return {
      path: '',
      items: [],
      error: ''
    }
  },
  methods: {
    async explore () {
      try {
        this.items = (await this.$axios.$get(`space/${this.path}?filter=false`)).map((post) => {
          post.msg = decodeURI(post.msg)
          return post
        })
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
      }
    }
  }
}
</script>

<style>

</style>
