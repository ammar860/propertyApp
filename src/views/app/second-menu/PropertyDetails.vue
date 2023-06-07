<template>
  <div>
    <template v-if="!details && !isLoad">
      <b-card no-body>
        <template #header>
          <b-row class="w-100">
            <b-col xxs="8">
              <span xxs="9" class="w-50" style="white-space: pre-line"
                ><h1 style="color: red">
                  {{ $t("alert.propertyDet404") }}
                </h1>
                <p v-if="currentUser.roles !== 'Guest'" style="color: crimson">Note: {{ $t("alert.go-back-text") }}</p>
                <p v-else-if="currentUser.roles === 'Guest'" style="color: crimson">Note: {{ $t("alert.go-back-text2") }}</p>
              </span>
            </b-col>
            <b-col xx="4" class="mt-4">
              <div class="top-right-button-container">
                <b-button
                  v-if="currentUser.roles !== 'Guest'"
                  id="ddown5"
                  size="lg"
                  variant="outline-success"
                  class="top-right-button top-right-button-single"
                  no-fade="true"
                  @click="navigateBack()"
                  ><i class="iconsminds-arrow-back" />{{ $t("pages.back") }}</b-button
                >
              </div>
            </b-col>
          </b-row>
        </template>
      </b-card>
    </template>
    <template v-else-if="details && !isLoad">
      <b-card>
        <div class="loading"></div>
      </b-card>
    </template>
    <template v-else>
      <b-row>
        <b-col xxs="12">
          <h1>
            {{ details.title }}
          </h1>
          <div class="top-right-button-container">
            <b-button
              v-if="currentUser.roles !== 'Guest'"
              id="ddown5"
              size="lg"
              variant="outline-success"
              class="top-right-button top-right-button-single"
              no-fade="true"
              @click="navigateBack()"
              ><i class="iconsminds-arrow-back" />{{ $t("pages.back") }}</b-button
            >
          </div>
          <!-- <piaf-breadcrumb /> -->
          <div class="separator mb-5"></div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="7">
          <b-row>
            <b-col cols="5">
              <property-main-feature :property="details" @fetchProperty="fetchProperty" />
              <property-details :property="details" @fetchProperty="fetchProperty" />
            </b-col>
            <b-col cols="7">
              <!-- <b-row> -->
              <property-cost class="mb-2" style="width:100%;" :property="details" @fetchProperty="fetchProperty" />
              <property-responsible-agent
                class="mb-2"
                style="width:100%;"
                :property="details"
                @fetchProperty="fetchProperty"
              />
              <!-- </b-row> -->
              <property-feature-details
                style="width:100%;"
                :property="details"
                @fetchProperty="fetchProperty"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col style="min-width: 100%">
              <property-media :property="details" @fetchProperty="fetchProperty" />
            </b-col>
          </b-row>
          <b-row>
            <b-col xxs="6">
              <property-status-publication
                :property="details"
                @fetchProperty="fetchProperty"
              />
            </b-col>
            <b-col xxxs="6">
              <property-owner :property="details" @fetchProperty="fetchProperty" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="5">
          <property-description :property="details" @fetchProperty="fetchProperty" />
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PropertyMainFeature from "../../../components/property-details/PropertyMainFeature.vue";
import PropertyDetailed from "../../../components/property-details/PropertyDetailed.vue";
import PropertyCosts from "../../../components/property-details/PropertyCosts.vue";
import PropertyResponsibleAgent from "../../../components/property-details/PropertyResponsibleAgent.vue";
import PropertyFeatureDetails from "../../../components/property-details/PropertyFeaturesDetails.vue";
import PropertyMedia from "../../../components/property-details/PropertyMedia.vue";
import PropertyOwner from "../../../components/property-details/PropertyOwner.vue";
import PropertyDescription from "../../../components/property-details/PropertyDescription.vue";
import PropertyStatusPublication from "../../../components/property-details/PropertyStatusPublication.vue";

export default {
  name: "PropertyDetails",
  components: {
    "property-main-feature": PropertyMainFeature,
    "property-details": PropertyDetailed,
    "property-cost": PropertyCosts,
    "property-responsible-agent": PropertyResponsibleAgent,
    "property-feature-details": PropertyFeatureDetails,
    "property-media": PropertyMedia,
    "property-owner": PropertyOwner,
    "property-description": PropertyDescription,
    "property-status-publication": PropertyStatusPublication,
  },
  data() {
    return {
      propertyID: Number,
      details: {},
      isLoad: false,
    };
  },
  async mounted() {
    this.getPropertyData();
  },
  methods: {
    ...mapActions({
      getPropertyById: "getPropertyById",
    }),
    navigateBack() {
      this.$router.push("/app/second-menu/PropertiesListing");
    },
    async getPropertyData() {
      let uri = window.location.search.substring(1);
      let id = new URLSearchParams(uri);
      this.propertyID = id.get("p");

      try {
        const res = await this.getPropertyById({
          pk: this.propertyID,
          config: this.config,
        });

        this.details = res.data;
        console.log(this.details);

        if (res.status == 200 && this.details) {
          this.isLoad = true;
          this.$notify(
            "success",
            "Request made: Get property data!",
            "Result: Fetched data successfully.",
            {
              type: "success",
              duration: 5000,
              permanent: false,
            }
          );
          // this.$store.dispatch("setSelectedProp", this.details);

        } else if (res.status == 200 && !this.details) {
          this.$notify(
            "error",
            "Request made: Get property data!",
            "Result: Fetch data request denied, selected property does not exist.",
            {
              type: "error",
              duration: 5000,
              permanent: false,
            }
          );
        }
      } catch (error) {
        this.$notify(
          "error",
          "Request made: Get property data!",
          "Result: Fetch data request denied. Response sent: " + error.status == 400 ||
            401
            ? "Access denied!"
            : "Unexpected server error! Please try later.",
          {
            type: "error",
            duration: 5000,
            permanent: false,
          }
        );
      }
    },
    async fetchProperty() {
      let uri = window.location.search.substring(1);
      let id = new URLSearchParams(uri);
      this.propertyID = id.get("p");

      try {
        const res = await this.getPropertyById({
          pk: this.propertyID,
          config: this.config,
        });

        if (res.status == 200) {
          this.details = res.data;
          // this.$store.dispatch("setSelectedProp", this.details);
        }
      } catch (error) {
        this.$notify(
          "error",
          "Request made: Get property data!",
          "Result: Fetch data request denied. Response sent: " + error.status == 400 ||
            401
            ? "Access denied!"
            : "Unexpected server error! Please try later.",
          {
            type: "error",
            duration: 5000,
            permanent: false,
          }
        );
      }
    },
  },
  computed: {
    ...mapGetters(["config", "currentUser"]),
  },
};
</script>

<style scoped>

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

h1 {
  text-transform: uppercase;
}
</style>
