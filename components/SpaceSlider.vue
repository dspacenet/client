<template>
  <b-carousel v-model="slide" controls class="my-slider mb-3" :interval="0">
    <b-carousel-slide img-blank img-height="80" v-for="(group, i) in spaceGroups" :key="i">
      <b-container deck slot="img" class="text-center">
        <nuxt-link :to="'/space/' + space.id" v-for="space in spaces.slice(i * 9, (i+1) * 9)" :key="space.id" >
          <b-img width="80" height="80" :src="'/images/' + space.user + '.jpg'" rounded="circle" class="mx-2"/>
        </nuxt-link>
      </b-container>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  props: ['spaces'],
  data: () => {
    return {
      slide: 0
    }
  },
  computed: {
    spaceGroups () {
      return Array.from(Array(Math.ceil(this.spaces.length / 9)).keys())
    }
  }
}
</script>


<style>
.my-slider {
  max-height: 150px;
  padding: 0 100px;
}

.carousel-caption {
  z-index: -10 !important;
}
</style>
