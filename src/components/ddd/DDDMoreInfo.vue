<template>
<v-card class="my-3 hoverme">
        <v-card-text>
            <v-layout v-if="result">
                <div>
                    <IconTitle :result="this.result"/>
                </div>
                <v-flex class="text-left">

                    <Title :result="this.result" class="mb-0" />
            
                    <p>
                        <v-badge color="primary" :content="result.class" inline>
                        </v-badge>
                        <v-badge color="secondary" :content="result.type" inline>
                        </v-badge>
                    </p>

                    <Direction :result="this.result"/>

                    <PlusInfo :result="this.result"/>

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
                    
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

import IconTitle from '@/components/info/IconTitle.vue';
import Title from '@/components/info/Title.vue';
import Direction from '@/components/info/Direction.vue';
import Population from '@/components/info/Population.vue';
import OpeningHours from '@/components/info/OpeningHours.vue';
import SocialMedia from '@/components/info/SocialMedia.vue';
import Wheelchair from '@/components/info/Wheelchair.vue';
import PlusInfo from '@/components/info/PlusInfo.vue';
import Contact from '@/components/info/Contact.vue';


export default {
    components: {
        IconTitle,
        Title,
        Direction,
        Population,
        OpeningHours,
        SocialMedia,
        Contact,
        Wheelchair,
        PlusInfo
    },

    mounted() {
        this.loadCardData();
    },

    data() {
        return {
            result: null,
        }
    },

    methods: {
        async loadCardData() {
            const idCard = this.$route.params.osmId;
            console.log(idCard);
            const url = `https://nominatim.openstreetmap.org/lookup?osm_ids=${idCard}&format=json&addressdetails=1&extratags=1&namedetails=1`

            const response = await axios.get(url);

            this.result = response.data[0];


        }
    }
}
</script>

<style>
</style>