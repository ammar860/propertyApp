<template>
  <div>
    <b-modal
      id="settingPortalInfoCreate"
      ref="settingPortalInfoCreate"
      title="Create Publishings"
      modal-class="modal-right"
    >
      <b-form @submit.stop.prevent>
        <b-form-group label="FTP Host">
          <b-form-input
            class="form-control"
            v-model="ftpHost"
            :state="hostState"
            aria-describedby="input-live-help input-live-feedback"
            required
            :rows="2"
            :max-rows="2"
          />
          <b-form-invalid-feedback id="input-live-feedback" :state="hostState">
            Fill entry with correct FTP host url
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="hostState"> Looks good! </b-form-valid-feedback>
        </b-form-group>
        <b-form-group label="Username">
          <b-form-input
            class="form-control"
            v-model="userName"
            :state="userNameState"
            aria-describedby="input-live-help input-live-feedback-un"
            :rows="2"
            :max-rows="2"
            required
          />
          <b-form-invalid-feedback id="input-live-feedback-un" :state="userNameState">
            Cannot be left empty
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="userNameState">
            Looks good!
          </b-form-valid-feedback>
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input
            class="form-control"
            v-model="password"
            :state="passState"
            type="password"
            aria-describedby="input-live-help input-live-feedback-pass"
            :rows="2"
            :max-rows="2"
            required
          />
          <b-form-invalid-feedback id="input-live-feedback-pass" :state="passState">
            Cannot be left empty
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="passState"> Looks good! </b-form-valid-feedback>
        </b-form-group>
      </b-form>

      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal('settingPortalInfoCreate')"
          >Cancel</b-button
        >
        <b-button variant="primary" @click="update()" class="mr-1">Save</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getCurrentUser } from "../../utils";
export default {
  name: "AddNewPublishingsModal",
  data() {
    return {
      ftpHost: "",
      userName: "",
      password: "",
      id: 0,
    };
  },
  methods: {
    ...mapActions({
      createSettings: "createPublishing",
    }),
    async update() {
      try {
        let data = {
          ftpHost: this.ftpHost,
          userName: this.userName,
          password: this.password,
        };

        let user = getCurrentUser();
        let id = user.agencyId;

        const res = await this.createSettings({
          pk: id,
          payload: data,
          config: this.config,
        });

        if (res.status == 200 || res.status == 201) {
          this.$notify(
            "Success",
            "Created a new publications host settings successfully",
            res.status,
            {
              type: "success",
              permanent: false,
              duration: 5000,
            }
          );
          this.hideModal("settingPortalInfoCreate");
          this.$emit("fetchPublishings");
          // window.location.reload();
        }
      } catch (err) {}
    },
    validURL(url) {
      let regex = new RegExp(
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      );
      return regex.test(url);
    },
    hideModal(refname) {
      this.$refs[refname].hide();
    },
  },
  computed: {
    ...mapGetters(["config"]),
    hostState() {
      return this.validURL(this.ftpHost) ? true : false;
    },
    userNameState() {
      return this.userName.length > 0 ? true : false;
    },
    passState() {
      return this.password.length > 0 ? true : false;
    },
  },
};
</script>

<style></style>
