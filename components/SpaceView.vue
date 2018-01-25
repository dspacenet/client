<template>
  <b-card no-body>
    <div slot="header">
      <icon name="list" />
      Public Posts
      </div>
      <b-list-group flush>
        <template v-if="!isLoading">
          <b-list-group-item  v-for="post in posts" :key="post.pid">
            <b-media class="text-break">
              <b-img slot="aside" rounded="circle" :src="'/images/users/small/'+ post.user_msg + '.jpg'" />
              <strong>{{post.user_msg}}</strong> {{renderMessage(post.msg)}}
            </b-media>
          </b-list-group-item>
          <b-list-group-item v-if="posts.length === 0">
            No posts to show.
          </b-list-group-item>
        </template>
        <b-list-group-item v-else class="loader" />
      </b-list-group>
  </b-card>
</template>

<script>
import 'vue-awesome/icons/list'

export default {
  props: ['path'],
  data: () => {
    return {
      isLoading: true,
      posts: [],
      interval: null
    }
  },
  methods: {
    pollContent: async function () {
      this.posts = await this.$axios.$get(`space/${this.path || 'global'}`)
      this.isLoading = false
    },
    renderMessage (message) {
      return decodeURI(message).replace(/\n/g, '<br>')
    }
  },

  mounted: function () {
    this.interval = setInterval(() => this.pollContent(), 1000)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  }
}
</script>

<style>
.loader {
  background:url(/images/loader.gif);
  background-position:center;
  background-repeat:no-repeat;
  min-height:60px;
}
</style>
