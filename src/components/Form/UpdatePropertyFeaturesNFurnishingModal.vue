<template>
  <div>
    <b-modal
      id="propFurnishingEditModal"
      ref="propFurnishingEditModal"
      title="Edit Features and Furnishings"
      modal-class="modal-right"
    >
      <b-form class="av-tooltip tooltip-label-bottom">
        <b-row>
          <b-col cols="6">
            <b-form-checkbox
              v-model="item.wheelChairAcess"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Wheelchair access</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.petsAllowed"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Pets Allowed</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.balcony"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Balcony</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.parkingPlace"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Parking Place</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.Fireplace"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Fireplace</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.View"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >View</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.minergieConstruction"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Minergie Construction</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.newBuilding"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >New Building</b-form-checkbox
            >
          </b-col>
          <b-col cols="6">
            <b-form-checkbox
              v-model="item.childFriendly"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Child Friendly</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.smokingProhibited"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Smoking Prohibited</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.garage"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Garage</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.elevator"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Elevator</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.privateWashingMachine"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Private Washing Machine</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.quiteNeighbpurhood"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Quiet Neighbourhood</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.minergieCertified"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Minergie Certified</b-form-checkbox
            >
            <b-form-checkbox
              v-model="item.oldBuilding"
              :rows="2"
              :max-rows="2"
              :value="true"
              :unchecked-value="false"
              >Old Building</b-form-checkbox
            >
          </b-col>
        </b-row>
      </b-form>

      <template slot="modal-footer">
        <b-button
          variant="outline-secondary"
          @click="hideModal('propFurnishingEditModal')"
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
  name: "UpdatePropertyFurnishingNFeaturesModal",
  props: {
    item: Object,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      updatePropFurnishing: "updatePropertyFeatureNFurnishing",
    }),
    isStringTrue(s) {
      var boolValues = {
        false: false,
        False: false,
        true: true,
        True: true,
        1: true,
        0: false,
      };
      return boolValues[s];
    },
    async update() {
      let features = {
        wheelChairAcess: this.isStringTrue(this.item.wheelChairAcess),
        petsAllowed: this.isStringTrue(this.item.petsAllowed),
        balcony: this.isStringTrue(this.item.balcony),
        parkingPlace: this.isStringTrue(this.item.parkingPlace),
        Fireplace: this.isStringTrue(this.item.Fireplace),
        View: this.isStringTrue(this.item.View),
        minergieConstruction: this.isStringTrue(this.item.minergieConstruction),
        newBuilding: this.isStringTrue(this.item.newBuilding),
        childFriendly: this.isStringTrue(this.item.childFriendly),
        smokingProhibited: this.isStringTrue(this.item.smokingProhibited),
        garage: this.isStringTrue(this.item.garage),
        elevator: this.isStringTrue(this.item.elevator),
        privateWashingMachine: this.isStringTrue(this.item.privateWashingMachine),
        quiteNeighbpurhood: this.isStringTrue(this.item.quiteNeighbpurhood),
        minergieCertified: this.isStringTrue(this.item.minergieCertified),
        oldBuilding: this.isStringTrue(this.item.oldBuilding),
      };
      console.log(features);
      console.log(this.item.propertyId);

      try {
        const res = await this.updatePropFurnishing({
          pk: this.item.propertyId,
          payload: features,
          config: this.config,
        });

        if (res.status == 201 || res.status == 200) {
          this.$notify(
            "Success",
            "Request made: Update viewed property's furnishings and features.",
            "Result: Furnishing and Features updated successfully.",
            {
              permanent: false,
              duration: 5000,
              type: "success",
            }
          );
          this.hideModal("propFurnishingEditModal");
        }
      } catch (err) {
        this.$notify(
          "Error",
          "Request made: Update viewed property's furnishings and features.",
          "Result: Error when updating furnishing and features. Respose sent:" + err.status ==
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
