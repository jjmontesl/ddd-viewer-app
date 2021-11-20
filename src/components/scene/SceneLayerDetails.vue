<template>

    <v-card class="" style="overflow-x: hidden;">

        <v-card-title class="pb-2" style="text-align: left; word-break: break-word; width: 95%;">Layer settings</v-card-title>

        <v-card-text class="text-left">
            <v-form>
                <div class="ddd-row-layer">
                    <div class="mr-4 font-weight-bold">Name</div>
                    <div>
                        <div v-if="!pressEdit">
                            <span>{{this.layer.label}}</span>
                            <v-btn @click="pressEdit = true" x-small class="ml-4"><v-icon>mdi-pencil</v-icon></v-btn>
                        </div>
                        <div v-else>
                            <v-flex >
                                <v-text-field
                                    v-model="nameEdit"
                                    label="Layer Name"
                                    size="60"
                                    style="display: "
                                    single-line
                                    hide-details
                                    required
                                ></v-text-field>
                                <v-btn small class="primary mr-3" @click="updateNameClick">Save</v-btn>
                                <v-btn small class="secondary mr-3" @click="pressEdit = false">Cancel</v-btn>
                            </v-flex>
                        </div>
                    </div>
                </div>

                <div class="ddd-row-layer">
                    <div class="mr-4 font-weight-bold">Color</div>
                    <v-btn depressed :color="layer.color" @click="showColorPicker = !showColorPicker">
                    </v-btn>
                    <v-color-picker
                        v-model="color"
                        @input="changeColor( color )"
                        v-if="showColorPicker"
                        dot-size="25"
                        swatches-max-height="200"
                    ></v-color-picker>
                </div>

                <div class="ddd-row-layer">
                    <div class="mr-4 font-weight-bold">Altitude Offset</div>
                    <v-slider
                    v-model="altitude"
                    @input="changeAltitude(altitude)"
                    hint="Altitude"
                    min="-10"
                    max="100"
                    ></v-slider>
                </div>

                <div class="text-right">
                    <v-btn color="error" @click="deleteLayerButton()"><v-icon>mdi-delete</v-icon>Remove layer</v-btn>
                </div>

            </v-form>
        </v-card-text>
    </v-card>

</template>

<style lang="scss">
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
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setColor(color);

            this.saveLayers();
        },

        changeAltitude(altitude) {
            let sceneViewerLayer = this.getSceneViewer().layerManager.getLayer(this.layer.key);
            sceneViewerLayer.setAltitudeOffset(altitude);

            this.saveLayers();
        },
        deleteLayerButton() {
            this.deleteLayer(this.layer);
            this.$emit('dddLayerDeleted', this.layer);
        },
        updateNameClick() {
            this.layer.label = this.nameEdit;
            this.updateName({layer: this.layer})
            this.pressEdit = false;
        }
    },

}
</script>
