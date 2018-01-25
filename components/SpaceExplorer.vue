<template>
  <b-card-group deck>
    <b-card no-body v-for="space in spaces" :key="space.id">
      <nuxt-link :to="'/space/' + path + (path ? '.' : '') + space.id ">
        <b-card-img :src="'/images/' + space.user + '.jpg'"  />
      </nuxt-link>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  props: ['spaces', 'path']
}
</script>
