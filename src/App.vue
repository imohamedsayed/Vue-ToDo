<template>
  <Header v-if="loggedIn" />
  <div class="app-content">
    <SideBar v-show="loggedIn" />
    <main :class="{ fullSize: loggedIn == false }">
      <router-view />
    </main>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
export default {
  components: { Header, SideBar },
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {
    watchLogging() {
      this.loggedIn = JSON.parse(localStorage.getItem("user")) ? true : false;
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => this.watchLogging()
    );
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .app-content {
    display: flex;
    main {
      flex: 1 1 0;
      height: calc(100vh - 60px);
      overflow-y: auto;
      &.fullSize {
        height: 100vh;
      }
      @media (max-width: 768px) {
        padding-left: 4rem;
        &.fullSize {
          padding-left: 0rem;
        }
      }
    }
  }
}
body {
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #181820 !important;
}
:root {
  --dark: #181820;
  --dark-alt: #30303d;
  --space-grey: #21212b;
  --gradient-a: #d753c5;
  --gradient-b: #fd8a8f;
  --skin: #fc76a1;
  --grey: #aaaabe;
}
</style>
