<template>

    <div style="padding: 0px;" ref="dddViewPanel">

      <v-row style="margin: 0px;">
        <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="5" offset-lg="7" >

            <div style="background-color: white;">

                <v-card class="">

                    <DDDSceneInsert />

                    <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>

                    <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Tasks</v-card-title>

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
                            :items="tasks"
                            :search="search"
                            :loading="loading"
                            item-key="key"
                            :items-per-page="itemsPerPage"
                            show-select
                            hide-default-footer >

                            <template v-slot:item.order_num="{ item }">
                                <v-chip color="blue" dark small>
                                    {{ item.order_num.join(".") }}
                                </v-chip>
                            </template>
                            <template v-slot:item.name="{ item }">
                                <div class="text-truncate" style="max-width: 200px;" :title="item.name">
                                    {{ item.name }}
                                </div>
                            </template>
                            <template v-slot:item.run_seconds="{ item }">
                                {{ item.run_seconds ? item.run_seconds.toFixed(3) : '' }}
                            </template>

                        </v-data-table>

                        <!--
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="task in $store.state.dddserver.tasks" :key="task.order_num.join('.')">
                                    <td class="text-no-wrap">{{ task.order_num }}</td>
                                    <td>{{ task.name }}</td>
                                    <td>X</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                        -->
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

.table-column-name {
    width: 50px;
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

        // Initialize DDDServer component (which initializes the client if needed)
        this.$nextTick(() => {
            this.$root.dddServerComponent.initialize();
        })

        window.addEventListener('resize', this.resize);
        window.dispatchEvent(new Event('resize'));

        //setTimeout(() => {
        //}, 2000);
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
            'loading': false,
            'search': '',
            'itemsPerPage': 99999,
            'headers': [
                { text: 'Order', value: 'order_num' },
                { text: 'Name', value: 'name'},
                { text: 'Selected', value: 'run_selected', align: 'end', },
                { text: 'Time', value: 'run_seconds', align: 'end', },
            ]
        }
    },
    computed: {
        'tasks': function() {
            return this.$store.state.dddserver.tasks.map((t) => { return { ...t, 'key': t.order_num.join(".") }; });
        },
    },
    props: [
        'viewerState',
    ],
    watch: {
        data() {
            window.dispatchEvent(new Event('resize'));
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

