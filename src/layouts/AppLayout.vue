<template>
  <div id="app-container" :class="getMenuType">
    <topnav v-if="currentUser.roles !== 'Guest'" />
    <sidebar v-if="currentUser.roles !== 'Guest'" />
    <main>
      <div class="container-fluid">
        <slot></slot>
      </div>
    </main>
    <footer-component v-if="currentUser.roles !== 'Guest'" />
  </div>
</template>

<script>
import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import { mapGetters } from "vuex";

export default {
  components: {
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["getMenuType", "currentUser"])
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  }
};
</script>
