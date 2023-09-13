<template>

    <div>

      <div style="position: fixed; left: 10px; top: 50px; width: 290px; padding: 0px;">
        
        <DDDPositionInfoPanel :viewerState="viewerState"  />

      </div>

      <div  style="position: fixed; left: 10px; bottom: 10px; padding: 0px; z-index: 10;">
          <SceneLabel :viewerState="viewerState"></SceneLabel>
      </div>

    </div>

</template>

<script>
import DDDMap from '@/components/ddd/DDDMap.vue';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import DDDPositionInfoPanel from '@/components/ddd/DDDPositionInfoPanel.vue';
import SceneLabel from '@/components/scene/SceneLabel.vue';

export default {
  mounted() {
    this.$emit('dddViewerMode', 'scene');
    if (this.getSceneViewer()) {this.getSceneViewer().deselectMesh();}
    if (this.getSceneViewer() && !(this.getSceneViewer().sequencer.playing)) {this.viewerState.sceneViewModeShow = true;}
  },
  metaInfo() {
    return {
      //title: this.$store.getters.appTitle,
      //titleTemplate: `${this.$t('home.TITLE')} - %s`
      //placeName: this.$route.params.name
    }
  },
  props: [
      'viewerState',
  ],
  inject: [
      'getSceneViewer'
  ],
  /*
  computed: {
  },
  */
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
      //placeName: this.$route.params.name.replace(",", ", ")
    }
  },
  components: {
      DDDMap,
      DDDMap3DSwitch,
      DDDPositionInfoPanel,
      SceneLabel
  },
  methods: {
  }
}
</script>
