<template>
    <v-container>
        <v-row class="landing-row py-8">
            <v-col>
                <h3 class="landing-title">Navigate 3d earth built from openstreetmaps</h3>
                <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
            </v-col>
            <v-col order="first">
                <img class="landing-photo" src="/img/home-section1.png" />
            </v-col>
        </v-row>
        <v-row class="landing-row py-8">
            <v-col>
                <h3 class="landing-title">Modelling, videogames, map auditing and more...</h3>
                <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
            </v-col>
            <v-col>
                <img class="landing-photo" src="/img/home-section2.png" />
            </v-col>
        </v-row>

        <v-row class="landing-row py-8">
            <v-col>
                <h3 class="landing-title">Contribute</h3>
                <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
                <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.landing-photo {
    max-width: 400px;
    padding-top: 3rem;
}

.landing-title,
.landing-paragraph {
    text-align: left;
}

.landing-title {
    font-size: 3rem;
}

.landing-paragraph {
    font-size: 1.2rem;
}
</style>

<script>
export default {
  name: 'LandingSection',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
