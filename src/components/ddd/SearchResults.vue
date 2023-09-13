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
                        <DDDCardSearch :result="result" />
                      </div>
                      <h4 v-if="searchResults && searchResults.length == 0" class="mt-3">No hay Resultados</h4>
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
import DDDCardSearch from '@/components/ddd/DDDCardSearch.vue';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';

export default {
  async mounted() {

    this.$emit('dddViewerMode', 'map');

    window.addEventListener('resize', this.resize);
    //this.resize();
    window.dispatchEvent(new Event('resize'));

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
    DDDCardSearch
  },

    methods: {

      async updateData () {
        let response = await this.getDataNominatim();
        if (!response || response.length === 0) {
          // Attempt a broader search
          response = await this.getDataNominatim(0.0);
        }

        this.searchResults = response;

        this.displayResultsMap(this.searchResults);

        // Force a window resize event to update map size according to panel and scrollbar
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });

        console.log(this.searchResults);
      },

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
      },

      /**
       * 
       * @param {*} boundingBox If 0, no bounding box is sent (global search), if 1.0, the current view bounding box is sent.
       */
      async getDataNominatim(boundingBox = 1.0) {
        const { query } = this.$route.params;

        // Use map viewbox for query if map is available
        // TODO: we should actually ensure that map view is ready before making this query
        let viewboxParam = "";
        if (boundingBox > 0) {
          if (this.$root.viewerAppState.dddMap) {

            const olmap = this.$root.viewerAppState.dddMap.map;
            const boundingBox = olmap.getView().calculateExtent(olmap.getSize())
            const LatLonBounBox = olProj.transform( [boundingBox[0], boundingBox[1]], 'EPSG:3857', 'EPSG:4326')
            const LatLonBounBoxMax = olProj.transform( [boundingBox[2], boundingBox[3]], 'EPSG:3857', 'EPSG:4326')

            viewboxParam = `&viewbox=${LatLonBounBox[0]},${LatLonBounBox[1]},${LatLonBounBoxMax[0]},${LatLonBounBoxMax[1]}&bounded=1`;
          }
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=11&addressdetails=1&extratags=1&namedetails=1` + viewboxParam;

        const results = await axios.get(url);

        return results.data;
      },

      displayResultsMap(searchResults) {

        const iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            color: '#2c3e50',
            src: '/img/map-icons/map-marker.png',
          }),
        })

        const layer = this.$root.viewerAppState.dddMap.mapMarkersLayer;
        const layerSource = layer.getSource()

        layerSource.clear();

        for (let i = 0; i < searchResults.length; i++) {
          const result = searchResults[i];


          const xy = olProj.transform( [result.lon, result.lat], 'EPSG:4326', 'EPSG:3857');

          const iconFeature = new Feature({
            geometry: new Point(xy),
            name: ('namedatails' in result) ? result.namedetails.name : result.name,
            osmId: result.osm_id
          });

          iconFeature.setStyle(iconStyle);
          layerSource.addFeature(iconFeature);
        }
      }

  },

}
</script>

