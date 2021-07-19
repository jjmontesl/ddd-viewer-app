<template>
  <v-footer class="footer d-block text-center">
      <v-container>
        <v-row>
            <v-col class="footer-column">
                <h2>Términos legales</h2>
                <a href="#">Cookies policy</a>
                <a href="#">Privacy policy</a>
                <a href="#">Legal note</a>
            </v-col>
            <v-col class="footer-column">
                <h2>Connect</h2>
                <a href="#">Contribute</a>
                <a href="#">Subscribe to newsletter</a>
            </v-col>
            <v-col class="footer-column">
                <h2>Github repos</h2>
                <a href="#">DDD-App</a>
                <a href="#">DDD-Viewer</a>
                <a href="#">DDD</a>
            </v-col>
        </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped lang="scss">
.footer {
    padding-top: 2rem;
    background-color: #473d54;
    color: white;
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
    cursor: pointer;
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
