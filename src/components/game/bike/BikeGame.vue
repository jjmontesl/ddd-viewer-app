<template>

    <div style="padding: 0px;">

    </div>

</template>

<style>
</style>

<script>
import { BikeGameProcess } from '@/games/bike/BikeGameProcess.js';

export default {
  mounted() {

    this.$emit('dddViewerMode', 'scene');


    // Get sequence JSON
    let gameUrl = this.$route.query.u;
    gameUrl = "/games/fly-vigo-1.json";
    if (gameUrl) {
        // Fetch from URL
        gameUrl = decodeURIComponent(gameUrl);
        fetch(gameUrl).then((response) => {
            response.json().then((data) => {
                  let gameData = data;
                  //console.debug(data);

                  // Launch game
                  const gameProcess = new BikeGameProcess(this.getSceneViewer(), gameData);
                  this.getSceneViewer().processes.add(gameProcess);

            })
        })

    }

    /*
    setTimeout(() => {
      this.getSceneViewer().loadSkybox("@dynamic");
    }, 2000);
    */

  },

  inject: [
      'getSceneViewer',
  ],

  data() {
    return {
    }
  },
  computed: {
  },
  props: [
      'viewerState',
  ],
  watch: {
  },

  components: {
  },

  methods: {

  },

}
</script>

