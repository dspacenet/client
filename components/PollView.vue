<template>
  <b-form @submit="onSubmit" v-if="isOpen">
    <b-card no-body>
      <div slot="header">
        {{ pollTitle }}
      </div>
      <b-list-group flush>
        <b-radio-group id="poll" v-model="selected">
          <b-list-group-item v-for="option of options" :key="option.value">
            <b-radio :value="option.value">{{ option.text }}</b-radio>
          </b-list-group-item>
        </b-radio-group>
      </b-list-group>
      <div slot="footer">
        <b-button type="submit" variant="primary">Vote</b-button>
        <span class="ml-1 text-success">This poll is still open. </span><b-link @click="closePoll" class="text-danger" herf="#">Close it.</b-link>
      </div>
    </b-card>
  </b-form>
  <b-card no-body v-else>
    <div slot="header">
      {{ pollTitle }}
    </div>
    <b-list-group flush>
      <b-list-group-item v-for="result of results" :key="result.value">
        {{ result.text }}
        <b-progress show-progress :value="result.count" :max="total"></b-progress>
      </b-list-group-item>
    </b-list-group>
    <div slot="footer">
      <span class="text-danger">This poll is closed.</span>
    </div>
  </b-card>
</template>

<script>
export default {
  data () {
    return {
      pollTitle: 'Poll Title',
      isOpen: true,
      selected: 0,
      options: [
        { text: 'No', value: 0 },
        { text: 'Yes', value: 1 }
      ],
      results: [
        { text: 'No', value: 0, count: 15 },
        { text: 'Yes', value: 1, count: 4 }
      ]
    }
  },
  methods: {
    // TODO: fetch the data from the server.
    onSubmit: async function (evt) {
      // TODO: Apply DP to the value.
      // TODO: Send the value to the server.
    },
    closePoll () {
      this.isOpen = false
      // TODO: Send the close command to the server.
    }
  },
  computed: {
    total () {
      return this.results
        .map(res => res.count)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    }
  }
}
</script>

<style>

</style>

