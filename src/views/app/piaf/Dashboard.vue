<template>
  <div>
    <div>
      <b-row>
        <b-colxx xxs="12">
          <piaf-breadcrumb :heading="$t('menu.dashboard')" />
          <div class="separator mb-5"></div>
        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx xxs="12">
          <b-card class="mb-4" :title="$t('menu.dashboard')"> </b-card>
        </b-colxx>
      </b-row>
    </div>
    <!-- <div class="card" v-else>
      <img
        src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif"
        class="kg-image lightense-target image-fluid"
        alt=""
        loading="lazy"
      />
      <h1 class="d-flex justify-content-center" style="color: red">
        Access Not Allowed!
      </h1>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["currentUser", "config"]),
  },
  data() {
    return {
    };
  },
  async mounted() {
    try {
      await this.agencySet({
        config: this.config,
      });
      await this.agentSet({
        config: this.config,
        user: this.currentUser,
      });
      const res = await this.getSettings({
        config: this.config,
      });
      if (this.currentUser.role !== 0 && (res.status == 200 || 201)) {
        var settings = [];
        var getLocation = function (href) {
          var l = document.createElement("a");
          l.href = href;
          return l;
        };
        res.data.forEach((element) => {
          if (element.agencyId == this.agencyID) {
            let l = getLocation(element.ftpHost);
            let ln = l.hostname;
            let el = {
              ...element,
              hostname: ln.substring(0, ln.indexOf(".")),
            };
            settings.push(el);
          }
        });
        this.$store.dispatch("setPublishList", this.settings);
      }
    } catch(e) {
      console.log(e);
    }
  },
  methods: {
    ...mapActions({
      agencySet: "setAgencies",
      agentSet: "setCompanyAgents",
      getSettings: "getPublishing",
    }),
  },
};
</script>
