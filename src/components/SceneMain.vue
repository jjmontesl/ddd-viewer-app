<template>

    <div  style="position: fixed; left: 10px; bottom: 10px; padding: 0px; z-index: 10;">
        <SceneLabel :viewerState="viewerState"></SceneLabel>
    </div>

</template>

<script>
import SceneLabel from '@/components/scene/SceneLabel.vue';

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('scene.TITLE')} - %s`
    }
  },
  mounted() {
    this.$emit('dddViewerMode', 'scene');

    this.viewerState.scenePickingEnabled = true;

    if (this.getSceneViewer() && !(this.getSceneViewer().sequencer.playing)) {this.viewerState.sceneViewModeShow = true;}

    //dddViewer.setMode('scene');
    //dddViewer.showScene(true);
      //const that = this;
    //const centerDefault = [-8.723, 42.238];
  },
  props: [
      'viewerState',
  ],
  inject: [
      'getSceneViewer'
  ],
  data() {
    return {
      //name: this.$store.state.auth.user.name,
      //showVerifyDialog: !this.$store.state.verify.emailVerified
    }
  },
  components: {
    SceneLabel
  }
}
</script>
