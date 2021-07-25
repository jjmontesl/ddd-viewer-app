<template>

    <div class="home">
        <header class="home-header"></header>
        <LandingSection />
        <Footer />
    </div>
</template>

<style scoped lang="scss">
.home {
    color: #473D54;
    overflow: hidden;
    pointer-events: auto;
}

.home-header {
    background-image: url("/img/home-banner.png");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    height: 560px;
}
</style>

<script>
import Footer from "../core/Footer";
import LandingSection from "./landing/Landing.vue";

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  mounted() {
    this.$emit('dddViewerMode', "site");
    window.addEventListener("scroll", () => {
        const target = this.$el.getElementsByClassName("home-header")[0];
        const offset = window.scrollY;
        const movement = ( offset ) * -0.6;

        target.style.transform = `translateY( ${ movement }px)`;
    });

  },
  components: {
      Footer,
      LandingSection
  }

}
</script>
