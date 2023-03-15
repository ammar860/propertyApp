<template>
  <div>
    <b-modal
      id="mainFeaturesModal"
      ref="mainFeaturesModal"
      title="Edit Main Features"
      modal-class="modal-right"
    >
      <b-form class="av-tooltip tooltip-label-bottom">
        <b-form-group label="Rooms" class="has-float-label">
          <b-form-spinbutton
            class="w-50"
            min="0"
            max="10"
            step="0.5"
            v-model="item.Rooms"
            :rows="2"
            :max-rows="2"
          />
        </b-form-group>
        <b-form-group label="Living space" class="has-float-label">
          <b-input-group class="w-50">
            <template #append>
              <b-input-group-text>&#13217;</b-input-group-text>
            </template>
            <b-form-input
              v-model="item.LeavingSpace"
              placeholder="Enter the total living space size"
              type="number"
              min="1"
              :rows="2"
              :max-rows="2"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label="Street &amp; Nr" class="has-float-label">
          <b-form-input
            v-model="item.Street"
            placeholder="Enter your street number"
            type="text"
            :rows="2"
            :max-rows="2"
          />
        </b-form-group>
        <b-form-group label="Zip code &amp; City" class="has-float-label">
          <b-form-input
            v-model="item.ZipCodeOrCity"
            placeholder="Enter your zip code followed by your city name"
            type="text"
            :rows="2"
            :max-rows="2"
          />
          <!-- <b-form-invalid-feedback>
            Data entry format example:0000 Brussels (i.e.,zip_code city).
          </b-form-invalid-feedback> -->
        </b-form-group>
        <b-form-group label="Available">
          <b-form-radio-group
            class="pt-2"
            v-model="item.Availibility"
            :options="availList"
          />
        </b-form-group>
      </b-form>

      <template slot="modal-footer">
        <b-button variant="outline-secondary" @click="hideModal('mainFeaturesModal')"
          >Cancel</b-button
        >
        <b-button variant="primary" @click.prevent="update()" class="mr-1">Save</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UpdatePropertyMainFeaturesModal",
  props: {
    item: Object,
  },
  data() {
    return {
      availList: ["Immediatly", "By Agreement", "Date"],
    };
  },
  methods: {
    ...mapActions({
      updatePropertyFeatures: "updatePropertyMainFeature",
    }),
    async update() {
      let mainFeatures = {
        Rooms: Number(this.item.Rooms),
        LeavingSpace: Number(this.item.LeavingSpace),
        Street: this.item.Street,
        ZipCodeOrCity: this.item.ZipCodeOrCity,
        Availibility: this.item.Availibility,
      };
      console.log(mainFeatures);

      try {
        const res = await this.updatePropertyFeatures({
        pk: this.item.propertyId,
        payload: mainFeatures,
        config: this.config,
      });

      if (res.status == 200 || res.status == 201) {
        this.$notify("Success", "Request made: Update viewed property's main features.", "Result: Main features updated successfully.", {
          type: "success",
          permanent: false,
          duration: 5000,
        });
        this.hideModal("mainFeaturesModal");
      }
      } catch (error) {
        this.$notify(
          "Error",
          "Request made: Update viewed property's main features.",
          "Result: Error when updating main features. Respose sent:" + err.status ==
            400 || 401
            ? "Access denied!"
            : "Unexpected server error! Please try later.",
          {
            permanent: false,
            duration: 5000,
            type: "error",
          }
        );
      }
    },
    hideModal(refname) {
      this.$emit("updateData");
      this.$refs[refname].hide();
    },
  },
  computed: {
    ...mapGetters(["config"]),
  },
};
</script>
