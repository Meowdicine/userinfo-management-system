<template>
  <div>
    <div id="app" class="max-w-7xl mx-auto py-12 px-2">
      <DataTable url="/api/users" :headers="headers">
        <template #topButton>
          <button @click="addUserModal" class="btn btn-primary">
            <span class="font-bold mr-2">+</span> Add new user
          </button>
        </template>
        <template #item.providers="{item}">
          <div
            class="flex flex-wrap items-center gap-1"
            v-if="item.providers.length"
          >
            <div v-for="(user, userIndex) in item.providers" :key="userIndex">
              <span
                class="bg-purple-600 text-white px-2 py-1 rounded-md text-xs"
                >{{ user.name }}</span
              >
            </div>
          </div>
          <div v-else>-</div>
        </template>
        <template #item.actions="{item}">
          <div class="flex users-center">
            <CustomBtn
              cssClass="w-5 h-5 mr-1"
              componentType="editIcon"
              @click.native="editUserModal(item)"
            />
            <CustomBtn
              cssClass="w-5 h-5"
              componentType="deleteIcon"
              @click.native="deleteUser(item)"
            />
          </div>
        </template>
      </DataTable>

      <!-- Form Modal -->
      <FormModal
        :url="url"
        :payload="user"
        v-if="formModal"
        :modalTitle="modalTitle"
        :requestType="requestType"
        :hasDeleteBtn="hasDeleteBtn"
        @created="addNewUser"
        @updated="updateUser"
        @close="formModal = false"
        @delete="deleteUser(user)"
      >
        <template #content>
          <FormInput
            isRequired
            type="text"
            label="Name"
            v-model="user.name"
            placeholder="username"
          />
          <FormInput
            isRequired
            type="email"
            label="Email"
            placeholder="email"
            v-model="user.email"
          />
          <FormInput
            isRequired
            type="text"
            label="Phone"
            v-model="user.phone"
            placeholder="phone number"
          />
          <FormProviders
            v-model="user.providers"
            @update="openProviderModal"
            @create="openProviderModal"
          />
        </template>
      </FormModal>

      <FormModal
        v-if="isCreatingProvider"
        :url="provider.url"
        :payload="provider"
        :modalTitle="provider.modalTitle"
        :requestType="provider.requestType"
        @created="providerCreated"
        @updated="providerUpdated"
        @close="isCreatingProvider = false"
      >
        <template #content>
          <FormInput
            isRequired
            type="text"
            v-model="provider.name"
            label="provider name"
          />
        </template>
      </FormModal>
    </div>

    <Notification v-model="Notification.isVisible" v-bind="Notification" />
  </div>
</template>

<script>
import Alert from '../components/Alert.vue'
import FormModal from '../components/FormModal.vue'
import FormInput from '../components/FormInput.vue'
import CustomBtn from '../components/CustomBtn.vue'
import DataTable from '../components/DataTable.vue'
import FormProviders from '../components/FormProviders.vue'
import Notification from '../components/Notification.vue'

export default {
  components: {
    Alert,
    FormModal,
    FormInput,
    CustomBtn,
    DataTable,
    FormProviders,
    Notification,
  },

  data() {
    return {
      user: {},

      url: '',
      requestType: '',
      hasDeleteBtn: false,

      modalTitle: '',
      formModal: false,

      isCreatingProvider: false,
      provider: {},

      headers: [
        {key: 'name', sorting: true},
        {key: 'email', sorting: true},
        {key: 'phone', sorting: true},
        {title: 'providers', key: 'providers'},
        {title: 'actions', key: 'actions'},
      ],
    }
  },

  methods: {
    addUserModal() {
      this.formModal = true
      this.url = '/api/users'
      this.hasDeleteBtn = false
      this.requestType = 'post'
      this.user = {providers: []}
      this.modalTitle = 'Add New User'
    },

    addNewUser() {
      this.formModal = false
      this.Bus.$emit('getDataTable')

      this.toast({message: 'User added successfully!'})
    },

    editUserModal(user) {
      this.formModal = true
      this.user = {...user}
      this.hasDeleteBtn = true
      this.requestType = 'put'
      this.modalTitle = 'Edit User'
      this.url = `/api/users/${user._id}`
    },

    updateUser() {
      this.formModal = false
      this.Bus.$emit('getDataTable')

      this.toast({message: 'User updated successfully!'})
    },

    deleteUser(user) {
      const success = () =>
        this.fetch()
          .delete(`/api/users/${user._id}`)
          .then(() => {
            this.formModal = false
            this.Bus.$emit('getDataTable')
            this.toast({message: 'User deleted successfully!'})
          })

      this.alertConfirm(success)
    },

    openProviderModal(provider) {
      this.provider = provider
      this.isCreatingProvider = true
    },

    providerCreated(res) {
      this.Bus.$emit('add-provider', res)
      this.isCreatingProvider = false

      this.toast({message: 'Provider added successfully!'})
    },

    providerUpdated(res) {
      this.Bus.$emit('update-providers', res)
      this.isCreatingProvider = false

      this.toast({message: 'Provider updated successfully!'})
    },
  },
}
</script>
