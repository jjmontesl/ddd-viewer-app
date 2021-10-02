<template>
    <!-- TODO: put code postal -->
    <v-card class="ma-3 hoverme" @click="goMapAndMovement(result) ">
        <v-card-text>
            <v-layout>
                <div>
                    <IconTitle :result="this.result"/>
                </div>
                <v-flex class="text-left">
                    <Title :result="this.result"/>

                    <Direction :result="this.result"/>

                    <Population :result="this.result"/>

                    <OpeningHours :result="this.result"/>

                    <Wheelchair :result="this.result"/>

                    <div>
                        <v-flex class="">
                                <v-row>
                                    <SocialMedia :result="this.result"/>
                                    <Contact :result="this.result"/>
                                </v-row>
                        </v-flex>
                    </div>

                    <div class="text-right mt-2 a-decoration">
                        <a href="#">More info</a>
                    </div>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
import 'ol/ol.css';
import * as olProj from 'ol/proj';

// Importacion de info
import IconTitle from '@/components/info/IconTitle.vue';
import Title from '@/components/info/Title.vue';
import Direction from '@/components/info/Direction.vue'
import Population from '@/components/info/Population.vue'
import OpeningHours from '@/components/info/OpeningHours.vue'
import SocialMedia from '@/components/info/SocialMedia.vue'
import Wheelchair from '@/components/info/Wheelchair.vue'

export default {
    props: ['result'],

    components: {
        IconTitle,
        Title,
        Direction,
        Population,
        OpeningHours,
        SocialMedia,
        Wheelchair
    },

    methods: {
        goMapAndMovement(result) {
            const view = this.$root.viewerAppState.dddMap.map.getView();
            const positionCenter = olProj.transform( [result.lon, result.lat], 'EPSG:4326', 'EPSG:3857')
            view.animate({
                center: positionCenter,
                duration: 1000,
                zoom: 10,
                rotation: 0
            });
        },
        
    }
        

        
}

</script>

<style lang="scss">
    .hoverme:hover {
        // background-color: #8395a7;
        background-color: #c8d6e5;
    }
</style>