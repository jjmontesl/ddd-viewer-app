<template>

  <div class="ddd-scene-tool-buttons unselectable" style="text-align: right;">
      
      <div v-if="viewerState.sceneVisible">
            <v-btn :to="{name: 'sceneTools'}" class="primary mb-2" style="pointer-events: auto;"><small><v-icon class="mr-1" dark>mdi-cog</v-icon> Settings</small></v-btn>
      </div>
      <div>
            <v-btn :to="{name: 'sceneLayers'}" class="primary" style="pointer-events: auto;"><small><v-icon class="mr-1" dark>mdi-folder-multiple</v-icon> Layers</small></v-btn>
      </div>
      <div>
            <ServerInfo v-if="viewerState.serverInfoShow" :viewerState="viewerState" />
      </div>

      <div v-if="dddConfig.geolocation">
          <v-btn @click="switchGeolocationPosition" class="" style="pointer-events: auto;" :color="viewerState.geolocationEnabled ? 'success': 'primary'"><small><v-icon dark>mdi-crosshairs-gps</v-icon> GPS</small></v-btn>
      </div>

  </div>

</template>

<style>
.ddd-scene-tool-buttons {
    /*z-index: 2;*/
    margin: 10px;
    /*//opacity: .75;*/
    cursor: pointer;
}
.ddd-scene-tool-buttons {
    /*pointer-events: auto;*/
}
.ddd-scene-tool-buttons button {
    pointer-events: auto;
}
*.unselectable {
   -moz-user-select: none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
</style>

<script>
import ServerInfo from '@/components/ddd/ServerInfo.vue';

export default {

  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },

  data() {
    return {
    }
  },

  props: [
    'viewerState',
  ],
  inject: [
    'getSceneViewer',
  ],
  components: {
    ServerInfo
},

  computed: {

  },

  methods: {


  },

}

</script>
