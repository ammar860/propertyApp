<template>
  <div>
    <b-modal
      id="upmodalright"
      ref="upmodalright"
      title="Update User"
      modal-class="modal-right"
    >
      <b-form>
        <!-- <b-form-group label="Agency">
          <b-form-select v-model="item.agencyId" disabled>
            <template #first>
              <b-form-select-option
                v-for="agency in agenciesList"
                :key="agency.id"
                :value="agency.id"
                disabled
                >{{ agency.name }}</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group> -->
        <b-form-group label="Agency">
          <b-form-input
            v-if="currentUser.role == UserRole.Admin"
            :placeholder="currentUser.agencyName"
            disabled
          ></b-form-input>
          <b-form-select
            v-else-if="currentUser.role == UserRole.SuperAdmin"
            v-model="newItem.agencyID"
          >
            <template #first>
              <b-form-select-option value="" default
                >-- Please select an option --</b-form-select-option
              >
            </template>
            <b-form-select-option
              v-for="agency in agenciesList"
              :key="agency.id"
              :value="agency.id"
              >{{ agency.name }}</b-form-select-option
            >
          </b-form-select>
        </b-form-group>
        <b-form-group label="Email">
          <b-form-input v-model="item.data.email" :rows="2" :max-rows="2" />
        </b-form-group>
        <b-form-group label="First Name">
          <b-form-input v-model="item.data.firstName" :rows="2" :max-rows="2" />
        </b-form-group>
        <b-form-group label="Last Name">
          <b-form-input v-model="item.data.lastName" :rows="2" :max-rows="2" />
        </b-form-group>
        <b-form-group label="Username">
          <b-form-input v-model="item.data.userName" :rows="2" :max-rows="2" />
        </b-form-group>
        <b-form-group label="Description">
          <b-textarea v-model="item.data.description" :rows="2" :max-rows="2" />
        </b-form-group>
        <b-form-group label="Contact">
          <b-form-input v-model="item.data.contact" :rows="2" :max-rows="2" />
        </b-form-group>
        <b-form-group label="Status">
          <b-form-radio-group
            stacked
            class="pt-2"
            :options="statuses"
            v-model="item.data.status"
          />
        </b-form-group>
        <b-form-group label="Role">
          <b-form-select
            v-model="item.data.roles"
            :options="roles"
            :rows="2"
            :max-rows="2"
          ></b-form-select>
        </b-form-group>
      </b-form>

      <template slot="modal-footer">
        <b-button variant="outline-secondary" @click="hideModal('upmodalright')"
          >Cancel</b-button
        >
        <b-button variant="primary" @click="updateUser()" class="mr-1">Edit</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { UserRole } from "../../utils/auth.roles";

export default {
  name: "UpdateUserModal",
  computed: {
    ...mapGetters(["currentUser", "agenciesList", "config"]),
  },
  props: {
    item: {},
  },
  data() {
    return {
      statuses: ["Active", "In Active"],
      roles: [
        { value: "Admin", text: "Admin" },
        { value: "Agent", text: "Agent" },
        { value: "Customer", text: "Customer" },
      ],
      UserRole,
    };
  },
  methods: {
    ...mapActions({
      setAgents: "setCompanyAgents",
      updateAgent: "updateAgent",
    }),
    async updateUser() {
      await this.updateAgent({
        payload: this.$props.item,
        config: this.config,
      });
      this.$nextTick(() => {
        this.setAgents({
          config: this.config,
          user: this.currentUser,
        });
      });
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
  },
};
</script>
