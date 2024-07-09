<template>
  <div id="app">
    <Header />
    <Hero />
    <About />
    <FeaturedProducts />
    <Testimonials />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/AppHeader.vue";
import Hero from "./components/AppHero.vue";


export default {
  name: "App",
  components: {
    Header,
    Hero,
   
  },
};
</script>

<style>
/* CSS styles can be kept in the same styles.css file or here */
</style>
