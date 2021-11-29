import axios from 'axios'
import {Bus} from '../Bus'

export default {
  data() {
    return {}
  },
  computed: {
    Bus() {
      return Bus
    }
  },

  methods: {
    //Create axios instance.
    fetch() {
      let instance = axios.create()
      instance.defaults.baseURL = 'http://localhost:8080/'
      return instance
    },

    alertConfirm(success, message) {
      Bus.$emit('alert', {
        message,
        show: true,
        confirmed: success
      })
    }
  }
}
