<template>
    <v-container fluid class="pa-0">
        <v-container>
            <v-row class="landing-row my-16" style="padding-bottom: 120px;">
                <v-col>
                    <h3 class="landing-title">Navigate 3d Earth built from OpenStreetMap</h3>
                    <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
                </v-col>
                <v-col order="first">
                    <img class="landing-photo" src="/img/home-section1.png" />
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid class="skewed-box">
            <v-container>
                <v-row class="landing-row pt-8 my-16">
                    <v-col>
                        <h3 class="landing-title">Modelling, videogames, map auditing and more...</h3>
                        <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
                    </v-col>
                    <v-col>
                        <img class="landing-photo" src="/img/home-section2.png" />
                    </v-col>
                </v-row>
            </v-container>
        </v-container>
        <v-container style="max-width:560px;">
            <v-row class="landing-row my-16" style="padding-top: 80px;">
                <v-col>
                    <h3 class="landing-title">Contribute</h3>
                    <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
                    <p class="landing-paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus explicabo culpa modi et sed enim natus ipsum praesentium quos tempore distinctio quidem fuga, eius impedit labore earum, veniam similique omnis.</p>
                </v-col>
            </v-row>
        </v-container>
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
    text-transform: uppercase;
}

.landing-paragraph {
    font-size: 1.2rem;
}

.skewed-box {
    padding: 0;
    position: relative;
    color: whitesmoke;
    background-color: #473d54;
}

.skewed-box::before {
    content: "";
    position: absolute;
    top: -118px;
    left: 0;
    right: 0;
    display: block;
    z-index: 2;
    width: 100%;
    height: 120px;
    border-width: 120px 100vw 0 0;
    border-style: solid;
    border-color: transparent #473d54 transparent transparent;
}

.skewed-box::after {
    content: "";
    position: absolute;
    bottom: -118px;
    left: 0;
    right: 0;
    display: block;
    z-index: 2;
    width: 100%;
    height: 120px;
    border-width: 0 0 120px 100vw;
    border-style: solid;
    border-color: transparent transparent transparent #473d54;
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
