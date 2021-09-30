<template>

    <div style="padding: 0px;" ref="dddViewPanel">

        <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8" >

            <div style="background-color: white;">

                <v-card class="">
                    <DDDMapInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Search Results</v-card-title>

                    <v-card-text>
                    </v-card-text>
                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>
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

    this.searchResults = await this.getDataNominatim();
  },

  data() {
    return {
      searchResults: null
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

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
        
      },

      async getDataNominatim() {
        const { query } = this.$route.params;
        console.log(query);

        const url = `https://nominatim.openstreetmap.org/search?q=${query}`;

        // const results = axios.get(url)
      }


  },

}
</script>

