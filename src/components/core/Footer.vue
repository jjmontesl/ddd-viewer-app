<template>
  <v-footer class="footer d-block text-center">
      <v-container>
        <v-row>
            <!--
            <v-col class="footer-column">
                <h2>Términos legales</h2>
                <a href="#">Cookies policy</a>
                <a href="#">Privacy policy</a>
                <a href="#">Legal note</a>
            </v-col>
            -->
            <v-col class="footer-column">
                <h2>Connect</h2>
                <a href="https://github.com/jjmontesl/ddd#contributing" target="_blank">Contribute</a>
                <!-- <a href="#">Subscribe to newsletter</a> -->
                <a href="https://twitter.com/3dsmaps" target="_blank">Follow on Twitter</a>

            </v-col>
            <v-col class="footer-column">
                <h2>GitHub repos</h2>
                <a href="https://github.com/jjmontesl/ddd" target="_blank">DDD</a>
                <a href="https://github.com/jjmontesl/ddd-viewer" target="_blank">DDD-Viewer</a>
                <a href="https://github.com/jjmontesl/ddd-viewer-app" target="_blank">DDD-App</a>
            </v-col>
        </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped lang="scss">
a {
    &:hover {
        color: #69ff5c !important;
    }
}
.footer {
    padding-top: 2rem;
    background-color: #473d54;
    color: white;
    pointer-events: auto;
}

.footer-column {
    display: flex;
    flex-direction: column;
}

.footer-column > h2 {
    padding: 1rem 0;
}

.footer-column > a {
    padding: 0.5rem 0;
    /*cursor: pointer;*/
    color: white;
    text-decoration: none;
}

</style>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
