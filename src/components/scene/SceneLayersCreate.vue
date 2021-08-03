<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8"  >

            <div style="background-color: white;">

                <v-card class="" style="overflow-x: hidden;">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title class="pb-8" style="text-align: left; word-break: break-word; width: 95%;">Create Layer</v-card-title>

                    <v-card-text class="text-left">

                        <v-form class="p-4">
                            <v-file-input
                                v-model="file"
                                truncate-length="15"
                                label="Source GeoJSON file"
                            ></v-file-input>

                            <div style="text-align: center;"><span>or</span></div>


                            <v-text-field
                                type="url"
                                label="Source URL"
                            ></v-text-field>
                        </v-form>

                    </v-card-text>


                    <v-card-text class="text-left">
                        <v-btn @click="addLayer()" class="mx-2" dark color="primary"><v-icon dark>mdi-plus</v-icon>Add</v-btn>
                    </v-card-text>


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
import { GeoJson3DLayer } from 'ddd-viewer';


export default {
  mounted() {

    //window.addEventListener('resize', this.resize);
    //this.resize();
    //window.addEventListener('beforeunload', this.beforeUnload);

    this.$emit('dddViewerMode', 'scene');

    window.dispatchEvent(new Event('resize'));

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
        file: null
    }
  },
  computed: {
  },
  props: [
      'viewerState',
  ],
  watch: {
    '$route' () {
    },
  },

    components: {
        DDDScene,
        DDDSceneInsert,
    },

    methods: {
        async addLayer() {
            const fileData = await this.file.text();
            const fileName = this.file.name;
            const fileObject = JSON.parse(fileData);
            const layerKey = `custom${this.viewerState.layers.length + 1}`; // FIXME This will not be unique if layers are removed
            const layerObject = { "key": layerKey, "label": `Custom: ${fileName}`, "url": "", "visible": true };

            this.viewerState.layers.push(layerObject)
            const geoJsonLayerPoints = new GeoJson3DLayer(fileObject);
            this.getSceneViewer().layerManager.addLayer(layerKey, geoJsonLayerPoints);

            this.$router.replace('/3d/layers/').catch(()=>{});
        },
        // selectLayer(layer) {
        //     this.selectedLayer = layer;
        // },

        // showHideLayer(layer) {
        //     layer.visible = ! layer.visible;
        //     let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(layer.key);
        //     sceneViewerLayer.setVisible(layer.visible)
        // }
    },

}
</script>

