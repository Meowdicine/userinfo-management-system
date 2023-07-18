<template>
  <Modal :modalTitle="modalTitle">
    <template #content>
      <div :style="{ width: screenSize > 450 ? modalSize : '100%' }">
        <div class="py-4">
          <h3 class="font-semibold ml-4">{{ modalTitle }}</h3>
        </div>

        <div class="bg-gray-100">
          <div class="flex flex-col p-4 space-y-4">
            <div>
              <ul
                v-if="Object.keys(errors).length !== 0"
                class="bg-red-400 p-4 rounded text-white"
              >
                <li
                  v-for="(error, index) in Object.values(errors)"
                  :key="index"
                >
                  {{ error }}
                </li>
              </ul>
            </div>

            <form :id="formId" @submit.prevent="submit">
              <div class="space-y-4">
                <slot name="content" :fields="fields"></slot>
              </div>
              <input
                class="hidden"
                type="submit"
                :form="formId"
                :ref="`submit-form-${formId}`"
              />
            </form>
          </div>
        </div>

        <div class="flex justify-between p-4">
          <div class="flex items-center">
            <slot name="footerButtons">
              <CustomBtn
                normal
                text="Delete"
                v-if="hasDeleteBtn"
                cssClass="btn text-red-600 hover:text-red-700 -ml-4"
                @click.native="$emit('delete')"
              />
            </slot>
          </div>
          <div class="flex items-center">
            <CustomBtn
              normal
              :text="closeBtnText"
              :cssClass="closeBtnClass"
              @click.native="$emit('close')"
            />

            <CustomBtn
              :text="saveBtnText"
              :loading="loadingBtn"
              @click.native="submitForm"
              :cssClass="saveBtnClass"
            />
          </div>
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
    size: {
      type: String,
      validator: () => ['lg', 'md', 'sm'],
      default: 'xl'
    },
    modalTitle: {
      type: String,
      default: 'Modal Title'
    },
    url: {
      type: String,
      required: true
    },
    requestType: {
      type: String,
      default: 'post'
    },
    payload: {
      type: Object,
      default: () => {}
    },
    saveBtnText: {
      type: String,
      default: 'Save'
    },
    saveBtnClass: String,
    closeBtnText: {
      type: String,
      default: 'Close'
    },
    closeBtnClass: {
      type: String,
      default: 'btn btn-white mr-2'
    },
    hasDeleteBtn: Boolean
  },

  data() {
    return {
      errors: {},
      fields: {},
      loadingBtn: false
    }
  },

  computed: {
    formId() {
      return `form-id-${Math.random() * 52485}`
    },

    modalSize() {
      const sizes = {
        xl: '450px',
        lg: '400px',
        md: '300px',
        sm: '200px'
      }
      return sizes[this.size]
    }
  },

  methods: {
    submit() {
      this.errors = {}
      this.loadingBtn = true
      const payload = { ...this.fields, ...this.payload }

      this.fetch()
        [this.requestType](this.url, { ...payload })
        .then((res) => {
          this.fields = {}
          let eventType = this.requestType === 'post' ? 'created' : 'updated'
          this.$emit(eventType, res)
        })
        .catch(({ response }) => {
          this.errors = response.data.errors
        })
        .finally(() => (this.loadingBtn = false))
    },

    submitForm() {
      this.$refs[`submit-form-${this.formId}`].click()
    }
  },

  mounted() {
    window.addEventListener(
      'keydown',
      (e) => e.keyCode === 27 && this.$emit('close')
    )
    this.Bus.$on('form-errors', (err) => (this.errors = err))
  }
}
</script>
