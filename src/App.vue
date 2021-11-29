<template>
  <div>
    <!-- Navbar -->
    <nav class="flex flex-wrap p-4 shadow">
      <div class="max-w-7xl mx-auto">
        <router-link to="/home">Home</router-link>
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
import Alert from "./components/Alert.vue";
export default {
  components: { Alert },
  data() {
    return {
      alert: {
        show: false,
      },
    };
  },

  mounted() {
    this.Bus.$on("alert", (res) => (this.alert = res));
  },
};
</script>
