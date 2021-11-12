<template>

    <v-card class="" style="overflow-x: hidden;">

        <v-card-title class="pb-8" style="text-align: left; word-break: break-word; width: 95%;">Settings layer</v-card-title>

        <v-card-text class="text-left">
            <v-form>
                <div class="ddd-row-layer">
                    <p>Name</p>
                    <div>
                        <div v-if="!pressEdit">
                            <span>{{this.layer.label}}</span>
                            <v-btn @click="pressEdit = true" x-small class="ml-4"><v-icon>mdi-pencil-outline</v-icon></v-btn>
                        </div>
                        <div v-else>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        v-model="nameEdit"
                                        label="Layer Name"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-btn x-small @click="updateNameClick">Save</v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </div>

                <div class="ddd-row-layer">
                    <p>Altitude Offset</p>
                    <v-slider
                    v-model="altitude"
                    @input="changeAltitude(altitude)"
                    hint="Altitude"
                    min="-10"
                    max="100"
                    ></v-slider>
                </div>

                <div class="ddd-row-layer">
                    <p>Color</p>
                    <v-btn depressed :color="layer.color" @click="showColorPicker = !showColorPicker">

                    </v-btn>
                </div>
                <v-color-picker
                    v-model="color"
                    @input="changeColor( color )"
                    v-if="showColorPicker"
                    dot-size="25"
                    swatches-max-height="200"
                ></v-color-picker>

                <v-btn color="error" @click="deleteLayerButton()"><v-icon>mdi-delete-outline</v-icon>Remove layer</v-btn>

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
import { mapActions } from 'vuex';
export default {
    created() {
        this.nameEdit = this.layer.label;
    },
  inject: [
    'getSceneViewer',
  ],
  data() {
    return {
        file: null,
        showColorPicker: false,
        altitude: this.layer.altitude,
        color: this.layer.color,
        pressEdit: false,
        nameEdit: null
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
        ...mapActions(['deleteLayer', 'saveLayers']),
        changeColor(color) {
            console.log( color );
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setColor(color);

            this.saveLayers();
        },

        changeAltitude(altitude) {
            console.log( altitude );
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setAltitudeOffset(altitude);

            this.saveLayers();
        },
        deleteLayerButton() {

            this.deleteLayer(this.layer);
        },
        updateNameClick() {
            this.layer.label = this.nameEdit;

            this.updateName({layer: this.layer})
        }
    },

}
</script>
