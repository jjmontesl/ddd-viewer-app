<template>
    <v-card class="my-3 hoverme" @click="goMapAndMovement(result)" @mouseenter="changeColour(result, true)" @mouseleave="changeColour(result, false)">
        <v-card-text class="pb-0">
            <v-layout>
                <div>
                    <IconTitle :result="this.result"/>
                </div>
                <v-flex class="text-left">
                    
                    <Title :result="this.result" class="mb-0" />

                    <div class="mb-3">
                        <v-badge color="primary" :content="result.class" inline>
                        </v-badge>
                        <v-badge color="secondary" :content="result.type" inline>
                        </v-badge>
                    </div>

                    <Direction :result="this.result" class="mb-2" />

                    <div>
                        <Population :result="this.result" />
                    </div>
                    <div>
                        <Wheelchair :result="this.result" class="mr-4" />
                        <OpeningHours :result="this.result" />
                    </div>

                    <div class="mt-2">
                                    <SocialMedia :result="this.result"/>
                                    <!--<Contact :result="this.result"/>-->
                    </div>

                </v-flex>
            </v-layout>

            <v-card-actions class="pt-0">
                <!--
                <div>
                    <v-badge color="primary" :content="result.class" inline>
                    </v-badge>
                    <v-badge color="secondary" :content="result.type" inline>
                    </v-badge>
                </div>
                -->
                <v-spacer></v-spacer>
                <div class="text-right mt-2 a-decoration">
                    <a @click="changeRouteToMoreInfo(result)">More info</a>
                </div>
            </v-card-actions>
            
        </v-card-text>

    </v-card>
</template>

<script>
import 'ol/ol.css';
import * as olProj from 'ol/proj';
import Extent from 'ol/extent';

// Importacion de info
import IconTitle from '@/components/info/IconTitle.vue';
import Title from '@/components/info/Title.vue';
import Direction from '@/components/info/Direction.vue';
import Population from '@/components/info/Population.vue';
import OpeningHours from '@/components/info/OpeningHours.vue';
import SocialMedia from '@/components/info/SocialMedia.vue';
import Wheelchair from '@/components/info/Wheelchair.vue';
import Contact from '@/components/info/Contact.vue';
import {Icon, Style} from 'ol/style';

export default {
    props: ['result'],

    components: {
        IconTitle,
        Title,
        Direction,
        Population,
        OpeningHours,
        SocialMedia,
        Wheelchair,
        Contact
    },

    methods: {
        goMapAndMovement(result) {
            const view = this.$root.viewerAppState.dddMap.map.getView();

            const boundingBox = result.boundingbox;

            const LatLonBounBox = olProj.transform( [boundingBox[2], boundingBox[0]], 'EPSG:4326', 'EPSG:3857');
            const LatLonBounBoxMax = olProj.transform( [boundingBox[3], boundingBox[1]], 'EPSG:4326', 'EPSG:3857');

            const extent = [...LatLonBounBox, ...LatLonBounBoxMax];

            view.fit(extent, { duration: 1000 });
        },

        changeRouteToMoreInfo(result) {
            const letterType = result.osm_type[0].toUpperCase();

            this.$router.push(`/maps/place/${letterType}${result.osm_id}`);
        },

        changeColour(result, isColored) {

            const iconStyle = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    color: isColored ? '#c0392b' : '#2c3e50',
                    src: '/img/map-icons/map-marker.png',
                }),
            });

            const layer = this.$root.viewerAppState.dddMap.mapMarkersLayer;
            const layerSource = layer.getSource();
            const features = layerSource.getFeatures();

            for (let feature of features) {
                const idFeature = feature.get('osmId');

                if (result.osm_id === idFeature) {
                    feature.setStyle(iconStyle);
                }
            }
        }
    }



}

</script>

<style lang="scss">
    .hoverme:hover {
        // background-color: #8395a7;
        background-color: #c8d6e5;
    }
</style>