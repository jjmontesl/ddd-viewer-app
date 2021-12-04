<template>

    <div>
    </div>

</template>

<script>
import { DDDServerClient } from '@/services/ddd_server/DDDServerClient.js';
import { DDD3DLayer } from 'ddd-viewer';
import { mapActions } from 'vuex';

export default {

  data() {
    return {
    }
  },

  components: {
  },
  props: [
      'viewerState',
  ],
  computed: {
      //'viewerState': function() {return this.viewerState;}
  },
  inject: [
      'getSceneViewer'
  ],

  beforeDestroy() {

  },

  created() {
    this.$root.dddServerComponent = this;
  },

  mounted() {
  },

  methods: {

    ...mapActions(['addLayer', 'deleteLayer']),

    initialize() {
      if (! this.$root.dddServer) {
        this.$root.dddServer = new DDDServerClient(this, this.$store);

        // Delete Geo layer
        const sceneViewer = this.$root.dddViewer.sceneViewer;
        const geoTile3DLayer = sceneViewer.layerManager.getLayer("ddd-osm-3d");
        if (geoTile3DLayer) {
          sceneViewer.layerManager.removeLayer(geoTile3DLayer);
        }

        sceneViewer.viewerState.timeScale = 0;

        this.$root.dddServer.initialize();

      }
    },

    setResult(result) {
      console.debug("Received dddserver result:", result);

      const sceneViewer = this.$root.dddViewer.sceneViewer;

      // Delete result layer if it exists

      //const existingResultLayerApp =

      const layerKey = "dddserver-" + result.key;

      const existingResultLayer = sceneViewer.layerManager.getLayer(layerKey);
      if (existingResultLayer) {
          console.debug("Pre-existing layer: " + layerKey);
          sceneViewer.layerManager.removeLayer(existingResultLayer);
          this.deleteLayer(existingResultLayer);

      }

      // Add layer to app
      this.addLayer( {
          sceneViewer: this.getSceneViewer(),
          layerConfig: {
              key: layerKey,
              label: 'DDDServer: ' + result.key + ' ' + result.label,
              type: 'DDD3DLayer',
              save: false,
          },
          data: result.data
      });

    }

  },

}

</script>
