<template>
    <div>
        <v-flex v-if="result.icon" class="text-center" style="max-width: 36px; min-width: 36px;">
            <img :src="result.icon" :alt="result.icon">
        </v-flex>
        <v-flex v-else-if="iconfilename != null" style="max-width: 36px; min-width: 36px;">
            <!--<v-icon>mdi-map-marker</v-icon> -->
            <img :src="iconfilename" height="20">
        </v-flex>
        <!--
        <v-flex v-else-if="result.type == 'parking'" style="max-width: 36px; min-width: 36px;">
            <v-icon>mdi-parking</v-icon>
        </v-flex>
        -->
        <v-flex v-else style="max-width: 36px; min-width: 36px;">
            <v-icon>mdi-map-marker</v-icon>
            <!--<img :src="'/osmsymbols/png/' + result.class + '-' + result.type + '.svg.png'" height="20">-->
        </v-flex>
    </div>
</template>

<style>

</style>

<script>
import MapIcons from '@/utils/mapicons.js';

export default {
    props: ['result'],

    /*
    async mounted() {
        this.updateData();
    },
    */

    /*
    data() {
        return {
            searchResults: null
        }
    },
    */

    computed: {
        'iconfilename': function() {
            const iconname = this.result.class + '-' + this.result.type;
            const iconexists = MapIcons.iconExists(iconname);
            
            if (iconexists) {
                const iconfilename = '/osmsymbols/png/' + iconname + '.svg.png';
                return iconfilename;
            } else {
                return null;
            }

        }
    }

}
</script>


