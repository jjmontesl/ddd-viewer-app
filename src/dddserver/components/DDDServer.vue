<template>

    <div>
    </div>

</template>

<script>
import { DDDServerClient } from '@/services/ddd_server/DDDServerClient.js';
import { DDD3DLayer } from 'ddd-viewer';

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
      //'getViewerState'
  ],

  beforeDestroy() {

  },

  created() {
    this.$root.dddServerComponent = this;
  },

  mounted() {
  },

  methods: {

    initialize() {
      if (! this.$root.dddServer) {
        this.$root.dddServer = new DDDServerClient(this, this.$store);

        // Delete Geo layer
        const sceneViewer = this.$root.dddViewer.sceneViewer;
        const geoTile3DLayer = sceneViewer.layerManager.getLayer("ddd-osm-3d");
        if (geoTile3DLayer) {
          sceneViewer.layerManager.removeLayer(geoTile3DLayer);
        }

        this.$root.dddServer.initialize();

      }
    },

    setResult(result) {
      console.debug("Received dddserver result: " + result);
      console.debug(result);

      const sceneViewer = this.$root.dddViewer.sceneViewer;

      // Delete result layer if it exists
      const existingResultLayer = sceneViewer.layerManager.getLayer("dddserver-result");
      if (existingResultLayer) {
        sceneViewer.layerManager.removeLayer(existingResultLayer);
      }

      // Add layer for new result
      const layerDdd = new DDD3DLayer("dddserver-result");
      sceneViewer.layerManager.addLayer(layerDdd);
      layerDdd.loadData(result.data);

    }

  },

}

</script>
