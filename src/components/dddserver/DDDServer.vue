<template>

    <div>
      DDD Server Client
    </div>

</template>

<script>
import { DDDServerClient } from '@/services/ddd_server/DDDServer.js';

export default {

  data() {
    return {
    }
  },

  components: {
  },
  props: [
      'viewerState',
  ],
  computed: {
      //'viewerState': function() {return this.viewerState;}
  },
  inject: [
      //'getViewerState'
  ],

  beforeDestroy() {

  },

  created() {
    this.$root.dddServer = new DDDServerClient();
    this.$root.dddServer.initialize();
  },

  mounted() {

  },

  methods: {

  },

}

</script>
