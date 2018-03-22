<template>
  <div>
    <b-form @submit.prevent="createPoll">
      <b-alert variant="danger" :show="true" dismissible v-for="(error, index) in errors" :key="index">{{error}}</b-alert>
      <b-form-textarea
        v-model="newPollTitle"
        placeholder="New Poll Title"
      />
      <b-button type="submit" v-b-tooltip.hover title="Create Poll" variant="primary">
        <icon name="paper-plane" /> Create Poll
      </b-button>
    </b-form>
    <b-form @submit.prevent="onSubmit" v-if="isOpen">
      <b-alert :show="alert.currentSecs"
              dismissible
              variant="warning"
              @dismissed="alert.currentSecs=0"
              @dismiss-count-down="onAlertCountDown">
        <p>Your choice was {{ alert.selectedOption }} but we will report {{ alert.reportedOption }} </p>
        <b-progress variant="warning"
                    :max="alert.maxSecs"
                    :value="alert.currentSecs"
                    height="4px">
        </b-progress>
      </b-alert>
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
  </div>
</template>

<script>
import 'vue-awesome/icons/paper-plane'

export default {
  data () {
    return {
      alert: { currentSecs: 0, maxSecs: 5, selectedOption: 0, reportedOption: 0 },
      pollTitle: 'Poll Title',
      newPollTitle: '',
      isOpen: true,
      selected: 0,
      options: [
        { text: 'No', value: 0 },
        { text: 'Yes', value: 1 }
      ],
      results: [
        { text: 'No', value: 0, count: 15 },
        { text: 'Yes', value: 1, count: 4 }
      ],
      errors: []
    }
  },
  methods: {
    // TODO: fetch the data (options, results) from the server (API).
    onSubmit: async function (evt) {
      let choice = this.getDPChoice()
      // For testing only
      this.alert.selectedOption = this.selected
      this.alert.reportedOption = choice
      this.showAlert()

      // TODO: Send the value (choice) to the server.
    },
    createPoll () {
      // TODO: Send the create command to the server.
      this.pollTitle = this.newPollTitle
    },
    closePoll () {
      this.isOpen = false
      // TODO: Send the close command to the server.
    },
    getDPChoice () {
      let coin = Math.random()
      if (coin >= 0.5) {
        return this.selected
      } else {
        let dice = Math.floor(Math.random() * this.options.length)
        return dice
      }
    },
    showAlert () {
      this.alert.currentSecs = this.alert.maxSecs
    },
    onAlertCountDown (newCountDown) {
      this.alert.currentSecs = newCountDown
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

