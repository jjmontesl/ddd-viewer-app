<template>
    <v-card class="ma-3 hoverme" @click="goMapAndMovement(result) ">
        <v-card-text>
            <v-layout>
                <div>
                <v-flex v-if="result.icon" class="text-center" style="max-width: 36px; min-width: 36px;">
                    <img :src="result.icon" alt="">
                </v-flex>
                <v-flex v-else-if="result.type == 'parking'" style="max-width: 36px; min-width: 36px;">
                    <v-icon>mdi-parking</v-icon>
                </v-flex>
                <v-flex v-else style="max-width: 36px; min-width: 36px;">
                    
                </v-flex>
                </div>
                <v-flex class="text-left">
                    <b><h3 class="mb-1">{{result.namedetails.name}}</h3></b>

                    <p>
                        <span class="grey--text text--lighten-1" v-if="result.address.road">{{result.address.road}}, </span>
                        <span>
                            <span v-if="result.address.city"><b>{{result.address.city}}, </b></span>
                            <span v-else-if="result.address.town" class="black--text">{{result.address.town}}, </span>
                        </span>

                        <span v-if="result.address.state">
                            {{result.address.state}},
                        </span>
                        <span v-if="result.address.country">
                            {{result.address.country}}
                        </span> 
                    </p>

                    <p v-if="result.extratags.population">
                        <v-icon class="info--text">mdi-account</v-icon>
                        <span class="info--text">{{result.extratags.population}}</span>
                    </p>

                    <p v-if="result.extratags.opening_hours">
                        <v-row>
                            <v-col class="col-1">
                                <v-icon class="info--text">mdi-clock</v-icon>
                            </v-col>
                            <v-col class="col-11">
                                <span class="info--text">{{result.extratags.opening_hours}}</span>
                            </v-col>
                        </v-row>
                    </p>

                    <div v-if="result.extratags.wheelchair == 'yes'">
                        <v-icon class="info--text">mdi-wheelchair-accessibility</v-icon>
                    </div>

                    <div>
                        <v-flex class="">
                                <v-row>
                                    <v-col class="text-left col-6">
                                        <a class="a-decoration mr-1" v-if="result.extratags['contact:instagram']" :href="result.extratags['contact:instagram']"><v-icon>mdi-instagram</v-icon></a>
                                        <a class="a-decoration mr-1" v-if="result.extratags['contact:facebook']" :href="result.extratags['contact:facebook']"><v-icon>mdi-facebook</v-icon></a>
                                        <a class="a-decoration " v-if="result.extratags['contact:youtube']" :href="result.extratags['contact:youtube']"><v-icon>mdi-youtube</v-icon></a>
                                    </v-col>
                                    <v-col class="text-right col-6">
                                        <a class="a-decoration " v-if="result.extratags.email" :href="`mailto:${result.extratags.email}`"><v-icon>mdi-gmail</v-icon></a>
                                    </v-col>
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

export default {
    props: ['result'],

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