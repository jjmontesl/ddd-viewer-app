<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8" >

            <div style="background-color: white;">

                <v-card class="">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Tasks</v-card-title>

                    <v-card-text class="text-left">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="task in $store.state.dddserver.tasks" :key="task.order_num.join('.')">
                                <td>{{ task.order_num }}</td>
                                <td>{{ task.name }}</td>
                                <td>X</td>
                            </tr>
                            </tbody>
                            </v-simple-table>



                    </v-card-text>

                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>
tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
}
/*
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 2px;
}
*/

.v-treeview-node__content, .v-treeview-node__label {
  flex-shrink: 1;
  white-space: normal;
}
.v-treeview-node__root {
  height: auto;
}
</style>


<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import OSMImage from '@/components/ddd/OSMImage.vue';
import NodeHierarchy from '@/components/scene/NodeHierarchy.vue';


export default {
    mounted() {

        this.$emit('dddViewerMode', 'scene');

        window.addEventListener('resize', this.resize);
        //this.resize();

        //setTimeout(() => {
        //    }, 2000);
        //this.status = this.$root.dddServer.status;

        // Remove default layer (test, devel)


        // Show selected (or last) result


    },

    beforeDestroy() {
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
    data() {
        return {
        }
    },
    computed: {

    },
    props: [
        'viewerState',
    ],
    watch: {
        'viewerState.sceneSelectedMeshId' () {
            this.$forceUpdate();
            //this.setMesh(this.getSceneViewer().selectedMesh);
            //if (! this.metadata['_updated']) {this.metadata['_updated'] = 0;}
            //this.metadata['_updated']++;
        }
    },

    components: {
        DDDScene,
        DDDSceneInsert,
        OSMImage,
        NodeHierarchy,
    },

    methods: {

      resize() {
        let el = this.$el.querySelector('.v-card');
        //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
        el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
      },

  },

}
</script>

