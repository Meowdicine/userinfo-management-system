<template>
  <div id="Providers">
    <div class="flex flex-grow-0 providers-start items-start justify-between">
      <div class="pr-3 w-full">
        <FormInput
          type="text"
          v-model="search"
          label="Providers"
          :iconText="'&#128270;'"
          placeholder="Search by provider's name"
        />
        <div
          :class="`bg-white shadow p-2 max-h-36 overflow-auto relative rounded mt-1 ${
            loader && 'pb-8'
          }`"
        >
          <Loader v-if="loader" :size="4" />
          <div v-else>
            <div v-if="filteredProviders.length">
              <div
                v-for="(provider, index) in filteredProviders"
                :key="index"
                class="flex items-center py-1 justify-between"
              >
                <div class="flex providers-center">
                  <input
                    type="checkbox"
                    class="cursor-pointer"
                    :id="`provider-provider-${index}`"
                    :checked="provider.__selected"
                    @click="selectItem(provider._id)"
                  />
                  <label
                    :for="`provider-provider-${index}`"
                    class="text-xs ml-1 cursor-pointer"
                    >{{ provider.name }}</label
                  >
                </div>
                <div class="flex providers-center">
                  <CustomBtn
                    class="mr-1"
                    componentType="editIcon"
                    @click.native="editProviderModal(provider)"
                  />
                  <CustomBtn
                    componentType="deleteIcon"
                    @click.native="deleteProvider(provider)"
                  />
                </div>
              </div>
            </div>
            <div v-else class="text-center text-gray-600">
              No Providers To Show.
            </div>
          </div>
        </div>
      </div>
      <div>
        <CustomBtn
          text="+"
          type="button"
          :loaderSize="15"
          style="margin-top: 27px"
          @click.native="addProviderModal"
          cssClass="px-3 py-1 btn-primary text-base"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from './Alert.vue'
import Loader from './Loader.vue'
import FormInput from './FormInput.vue'
import CustomBtn from './CustomBtn.vue'
import FormModal from './FormModal.vue'

export default {
  components: {Alert, FormInput, CustomBtn, FormModal, Loader},
  props: {
    value: Array,
    userProviders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      url: '',
      search: '',
      provider: {},
      loader: true,
      requestType: '',

      modalTitle: '',
      formModal: false,
      loadingBtn: false,

      providers: [],
      selectedProviders: [],
    }
  },

  computed: {
    filteredProviders() {
      return this.providers.filter(({name}) =>
        name.toLowerCase().includes(this.search.toLowerCase())
      )
    },
  },

  methods: {
    addProviderModal() {
      this.$emit('create', {
        requestType: 'post',
        modalTitle: 'Add New Provider',
        url: '/api/providers',
      })
    },

    addNewProvider({data}) {
      this.providers.unshift(data)

      this.toast({message: 'Provider added successfully!'})
    },

    editProviderModal(provider) {
      this.$emit('update', {
        requestType: 'put',
        name: provider.name,
        modalTitle: `Edit ${provider.name}`,
        url: `/api/providers/${provider._id}`,
      })
    },

    updateProviders({data}) {
      // check if was this providers existing in selectedProviders
      if (this.selectedProviders.includes(data._id)) {
        data.__selected = true
      }

      // find provider and update it
      const providerIndex = this.filteredProviders.findIndex(
        ({_id}) => _id == data._id
      )
      this.providers[providerIndex] = data
      this.filteredProviders[providerIndex] = data
      this.formModal = false
      this.Bus.$emit('getDataTable')
      this.fetchProviders()

      this.toast({message: 'Provider updated successfully!'})
    },

    deleteProvider(provider) {
      let success = () =>
        this.fetch()
          .delete(`/api/providers/${provider._id}`)
          .then(() => {
            const providerIndex = this.providers.findIndex(
              ({_id}) => _id == provider._id
            )
            if (providerIndex > -1) {
              this.providers.splice(providerIndex, 1)
              var index = this.selectedProviders.findIndex(
                _id => _id === provider._id
              )

              // remove provider from selectedProviders if selected
              this.selectedProviders.splice(index, 1)
              this.$emit('input', this.selectedProviders)
              this.Bus.$emit('getDataTable')
            }
          })

      this.alertConfirm(success)
    },

    selectItem(providerId) {
      // check if providerId exist in selectedProviders array
      if (this.selectedProviders.includes(providerId)) {
        // identify the index
        var index = this.selectedProviders.findIndex(id => id === providerId)
        // remove providerID from selectedProviders array
        this.selectedProviders.splice(index, 1)
        // change provider.__selected = false
        this.providers = this.providers.map(provider => {
          if (provider._id === providerId) {
            provider.__selected = false
          }
          return provider
        })
      } else {
        // if it doesn't exist push it
        this.selectedProviders.push(providerId)
        // change provider.__selected = true
        this.providers = this.providers.map(provider => {
          if (provider._id === providerId) {
            provider.__selected = true
          }
          return provider
        })
      }
      this.$emit('input', this.selectedProviders)
    },

    fetchProviders() {
      /*
       * return all providers
       * check if this provider has already selected
       */
      this.fetch()
        .get('/api/providers')
        .then(({data}) => {
          data = data.map(provider => {
            if (this.value.length) {
              this.value.map(userProvider => {
                if (userProvider._id === provider._id) {
                  provider.__selected = true
                  this.selectedProviders.push(provider._id)
                }
              })
            } else {
              provider.__selected = false
            }
            return provider
          })
          this.providers = data
        })
        .finally(() => (this.loader = false))
    },
  },

  created() {
    this.fetchProviders()
  },

  mounted() {
    this.Bus.$on('add-provider', res => this.addNewProvider(res))
    this.Bus.$on('update-providers', res => this.updateProviders(res))
  },
}
</script>
