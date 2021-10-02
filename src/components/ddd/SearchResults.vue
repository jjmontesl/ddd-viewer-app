<template>

    <div style="padding: 0px;" ref="dddViewPanel">

        <v-row style="margin: 0px;">
          <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8" >

            <div style="background-color: white;">

                <v-card class="">
                    <DDDMapInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/maps" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Search Results</v-card-title>

                    <v-card-text>
                      <div class="text-query" v-for="result in searchResults" :key="result.osm_id">
                        <DDDCardSearchResults :result="result" />
                      </div>
                    </v-card-text>
                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>

  .a-decoration {
    text-decoration: none;
  }

</style>


<script>
import axios from 'axios';
import * as olProj from 'ol/proj';

import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import DDDMapInsert from '@/components/ddd/DDDMapInsert.vue';
import DDDCardSearchResults from '@/components/ddd/DDDCardSearch.vue';

export default {
  async mounted() {

    window.addEventListener('resize', this.resize);
    this.resize();

    this.updateData();
  },

  data() {
    return {
      searchResults: null
    }
  },


  watch: {
    '$route' ()  {
      this.updateData();
    }
  },

  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('sceneItem.TITLE')} - %s`
    }
  },
  properties: [
      'viewerState',
  ],
  inject: [
    'getSceneViewer',
  ],

  props: [
      'viewerState',
  ],

  components: {
    DDDScene,
    DDDMapInsert,
    DDDCardSearchResults
  },

    methods: {

      async updateData () {
        const response = await this.getDataNominatim();
        this.searchResults = response.data;
        console.log(this.searchResults);
      },

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
      },

      async getDataNominatim() {
        const { query } = this.$route.params;

        const olmap = this.$root.viewerAppState.dddMap.map;
        const boundingBox = olmap.getView().calculateExtent(olmap.getSize())
        const LatLonBounBox = olProj.transform( [boundingBox[0], boundingBox[1]], 'EPSG:3857', 'EPSG:4326')
        const LatLonBounBoxMax = olProj.transform( [boundingBox[2], boundingBox[3]], 'EPSG:3857', 'EPSG:4326')

        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=11&addressdetails=1&extratags=1&namedetails=1&viewbox=${LatLonBounBox[0]},${LatLonBounBox[1]},${LatLonBounBoxMax[0]},${LatLonBounBoxMax[1]}&bounded=1`;



        const results = await axios.get(url);

        return results;
      }


  },

}
</script>

