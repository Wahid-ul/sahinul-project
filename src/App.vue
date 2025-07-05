<template>
  <div id="app">
    <Header />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import Header from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    Header,
    AppFooter
  },
};
</script>
