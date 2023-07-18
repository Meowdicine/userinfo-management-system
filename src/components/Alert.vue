<template>
  <Modal>
    <template #content>
      <div
        class="p-3 flex flex-col h-28 justify-between"
        :style="{
          width:
            screenSize > 450 ? '400px' : screenSize > 300 ? '270px' : '100%'
        }"
      >
        <div class="font-semibold">{{ message }}</div>
        <div class="flex flex-row-reverse gap-2">
          <CustomBtn
            text="ok"
            :loading="loadingBtn"
            cssClass="btn btn-danger"
            @click="confirm"
          />
          <CustomBtn text="cancel" cssClass="btn btn-white " @click="close" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import CustomBtn from './CustomBtn.vue'

export default {
  components: { Modal, CustomBtn },
  props: {
    confirmed: Function,
    message: { type: String, default: 'Are You Sure?' }
  },

  data() {
    return {
      loadingBtn: false,
      alertModal: false,
      resolvePromise: undefined
    }
  },

  methods: {
    async confirm() {
      if (this.confirmed) {
        this.loadingBtn = true
        await this.confirmed()
        this.done()
      }
    },
    close() {
      this.Bus.$emit('alert', { show: false })
      this.alertModal = false
    },
    done() {
      this.close()
      this.loadingBtn = false
    }
  },
  mounted() {
    window.addEventListener(
      'keydown',
      (e) => e.keyCode === 13 && this.confirm()
    )
    window.addEventListener('keydown', (e) => e.keyCode === 27 && this.close())
  }
}
</script>
