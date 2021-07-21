<template>

    <section class="home">
        <header class="home-header"></header>
        <div class="home-container">
            <LandingSection />
        </div>
        <Footer />
    </section>
</template>

<style scoped lang="scss">
body {
    overflow-x: hidden;
}
.home {
    color: #473D54;
}

.home-header {
    background-image: url("/img/home-banner.png");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    height: 560px;
}

.home-container {
    max-width: 960px;
    margin: 0 auto;
}
</style>

<script>
import Footer from "../core/Footer";
import LandingSection from "../core/LandingSection.vue"

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  mounted() {

    this.$emit('dddViewerMode', "site");

  },
  components: {
      Footer,
      LandingSection
  }

}
</script>
