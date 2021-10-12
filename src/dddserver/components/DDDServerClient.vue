<template>

    <div>
      DDD Server Client
    </div>

</template>

<script>
import { DDDServerClient } from '@/services/ddd_server/DDDServer.js';
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
    this.$root.dddServer = new DDDServerClient(this, this.$store);
    this.$root.dddServer.initialize();
  },

  mounted() {

  },

  methods: {

    setResult(result) {
      console.debug("Component received dddserver result: " + result);
      console.debug(result);

      const sceneViewer = this.$root.dddViewer.sceneViewer;

      // Delete layer
      const geoTile3DLayer = sceneViewer.layerManager.getLayer("ddd-osm-3d");
      sceneViewer.layerManager.removeLayer(geoTile3DLayer);

      // Add layer for new result
      const layerDdd = new DDD3DLayer("dddserver-result", sceneViewer);
      sceneViewer.layerManager.addLayer(layerDdd);
      layerDdd.loadData(result.data);

    }

  },

}

</script>
