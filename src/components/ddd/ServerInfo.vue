<template>

    <div v-if="queuedCount > 0"><!--v-if="!serverInfo.queue_size"-->

        <div style="color: white; margin: 5px;">

            <v-card class="">
              <!--<v-card-title>Queued tiles</v-card-title>-->
              <v-card-text class="text-left">
                  <div>
                    <!-- <small><b>Server Generation Queue: ~{{ serverInfo.queue_size }} jobs</b></small><br /> -->
                    <small><b>Pending tiles: {{ queuedCount }}</b></small><br/>
                    <small><b>Time: {{ queuedEta }}</b></small>
                  </div>
              </v-card-text>
            </v-card>

        </div>

    </div>

</template>

<script>
import tiles from '@/services/ddd_http/tiles.js'

export default {
  mounted() {
      this.getServerQueueSize();
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
  data() {
    return {
      serverInfo: {},
      queuedCount: 0,
      queuedEta: null
    }
  },
  computed: {
  },
  watch: {
    /*
    '$root.dddViewer.sceneViewer.viewerState.remoteQueueJobsStatus': function() {

      this.$root.dddViewer;
      this.$root.dddViewer.sceneViewer;

      this.queuedCount = this.$root.dddViewer && this.$root.dddViewer.sceneViewer ? this.$root.dddViewer.sceneViewer.viewerState.remoteQueueJobsStatus.length : 0;

      // Return shortest ETA
      // TODO: currently just returning first
      if (!(this.$root.dddViewer && this.$root.dddViewer.sceneViewer)) { return "-"; }
      const queue = this.$root.dddViewer.sceneViewer.viewerState.remoteQueueJobsStatus;
      if (queue.length > 0) {
        this.queuedEta = "~" + Math.ceil(queue[0]['task_eta'] / 60) + " min";
      } else {
        this.queuedEta = null;
      }
    }
    */
  },
  components: {
  },
  methods: {

      updateQueueInfo() {
          if (!(this.$root.dddViewer && this.$root.dddViewer.sceneViewer)) { return; }

          this.queuedCount = this.$root.dddViewer.sceneViewer.viewerState.remoteQueueJobsStatus.length;

          // Return shortest ETA
          // TODO: currently just returning first
          const queue = this.$root.dddViewer.sceneViewer.viewerState.remoteQueueJobsStatus;
          if (queue.length > 0) {
            this.queuedEta = "~" + Math.ceil(queue[0]['task_eta'] / 60) + " min";
          } else {
            this.queuedEta = "-";
          }
      },

      getServerQueueSize() {
          /*
          tiles.getQueueSize().then((r) => {
              //console.debug(r);
              this.serverInfo = r.data;
          });
          */
          this.updateQueueInfo();
          setTimeout(() => { this.getServerQueueSize() }, 10000);  /* 60000 */
      }
  }
}
</script>
