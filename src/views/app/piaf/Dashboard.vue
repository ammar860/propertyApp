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
      // loading: false,
      set: [],
    };
  },
  async mounted() {
    try {
      const res = await this.getSettings({
        config: this.config,
      });
      console.log(res);
      if (this.currentUser.role !== 0 && res.status === 200) {
        res.data.forEach((element) => {
          if (element.agencyId === this.currentUser.agencyId) {
            let l = this.getLocation(element.ftpHost);
            let ln = l.hostname;
            let el = {
              ...element,
              hostname: ln.substring(0, ln.indexOf(".")),
            };
            this.set.push(el);
          }
        });
        this.setSettings({
          payload: this.set,
        });
      } else if (this.currentUser.role === 0 && res.status === 200) {
        res.data.forEach((element) => {
          let l = this.getLocation(element.ftpHost);
          let ln = l.hostname;
          let el = {
            ...element,
            hostname: ln.substring(0, ln.indexOf(".")),
          };
          this.set.push(el);
        });
        this.setSettings({
          payload: this.set,
        });
      }
      this.agencySet({
        config: this.config,
      });
      this.agentSet({
        config: this.config,
        user: this.currentUser,
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    ...mapActions({
      agencySet: "setAgencies",
      agentSet: "setCompanyAgents",
      getSettings: "getPublishing",
      setSettings: "setPublishList",
    }),
    getLocation(href) {
      var l = document.createElement("a");
      l.href = href;
      return l;
    },
  },
};
</script>
