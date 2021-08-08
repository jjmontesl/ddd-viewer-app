<template>

    <v-card class="" style="overflow-x: hidden;">

        <v-card-title class="pb-8" style="text-align: left; word-break: break-word; width: 95%;"> Settings layer</v-card-title>

        <v-card-text class="text-left">
            <v-form>
                <v-btn @click="showColorPicker = !showColorPicker">
                    Pick a color
                </v-btn>
                <v-color-picker
                    v-model="color"
                    @input="changeColor( color )"
                    v-if="showColorPicker"
                    dot-size="25"
                    swatches-max-height="200"
                ></v-color-picker>

                <v-slider
                    v-model="altitude"
                    @change="changeAltitude(altitude)"
                    hint="Altitude"
                    max="160"
                    min="60"
                ></v-slider>
            </v-form>
        </v-card-text>
    </v-card>

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
import { GeoJson3DLayer } from 'ddd-viewer';


export default {
  mounted() {

    //window.addEventListener('resize', this.resize);
    //this.resize();
    //window.addEventListener('beforeunload', this.beforeUnload);

    // this.$emit('dddViewerMode', 'scene');
    // window.dispatchEvent(new Event('resize'));

  },
  beforeDestroy() {
  },
  inject: [
    'getSceneViewer',
  ],
  data() {
    return {
        altitude: "60",
        color: "#ff00ff",
        file: null,
        showColorPicker: false
    }
  },
  computed: {
  },
  props: [
      'viewerState',
      'layer'
  ],
  watch: {
    '$route' () {
    },
  },
    components: {
    },

    methods: {
        // async addLayer() {
        //     const fileData = await this.file.text();
        //     const fileName = this.file.name;
        //     const fileObject = JSON.parse(fileData);
        //     const layerKey = `custom${this.viewerState.layers.length + 1}`; // FIXME This will not be unique if layers are removed
        //     const layerObject = { "key": layerKey, "label": `Custom: ${fileName}`, "url": "", "visible": true };

        //     this.viewerState.layers.push(layerObject)
        //     const geoJsonLayerPoints = new GeoJson3DLayer(fileObject);
        //     this.getSceneViewer().layerManager.addLayer(layerKey, geoJsonLayerPoints);

        //     this.$router.replace('/3d/layers/').catch(()=>{});
        // },
        // selectLayer(layer) {
        //     this.selectedLayer = layer;
        // },

        // showHideLayer(layer) {
        //     layer.visible = ! layer.visible;
        //     let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(layer.key);
        //     sceneViewerLayer.setVisible(layer.visible)
        // }

        async changeColor(color) {
            console.log( color );
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setColor(color);
        },

        async changeAltitude(altitude) {
            console.log( altitude );
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setAltitudeOffset(altitude);
        }
    },

}
</script>
