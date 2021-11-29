<template>
  <div>
    <div id="app" class="max-w-7xl mx-auto py-12 px-2">
      <DataTable url="/api/users" :headers="headers">
        <template #topButton>
          <button @click="addUserModal" class="btn btn-primary mb-4 text-xs">
            Add new user
          </button>
        </template>
        <template #item.providers="{ item }">
          <div class="flex flex-wrap flex-row" v-if="item.providers.length">
            <div v-for="(user, userIndex) in item.providers" :key="userIndex">
              <span>{{ user.name }}</span>
              <span v-if="userIndex !== item.providers.length - 1" class="mr-1"
                >,</span
              >
            </div>
          </div>
          <div v-else>-</div>
        </template>
        <template #item.actions="{ item }">
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
        @created="addNewUser"
        @updated="updateUser"
        :modalTitle="modalTitle"
        :requestType="requestType"
        @close="formModal = false"
        :hasDeleteBtn="hasDeleteBtn"
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
          <FormProviders v-model="user.providers" />
        </template>
      </FormModal>

      <!-- <Alert ref="alert" /> -->
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import FormModal from "../components/FormModal.vue";
import FormInput from "../components/FormInput.vue";
import CustomBtn from "../components/CustomBtn.vue";
import DataTable from "../components/DataTable.vue";
import FormProviders from "../components/FormProviders.vue";

export default {
  components: {
    Alert,
    FormModal,
    FormInput,
    CustomBtn,
    DataTable,
    FormProviders,
  },

  data() {
    return {
      user: {},

      url: "",
      requestType: "",
      hasDeleteBtn: false,

      modalTitle: "",
      formModal: false,

      headers: [
        { key: "name", sorting: true },
        { key: "email", sorting: true },
        { key: "phone", sorting: true },
        { title: "providers", key: "providers" },
        { title: "actions", key: "actions" },
      ],
    };
  },

  methods: {
    addUserModal() {
      this.formModal = true;
      this.url = "/api/users";
      this.hasDeleteBtn = false;
      this.requestType = "post";
      this.user = { providers: [] };
      this.modalTitle = "Add New User";
    },

    addNewUser() {
      this.formModal = false;
      this.Bus.$emit("getDataTable");
    },

    editUserModal(user) {
      this.formModal = true;
      this.user = { ...user };
      this.hasDeleteBtn = true;
      this.requestType = "put";
      this.modalTitle = "Edit User";
      this.url = `/api/users/${user._id}`;
    },

    updateUser() {
      this.formModal = false;
      this.Bus.$emit("getDataTable");
    },

    deleteUser(user) {
      let success = () =>
        this.fetch()
          .delete(`/api/users/${user._id}`)
          .then(() => {
            this.Bus.$emit("getDataTable");
          });
      this.alertConfirm(success);
    },
  },
};
</script>
