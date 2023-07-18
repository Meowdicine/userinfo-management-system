<template>
  <div>
    <!-- Navbar -->
    <nav class="pb-2 shadow bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="md:max-w-max flex justify-center md:justify-start">
          <router-link :to="`/users?page=1`">
            <span class="italic font-bold text-primary">
              <Icon name="logo" />
            </span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- views -->
    <router-view></router-view>

    <!-- alert modal -->
    <Alert
      v-if="alert.show"
      ref="alert"
      :message="alert.message"
      :confirmed="alert.confirmed"
    />
  </div>
</template>

<script>
import Alert from './components/Alert.vue'
import Icon from './components/Icon.vue'

export default {
  components: { Alert, Icon },
  data() {
    return {
      alert: {
        show: false
      }
    }
  },

  mounted() {
    this.Bus.$on('alert', (res) => (this.alert = res))
  }
}
</script>
