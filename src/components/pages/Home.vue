<template>

    <div class="home">
        <header class="home-header"></header>
        <v-container fluid="false" class="home-container">
            <LandingSection />
        </v-container>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
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
