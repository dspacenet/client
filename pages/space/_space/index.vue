<template>
  <b-container>
    <b-card no-body class="mb-3">
      <b-tabs card @input="refreshTOP">
        <b-tab title="&nbsp;">
          <SpaceTerminal :path="spaceId" />
          <SpaceView :path="spaceId" />
        </b-tab>
        <b-tab title="Forum">
          <SpaceTerminal :path="spaceId + '.' + spaceId" />
          <SpaceView :path="spaceId + '.' + spaceId" />
        </b-tab>
        <b-tab title="TOP" v-if="isOwnSpace">
          <ProccessesView :path="spaceId" ref="pv" />
        </b-tab>
        <b-tab title="Subspaces">
          <SpaceExplorer :spaces="childs" :path="spaceId" />
        </b-tab>
        <template slot="tabs">
          <div class="ml-auto">
            {{header}}
            <b-img rounded="circle" :src="'/images/users/small/' + space + '.jpg'" class="user-image" />
          </div>
        </template>
      </b-tabs>
    </b-card>
    <SpaceSlider :spaces="childs" v-if="!isGlobal" />
  </b-container>
</template>

<script>
import SpaceView from '~/components/SpaceView.vue'
import SpaceTerminal from '~/components/SpaceTerminal.vue'
import ProccessesView from '~/components/ProccessesView.vue'
import SpaceExplorer from '~/components/SpaceExplorer.vue'
import SpaceSlider from '~/components/SpaceSlider.vue'

export default {
  middleware: ['auth', 'resolvePath'],
  asyncData: ctx => ctx.app.$axios.$get(`meta/space/${ctx.params.space}`),
  computed: {
    header () {
      return this.space + (this.isGlobal ? '' : "'s") + ' space'
    }
  },
  components: {
    SpaceView, SpaceTerminal, ProccessesView, SpaceExplorer, SpaceSlider
  },
  methods: {
    refreshTOP (index) {
      if (this.isOwnSpace && index === 1) this.$refs.pv.refresh()
    }
  }
}
</script>

<style>
.profile-image {
  width:15vw;
  height:15vw;
  position:absolute;
  bottom:10px;
  right:30px;
  border: 4px ridge white;
  display: inline-block;
}

.profile-header {
  background-color: lightgray;
  font-size: 4.5vw;
  line-height: 100%;
  position:relative;
}

.user-image {
  margin-top: -8px;
}
</style>
