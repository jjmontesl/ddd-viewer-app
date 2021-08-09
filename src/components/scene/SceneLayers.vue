<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8"  >

            <div style="background-color: white;">

                <v-card class="" style="overflow-x: hidden;">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Layers</v-card-title>

                    <div style="height: 20px;"> </div>

                    <v-card-text class="text-left">

                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td><b>Layer</b></td>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="layer in $root.layerManagerApp.layers" :key="layer.key">
                                <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding: 0;">
                                    <v-btn depressed class="btn" :input-value="layer.visible" x-small @click="showHideLayer(layer)"><v-icon>mdi-eye</v-icon></v-btn>
                                </td>
                                <td style="white-space: nowrap; width: 100%; cursor: pointer;" @click="selectLayer(layer)" :title="layer.key">
                                    {{ layer.label }}
                                </td>
                            </tr>
                            </tbody>
                        </v-simple-table>

                    </v-card-text>


                    <v-card-text class="text-left">
                        <v-btn to="/3d/layers/create" class="mx-2" dark color="primary"><v-icon dark>mdi-plus</v-icon> Add Layer</v-btn>
                    </v-card-text>

                    <div v-if="selectedLayer">
                        <SceneLayerDetails :viewerState="viewerState" :layer="selectedLayer" />
                    </div>
                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>
/*tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
}*/
/*
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 2px;
}
*/
</style>


<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import SceneLayerDetails from '@/components/scene/SceneLayerDetails.vue';


export default {
  mounted() {

    //window.addEventListener('resize', this.resize);
    //this.resize();
    //window.addEventListener('beforeunload', this.beforeUnload);

    this.$emit('dddViewerMode', 'scene');

    window.dispatchEvent(new Event('resize'));

    /*
    setTimeout(() =>  {
        const geoJsonLayerPoints = new GeoJson3DLayer(testGeoJsonLayerPoints);
        this.getSceneViewer().layerManager.addLayer("test-geojson-points", geoJsonLayerPoints);
        const geoJsonLayerLines = new GeoJson3DLayer(testGeoJsonLayerLines);
        this.getSceneViewer().layerManager.addLayer("test-geojson-lines", geoJsonLayerLines);
        const geoJsonLayerTest = new GeoJson3DLayer(testGeoJsonLayerTest);
        this.getSceneViewer().layerManager.addLayer("test-geojson-madrid-transport", geoJsonLayerTest);
    }, 0);
    */

  },
  beforeDestroy() {
  },

  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('sceneTools.TITLE')} - %s`
    }
  },
  inject: [
    'getSceneViewer',
  ],
  data() {
    return {
        selectedLayer: null
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
        DDDScene,
        DDDSceneInsert,
        SceneLayerDetails
    },

    methods: {
        selectLayer(layer) {
            this.selectedLayer = layer;
        },

        showHideLayer(layer) {
            layer.visible = ! layer.visible;
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(layer.key);
            sceneViewerLayer.setVisible(layer.visible)
        }
    },

}
</script>

