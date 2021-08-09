<template>

    <v-card class="" style="overflow-x: hidden;">

        <v-card-title class="pb-8" style="text-align: left; word-break: break-word; width: 95%;">Settings layer</v-card-title>

        <v-card-text class="text-left">
            <v-form>
                <div class="ddd-row-layer">
                    <p>Name</p>
                    <p>{{this.layer.label}}</p>
                </div>

                <div class="ddd-row-layer">
                    <p>Altitude Offset</p>
                    <v-slider
                        v-model="layer.altitude"
                        @change="changeAltitude(altitude)"
                        :hint="layer.altitude + ' m'"
                        max="160"
                        min="60"
                    ></v-slider>
                </div>

                <div class="ddd-row-layer">
                    <p>Color</p>
                    <v-btn depressed :color="layer.color" @click="showColorPicker = !showColorPicker">

                    </v-btn>
                </div>
                <v-color-picker
                    v-model="layer.color"
                    @input="changeColor( color )"
                    v-if="showColorPicker"
                    dot-size="25"
                    swatches-max-height="200"
                ></v-color-picker>
                <v-slider
                    v-model="altitude"
                    @input="changeAltitude(altitude)"
                    hint="Altitude"
                    min="-10"
                    max="100"
                ></v-slider>

                <v-btn color="error"><v-icon>mdi-delete-outline</v-icon>Remove layer</v-btn>

            </v-form>
        </v-card-text>
    </v-card>

</template>

<style lang="scss">
/*tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
}*/
/*
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 2px;
}
*/

.ddd-row-layer {
    display: flex;
    align-items: center;
    padding-bottom: 1rem;

    & p { padding-right: 1rem; }
}
</style>


<script>
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
        changeColor(color) {
            console.log( color );
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setColor(color);
        },

        changeAltitude(altitude) {
            console.log( altitude );
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setAltitudeOffset(altitude);
        }
    },

}
</script>
