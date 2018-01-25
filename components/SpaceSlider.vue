<template>
  <b-carousel v-model="slide" controls class="my-slider mb-3">
    <b-carousel-slide img-blank img-height="80">
      <b-container deck slot="img" class="text-center">
        <nuxt-link :to="'/space/' + space.id" v-for="space in spaces" :key="space.id" >
          <b-img width="80" height="80" :src="'/images/' + space.user + '.jpg'" rounded="circle" class="mx-2"/>
        </nuxt-link>
      </b-container>
    </b-carousel-slide>
    <b-carousel-slide img-blank img-height="80">
      <b-container deck slot="img" class="text-center">
        <nuxt-link :to="'/space/' + space.id" v-for="space in spaces" :key="space.id" >
          <b-img width="80" height="80" :src="'/images/' + space.user + '.jpg'" rounded="circle" class="mx-2"/>
        </nuxt-link>
      </b-container>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  props: ['spaces']
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
