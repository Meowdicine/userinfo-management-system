<template>
  <Modal>
    <template #content>
      <div class="p-4">{{ message }}</div>
      <div class="flex flex-row-reverse pr-2 pb-2">
        <CustomBtn
          text="ok"
          :loading="loadingBtn"
          @click.native="confirm"
          cssClass="btn btn-danger"
        />
        <CustomBtn
          text="cancel"
          @click.native="close"
          cssClass="btn btn-white  mr-2"
        />
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import CustomBtn from './CustomBtn.vue'

export default {
  components: {Modal, CustomBtn},
  props: {
    confirmed: Function,
    message: {type: String, default: 'Are You Sure?'},
  },

  data() {
    return {
      loadingBtn: false,
      alertModal: false,
      resolvePromise: undefined,
    }
  },

  methods: {
    confirm() {
      if (this.confirmed) {
        this.loadingBtn = true
        this.confirmed()
        this.$nextTick(() => this.done())
      }
    },
    close() {
      this.Bus.$emit('alert', {show: false})
      this.alertModal = false
    },
    done() {
      this.close()
      this.loadingBtn = false
    },
  },
  mounted() {
    window.addEventListener('keydown', e => e.keyCode === 13 && this.confirm())
    window.addEventListener('keydown', e => e.keyCode === 27 && this.close())
  },
}
</script>
