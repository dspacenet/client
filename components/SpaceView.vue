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
              <b-img slot="aside" rounded="circle" :src="'/images/users/small/'+ post.user + '.jpg'" />
              <strong>{{post.user}}&nbsp;</strong> <span v-html="renderMessage(post.content)"></span>
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
      this.posts = (await this.$axios.$get(`space/${this.path || 'global'}`)).sort((a, b) => b.pid - a.pid)
      this.isLoading = false
    },
    renderMessage (message) {
      return decodeURI(message)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;')
        .replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}">${url}</a>`)
        .replace(/\n/g, '<br>')
    },
    update (changes) {
      this.posts = changes.added.concat(this.posts.filter(post => !changes.removed.includes(post.id)))
    }
  },
  watch: {
    path: (val, oldVal) => {
      this.$io.emit('unbind', oldVal)
      this.$io.emit('bind', val)
    }
  },
  mounted: function () {
    this.$io.emit('bind', this.path)
    this.$io.on('update', (space, data) => {
      if (space === `${this.path}`) this.update(data)
    })
    this.pollContent()
  },
  beforeDestroy: function () {
    this.$io.emit('unbind', this.path)
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
