import axios from 'axios'
import { Bus } from '../Bus'

export default {
  data() {
    return {
      Notification: {},
      screenSize: window.screen.width
    }
  },
  computed: {
    Bus() {
      return Bus
    }
  },

  methods: {
    //Create axios instance.
    fetch() {
      const instance = axios.create()
      instance.defaults.baseURL =
        process.env.VUE_APP_BASE_URL || 'http://localhost:8080/'

      return instance
    },

    alertConfirm(success, message) {
      Bus.$emit('alert', {
        message,
        show: true,
        confirmed: success
      })
    },

    toast({ message }) {
      this.Notification = {
        isVisible: true,
        message
      }
    }
  },

  mounted() {
    window.addEventListener(
      'resize',
      (e) => (this.screenSize = window.screen.width)
    )
  }
}
