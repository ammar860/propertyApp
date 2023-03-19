<template>
  <div>
    <b-modal
      id="settingPortalInfoDelete"
      ref="settingPortalInfoDelete"
      title="Delete Selected Publishing Setting"
      hide-footer
    >
      <div class="d-block text-center">
        <h4>{{ $t("general.delete-publishings") }}</h4>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="deleteItem()"
        ><span style="font-size: 18px"
          ><i class="iconsminds-delete-file"></i>Confirm</span
        ></b-button
      >
      <b-button
        class="mt-3"
        variant="outline-light"
        block
        @click="hideModal('settingPortalInfoDelete')"
        ><span style="font-size: 18px"
          ><i class="iconsminds-close"></i>Cancel</span
        ></b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DeletePublishingSettingModal",
  props: ["settingId"],
  methods: {
    ...mapActions({
      deletePublishing: "deletePublishing",
    }),
    async deleteItem() {
      console.log(this.settingId);
      try {
        const res = await this.deletePublishing({
          pk: this.settingId,
          config: this.config,
        });

        if (res.status == 200 || res.status == 201) {
          this.$notify(
            "Success",
            "Request made: Deleting a publishing",
            "Result: Selected publishings setting deleted successfully.",
            {
              type: "success",
              duration: 5000,
              permanent: false,
            }
          );
          this.hideModal("settingPortalInfoDelete");
        }
      } catch (err) {
        this.$notify(
          "Error",
          "Request made: Deleting a publishing",
          "Result: Selected publishings setting could not be deleted. Respose sent:" + err.status ==
            400 || 401
            ? "Access denied!"
            : "Unexpected server error! Please try later.",
          {
            type: "error",
            duration: 5000,
            permanent: false,
          }
        );
        this.hideModal("settingPortalInfoDelete");
      }
    },
    hideModal(refname) {
      this.$emit("fetchPublishings");
      this.$refs[refname].hide();
    },
  },
  computed: {
    ...mapGetters(["config"]),
  },
};
</script>

<style></style>
