<template>
  <b-nav-item-dropdown text="Other Subspaces">
    <b-dropdown-item
      v-for="space in spaces"
      :key="space.id"
      :to="'/space/' + path + (path ? '.' : '') + space.id"
      :title="path == '' ? '' : 'Not implemented'"
      v-b-tooltip.hover>
    <b-img :src="'/images/users/small/' + space.user + '.jpg'" width="30" height="30" rounded="circle" />
    {{space.user}}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  props: ['spaces', 'path']
}
</script>
