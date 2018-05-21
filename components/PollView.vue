<template>
  <div>
    <b-alert variant="danger" :show="true" dismissible v-for="(error, index) in errors" :key="index">{{error}}</b-alert>
    <b-form inline @submit.prevent="createPoll" class="mb-2">
      <label class="sr-only" for="pollName">Poll question</label>
      <b-form-input
        v-model="newPollTitle"
        id="pollName"
        placeholder="New question"
        class="mr-2"
      />
      <b-button type="submit" v-b-tooltip.hover title="Create Poll" variant="primary" :disabled="isLoading">
        <icon name="check-square-o" /> Create Poll
      </b-button>
    </b-form>
    <b-form @submit.prevent="onSubmit" v-if="poll.isOpen">
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
        <div slot="header" :class="{loading: isLoading}">
          {{ poll.title }}
        </div>
        <b-list-group flush>
          <b-radio-group id="poll" v-model="selected">
            <b-list-group-item v-for="option of poll.options" :key="option.value">
              <b-radio :value="option.value">{{ option.text }}</b-radio>
            </b-list-group-item>
          </b-radio-group>
        </b-list-group>
        <div slot="footer">
          <b-button type="submit" variant="primary" :disabled="isLoading">Vote</b-button>
          <span class="ml-1 text-success">This poll is still open. </span><b-link @click="closePoll" class="text-danger" herf="#">Close it.</b-link>
        </div>
      </b-card>
    </b-form>
    <b-card no-body v-else>
      <div slot="header" :class="{loading: isLoading}">
        {{ poll.title }}
      </div>
      <b-list-group flush>
        <b-list-group-item v-for="result of poll.results" :key="result.value">
          {{ result.text }}
          <b-progress :max="total">
            <b-progress-bar :value="result.count" >
              {{ (result.count / total * 100).toFixed(0) }}%
            </b-progress-bar>
          </b-progress>
        </b-list-group-item>
      </b-list-group>
      <div slot="footer">
        <span class="text-danger">This poll is closed.</span>
      </div>
    </b-card>
  </div>
</template>

<script>
import 'vue-awesome/icons/check-square-o'

export default {
  props: ['path'],
  data () {
    return {
      alert: { currentSecs: 0, maxSecs: 10, selectedOption: 0, reportedOption: 0 },
      newPollTitle: '',
      isLoading: true,
      selected: 0,
      poll: {
        isOpen: false,
        title: 'Loading',
        options: [
          { text: 'No', value: 0 },
          { text: 'Yes', value: 1 }
        ],
        results: [
          { text: 'No', value: 0, count: 0 },
          { text: 'Yes', value: 1, count: 0 }
        ]
      },
      errors: []
    }
  },
  methods: {
    async loadData () {
      this.isLoading = true
      let path = this.path === '' ? '' : `${this.path}.`
      let initialResults = [{ text: 'No', value: 0, count: 0 }, { text: 'Yes', value: 1, count: 0 }]
      try {
        let pollRawData = await this.$axios.$get(`space/${path}10?filter=false`)
        let pollPartial = pollRawData
          .map(result => {
            let matchQuestion = result.msg.match(/^Q:(.+)/)
            if (matchQuestion) {
              return { title: decodeURI(matchQuestion[1]) }
            }
            return { value: Number(result.msg) }
          })
          .reduce((previousValue, currentValue) => {
            let newValue = previousValue
            if (currentValue.title) {
              newValue.title = currentValue.title
              return newValue
            }
            let previousValueIndex = previousValue.results.findIndex(value => value.value === currentValue.value)
            if (previousValueIndex !== -1) {
              newValue.results[previousValueIndex].count += 1
            }
            return newValue
          }, { title: 'Missing Poll Title', results: initialResults })
        this.poll.title = pollPartial.title
        this.poll.results = pollPartial.results
        this.poll.isOpen = (await this.$axios.$get(`space/${path}10.0?filter=false`)).map(result => {
          return result.msg === 'o'
        })[0] || false
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
      }
      this.isLoading = false
    },
    async submitCommand (program) {
      this.isLoading = true
      try {
        let path = this.path || 'global'
        let options = { storeProcess: false }
        await this.$axios.$post(`space/${path}`, Object.assign({ program }, options))
      } catch (error) {
        this.errors.push(error.response ? error.response.data : error.message)
      }
      this.isLoading = false
    },
    async onSubmit (evt) {
      let choice = this.getDPChoice()
      // For testing only
      this.alert.selectedOption = this.selected
      this.alert.reportedOption = choice
      this.showAlert()

      this.submitCommand(`vote("${choice}")`)
    },
    async createPoll () {
      await this.submitCommand(`create-poll("${encodeURI(this.newPollTitle)}")`)
      // Since create-poll cleans the poll space,
      // the actual title is added in the next cycle.
      // We make sure the data is available by skipping one step.
      await this.submitCommand('skip')
      await this.loadData()
      // "Missing Poll Title" workaround
      this.poll.title = this.newPollTitle
      this.newPollTitle = ''
    },
    async closePoll () {
      await this.submitCommand('close-poll')
      await this.loadData()
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
  mounted () {
    this.loadData()
  },
  computed: {
    total () {
      return this.poll.results
        .map(res => res.count)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    }
  }
}
</script>

<style>
.loading {
  background-image: url('/images/Gear.svg');
  background-position-y: center;
  background-position-x: calc(100% -5px);
  background-repeat: no-repeat;
}
</style>

