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
                        <v-card class="ma-3">
                          <v-card-text>
                            <v-layout>
                              <v-flex class="text-center" style="max-width: 36px; min-width: 36px;">
                                <img :src="result.icon" alt="">
                              </v-flex>
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

                                <a class="a-decoration mr-1" v-if="result.extratags['contact:instagram']" :href="result.extratags['contact:instagram']"><v-icon>mdi-instagram</v-icon></a>
                                <a class="a-decoration" v-if="result.extratags['contact:facebook']" :href="result.extratags['contact:facebook']"><v-icon>mdi-facebook</v-icon></a>
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-card>
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


import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import DDDMapInsert from '@/components/ddd/DDDMapInsert.vue';


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

        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=11&addressdetails=1&extratags=1&namedetails=1`;

        const results = await axios.get(url);

        return results;
      }


  },

}
</script>

