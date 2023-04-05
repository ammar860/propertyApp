<template>
  <b-card header-text-variant="dark" class="mb-2">
    <template #header>
      <b-row class="d-flex" no-gutters>
        <b-col class="d-flex justify-content-start" xxs="9">
          <h3 style="
                  font-family: 'Nunito', sans-serif;
                  font-weight: 400;
                  font-size: 18px;
                  padding-top: 1rem;
                ">
            <i class="iconsminds-information"></i>Photos and Documents
          </h3>
        </b-col>
        <b-col class="d-flex justify-content-end" xxs="3">
          <b-button class="mt-2" style="height: min-content" variant="outline-success" v-b-modal.editMediaModal>
            <i class="iconsminds-pen"></i>Edit</b-button>
          <edit-property-media :item="imageListShow" :id="propertyId" @updateData="updateData" />
        </b-col>
      </b-row>
      <b-row>
        <div class="m-1">
          <b-card-group deck v-if="length > 0">
            <b-card :img-src="imageListShow[i].url" no-body />
            <b-card v-if="length > 1" :img-src="imageListShow[j].url" no-body />
            <b-card v-if="length > 2" :img-src="imageListShow[k].url" no-body />
          </b-card-group>
          <div class="mt-2 d-flex justify-content-center" v-if="length > 0">
            <b-button pill :disabled="i == 0" @click="getBackword"><i class="iconsminds-arrow-back"></i></b-button>
            <b-button pill class="ml-2" :disabled="length == k + 1 || length <= 3" @click="getForward">
              <i class="iconsminds-arrow-forward"></i></b-button>
          </div>
        </div>
      </b-row>
    </template>
  </b-card>
</template>

<script>
import UpdatePropertyMediaModal from "../Form/UpdatePropertyMediaModal.vue";
export default {
  name: "PropertyMedia",
  components: {
    "edit-property-media": UpdatePropertyMediaModal,
  },
  props: {
    property: Object,
  },
  data() {
    return {
      imageList: [],
      imageListShow: [],
      length: 0,
      propertyId: 0,
      i: 0,
      j: 1,
      k: 2,
    };
  },
  watch: {
    property(value) {
      this.imageList = value.image;
      this.imageListShow = []
      this.imageList.forEach((img) => {
        if (img.isActive) {
          this.imageListShow.push(img);
        }

      });
      this.propertyId = value.id;
      this.length = this.imageListShow.length;
    },
  },
  methods: {
    async updateData() {
      this.$emit("fetchProperty");
    },
    getForward() {
      this.i++;
      this.j++;
      this.k++;
    },
    getBackword() {
      this.i--;
      this.j--;
      this.k--;
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
</style>
