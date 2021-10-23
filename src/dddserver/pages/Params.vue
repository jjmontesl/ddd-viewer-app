<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="5" offset-lg="7" >

            <div style="background-color: white;">

                <v-card class="">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Parameters</v-card-title>

                    <v-card-text class="text-left">

                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>

                        <v-data-table
                            dense
                            :headers="headers"
                            :items="paramsWithValues"
                            :search="search"
                            :loading="loading"
                            item-key="order_num">

                        </v-data-table>

                    </v-card-text>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Data</v-card-title>

                    <v-card-text class="text-left">

                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>

                        <v-data-table
                            dense
                            :headers="dataHeaders"
                            :items="dataList"
                            :search="dataSearch"
                            :loading="dataLoading"
                            item-key="order_num">

                            <template v-slot:item.value="{ item }">
                                <div class="text-truncate text-nowrap">
                                    {{ item.value }}
                                </div>
                            </template>

                        </v-data-table>

                    </v-card-text>
                </v-card>

            </div>

        </v-col>
    </v-row>

  </div>

</template>

<style>
/*
tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
}
*/

.v-treeview-node__content, .v-treeview-node__label {
  flex-shrink: 1;
  white-space: normal;
}
.v-treeview-node__root {
  height: auto;
}

.table-column-name {
    width: 50px;
}
</style>


<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import OSMImage from '@/components/ddd/OSMImage.vue';
import NodeHierarchy from '@/components/scene/NodeHierarchy.vue';
import { mapState } from 'vuex';


export default {
    mounted() {
        this.$emit('dddViewerMode', 'scene');
        // Initialize DDDServer component (which initializes the client if needed)
        this.$nextTick(() => {
            this.$root.dddServerComponent.initialize();
        })
        window.addEventListener('resize', this.resize);
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
            'loading': false,
            'search': '',
            'headers': [
                { text: 'Key', value: 'key'},
                { text: 'Value', value: 'value'},
            ],

            'dataLoading': false,
            'dataSearch': '',
            'dataHeaders': [
                { text: 'Key', value: 'key'},
                { text: 'Value', value: 'value'},
            ]
        }
    },
    computed: {

        //...mapState(['dddserver']),

        'paramsWithValues': function() {
            let params = [];
            for (let task of this.$store.state.dddserver.tasks) {
                for (let key in task.params) {
                    params.push({
                        'key': key,
                        'value': (this.$store.state.dddserver.data && key in this.$store.state.dddserver.data) ? this.$store.state.dddserver.data[key] : null
                    })
                }
            }
            return params;
        },

        'dataList': function() {
            let data = [];
            for (let key in this.$store.state.dddserver.data) {
                data.push({
                    'key': key,
                    'value': this.$store.state.dddserver.data[key]
                })
            }
            return data;
        }
    },

    props: [
        'viewerState',
    ],

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

