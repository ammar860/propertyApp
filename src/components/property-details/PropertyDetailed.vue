<template>
  <b-card header-text-variant="dark" class="mb-2">
    <template #header>
      <b-row class="d-flex" no-gutters>
        <b-colxx class="d-flex justify-content-start" xxs="9">
          <h3
            style="
              font-family: 'Nunito', sans-serif;
              font-weight: 400;
              font-size: 18px;
              padding-top: 1rem;
            "
          >
            <i class="iconsminds-information"></i>Details
          </h3>
        </b-colxx>
        <b-colxx class="d-flex justify-content-end" xxs="3">
          <b-button
            :class="{ blink_btn: isHovering }"
            style="height: max-content; margin-top: 5%"
            variant="outline-success"
            v-b-modal.propertyDetailsModal
          >
            <i class="iconsminds-pen"></i>Edit</b-button
          >
          <edit-det-modal :item="propertyDetail" @updateData="updateData" />
        </b-colxx>
      </b-row>
    </template>
    <!-- <template v-if="propertyDetail.Floors === 0 && propertyDetail.numberOfFloors === 0">
      <b-row class="m-1">
        <h4
          @mouseover="isHovering = true"
          @mouseout="isHovering = false"
          style="text-align: center; cursor: pointer"
        >
          <i
            class="iconsminds-information"
            style="align-items: center; display: inline-flex"
          ></i
          ><br />No data available.<br />
          Click edit button to add data.
        </h4>
      </b-row>
    </template> -->
    <!-- <template v-else> -->
    <b-card-text>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Floor:</b-col>
        <b-col
          ><p v-if="propertyDetail.Floors" class="rowsVal">
            {{ propertyDetail.Floors }}
          </p>
          <p v-else class="rowsVal">-</p>
        </b-col>
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Number Of Floors:</b-col>
        <b-col class="rowsVal"
          ><p v-if="propertyDetail.numberOfFloors" class="rowsVal">
            {{ propertyDetail.numberOfFloors }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Lot Size in (&#13217;):</b-col>
        <b-col class="rowsVal"
          ><p v-if="propertyDetail.lotDetailSizeInM2" class="rowsVal">
            {{ propertyDetail.lotDetailSizeInM2 }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Room Height:</b-col>
        <b-col
          ><p v-if="propertyDetail.roomsHeight" class="rowsVal">
            {{ propertyDetail.roomsHeight }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Year Built:</b-col>
        <b-col
          ><p v-if="propertyDetail.yearBuilt" class="rowsVal">
            {{ propertyDetail.yearBuilt }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Floor Space (&#13217;):</b-col>
        <b-col
          ><p v-if="propertyDetail.floorSpaceM2" class="rowsVal">
            {{ propertyDetail.floorSpaceM2 }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Volume in (&#x33A5;):</b-col>
        <b-col
          ><p v-if="propertyDetail.volumeInM3" class="rowsVal">
            {{ propertyDetail.volumeInM3 }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
      <b-row class="ml-2">
        <b-col class="rowsLbl" cols="6">Last Renovation:</b-col>
        <b-col
          ><p v-if="propertyDetail.lastRenovation" class="rowsVal">
            {{ propertyDetail.lastRenovation }}
          </p>
          <p v-else class="rowsVal">-</p></b-col
        >
      </b-row>
    </b-card-text>
    <!-- </template> -->
  </b-card>
</template>

<script>
import UpdatePropertyDetailsModal from "../Form/UpdatePropertyDetailsModal.vue";

export default {
  name: "PropertyDetailed",
  props: {
    property: Object,
  },
  components: {
    "edit-det-modal": UpdatePropertyDetailsModal,
  },
  data() {
    return {
      // isHovering: false,
      propertyDetail: {},
    };
  },
  watch: {
    property(value) {
      this.propertyDetail = value.propertyDetail;
    },
  },
  methods: {
    async updateData() {
      this.$emit("fetchProperty");
    },
  },
};
</script>

<style>
.rowsLbl {
  font-family: "Nunito";
  font-style: normal;
  font-weight: 200;
  font-size: 12px;
  color: #717171 !important;
}

.rowsVal {
  font-family: "Nunito";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  color: #212121 !important;
}

@keyframes glowing {
  0% {
    background-color: white;
    box-shadow: 0 0 3px white;
  }
  100% {
    background-color: green;
    box-shadow: 0 0 3px green;
  }
}
.blink_btn {
  animation: glowing 800ms infinite;
}
</style>
