<template>
    
    <div style="padding: 0px;" ref="dddViewPanel">
        
        <v-row style="margin: 0px;">
            <v-col style="padding: 0px; pointer-events: auto;" sm="6" offset-sm="6" md="5" offset-md="7" lg="4" offset-lg="8"  >
                
                <div style="background-color: white;">
                    
                    <v-card class="" style="overflow-x: hidden;">
                        
                        <DDDSceneInsert />
                        
                        <div style="position: fixed; left: 10px; top: 50px; width: 290px; padding: 0px;">
                            <DDDPositionInfoPanel :viewerState="viewerState"  />
                        </div>
                        
                        
                        <div>
                            <v-btn style="position: absolute; z-index: 5; right: 5px; margin-top: 15px;" to="/3d" class="mx-2" fab dark x-small color="primary"><v-icon dark>mdi-close</v-icon></v-btn>
                            
                            <v-card-title style="text-align: left; word-break: break-word; width: 95%;">Settings</v-card-title>
                            
                            <div style="height: 20px;"> </div>
                            
                            <v-card-text class="text-left">
                                
                                <v-slider v-model="sceneTime" @start="sceneTimeChangeStart" @end="sceneTimeChangeEnd" @change="sceneTimeChange" style="margin-top: 0px;" step="0.5" min="0" max="24" thumb-label="always" ticks label="Hour (Day/Night)">
                                    <template v-slot:thumb-label="">
                                        {{ Math.floor(sceneTime).toString() + ":" + (Math.abs((sceneTime % 1) * 60)).toString().padStart(2, "0") }} 
                                    </template>
                                </v-slider>
                                
                                <!--
                                    (Math.abs(Math.frac(sceneTime) * 60))
                                    .padStart(2, "0")
                                -->
                                
                                <div class="text--secondary" style="text-align: right; margin-top: 0px;"><i>You can <b>shift time with <kbd>N</kbd> and <kbd>M</kbd></b> keys</i></div>
                                
                                
                                <v-select v-model="viewerState.sceneSkybox" @change="skyboxChange" :items="skyBoxItems" label="Environment" ></v-select>
                                
                            </v-card-text>
                            
                            <!--
                                <v-card-text class="text-left">
                                    <v-btn @click="selectCameraOrbit" :disabled="viewerState.sceneSelectedMeshId === null" class="mx-2" dark color="primary"><v-icon dark>mdi-rotate-orbit</v-icon> Orbit</v-btn>
                                    <v-btn @click="selectCameraFree" class="mx-2" dark color="primary"><v-icon dark>mdi-axis-arrow</v-icon> Free</v-btn>
                                    <v-btn @click="selectCameraWalk" class="mx-2" dark color="primary"><v-icon dark>mdi-walk</v-icon> Walk</v-btn>
                                </v-card-text>
                            -->
                            
                            <v-card-text class="text-left">
                                
                                <v-slider v-model="viewerState.sceneTileDrawDistance" :lazy="true" @change="sceneTileDrawDistanceChange" thumb-label="always" show-ticks="always" step="1" min="0" :max="sceneTileDrawDistanceMax" ticks label="Draw Distance"></v-slider>
                                
                                <v-select v-model="viewerState.sceneGroundTextureOverrideKey" @change="groundTextureLayerChange" :items="groundTextureLayerItems" label="Ground texture override" ></v-select>
                                
                            </v-card-text>
                            
                            
                            <v-card-text class="text-left">
                                
                                <v-select v-model="viewerState.sceneTextureSet" @change="sceneTextureSetChange" :items="textureModeItems" label="Textures" ></v-select>
                                
                                <!--
                                    <v-select v-model="viewerState.sceneTileVariant" label="Dataset" style="margin-top: 2px;" :items="[
                                    {'value': null, 'text': 'Compressed (Default)'},
                                    {'value': 'uncompressed', 'text': 'Uncompressed (Better Quality, but Slower)'}
                                    ]"></v-select>
                                -->
                                
                                <!-- TODO: Use (sub)layers or "virtual layers" instead (?) : -->
                                <!--
                                    <v-checkbox
                                    'Show Instanced Items',
                                    'Show Texts (Static)'
                                    
                                    'Show Extra Ground Items',
                                    'Show Extra Building Items',
                                    
                                    'Dynamic Components',   // rotating things, analog clocks, animated things, other controllers (ddd:component...)...
                                    'Dynamic Components Texts'  // e.g. clocks / banners - dynamic text is managed by components, so they are needed
                                -->
                                
                                <!--
                                    <v-checkbox label="Items" disabled style="margin-top: 2px;"></v-checkbox>
                                -->
                                <v-checkbox v-model="viewerState.sceneShadowsEnabled" @change="sceneShadowsEnabledChange" label="Shadows" style="margin-top: 2px;"></v-checkbox>
                                
                                <!--
                                    <v-checkbox v-model="viewerState.sceneTextsEnabled" @change="sceneTextsEnabledChange" label="Texts" style="margin-top: 2px;"></v-checkbox>
                                -->
                                <!--<small>(Slow / High Mem)</small>-->
                                
                                <!--
                                    <v-checkbox v-model="viewerState.scenePostprocessingEnabled" @change="scenePostprocessingEnabledChange" label="Postprocessing" style="margin-top: 2px;"></v-checkbox>
                                -->
                            </v-card-text>
                            
                            <v-card-text class="text-left">
                                <div>
                                    <h3>Links</h3>
                                    
                                    <div><router-link to="/3d/layers">Layers</router-link></div>
                                    <div><router-link to="/3d/inspector">Inspector</router-link></div>
                                    
                                    <div v-if="viewerState.dddConfig.showDDDServerLinks"><router-link to="/dddserver/tasks">DDD Server- Tasks</router-link></div>
                                    <div v-if="viewerState.dddConfig.showDDDServerLinks"><router-link to="/dddserver/params">DDD Server - Params</router-link></div>
                                    
                                    <!--
                                        <div><a :href="osmLink" target="_blank">OpenStreetMap Object</a></div>
                                        <div><a :href="osmchaLink" target="_blank">OSMCha (Change Analyzer)</a></div>
                                    -->
                                    <div v-if="viewerState.dddConfig.showDevelLinks"><a :href="sceneLinkGoogleMaps" target="_blank">Google Maps View</a></div>
                                </div>
                            </v-card-text>
                            
                            <v-card-text class="text-left">
                                <v-btn @click="sceneFullScreen" class="mx-2" dark color="primary"><v-icon dark>mdi-fullscreen</v-icon> Fullscreen</v-btn>
                            </v-card-text>
                            
                        </div>
                        
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
</style>


<script>
import DDDScene from '@/components/ddd/DDDScene.vue';
import DDDSceneInsert from '@/components/ddd/DDDSceneInsert.vue';
import DDDPositionInfoPanel from '@/components/ddd/DDDPositionInfoPanel.vue';

export default {
    mounted() {
        
        window.addEventListener('resize', this.resize);
        this.resize();
        
        window.addEventListener('beforeunload', this.beforeUnload);
        
        this.$emit('dddViewerMode', 'scene');
        this.setMesh(this.viewerState.selectedMesh);
        
        if (!this.viewerState.selectedMesh) {
            let urlNodeId = this.$route.params.id;
            this.viewerState.sceneSelectedMeshId = urlNodeId;
        }
        
        window.dispatchEvent(new Event('resize'));
        
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('beforeunload', this.beforeUnload);
    },
    
    metaInfo() {
        return {
            title: this.$store.getters.appTitle,
            titleTemplate: `${this.$t('sceneTools.TITLE')} - %s`
        }
    },
    inject: [
    'getSceneViewer',
    ],
    data() {
        return {
            //name: this.$store.state.auth.user.name,
            //showVerifyDialog: !this.$store.state.verify.emailVerified
            //mesh: null,
            nodeId: this.$route.params.id,
            nodeName: null,
            metadata: {},
            loading: true,
            nodeGetter: () => { return this.viewerState.selectedMesh; },
            //x: new SceneViewer(),
            
            sceneTime: this.viewerState.positionDate.getHours(),
            isChangingTime: false,
            
            sceneTileDrawDistanceMax: this.dddConfig.sceneTileDrawDistanceMax || 3,
            
            skyBoxItems: [
            {value: '/textures/TropicalSunnyDay', text: 'Sunny'},
            {value: '/textures/skybox/clouds1/clouds1', text: 'Cloudy'},
            {value: '/textures/skybox', text: 'Overcast'},
            //{value: '/textures/skybox2', text: 'S2'},
            //{value: '/textures/skybox3', text: 'S3'},
            //{value: '/textures/skybox4', text: 'S4'},
            {value: '@dynamic', text: 'Dynamic Sky (slower)'},
            {value: null, text: 'None'},
            ]
        }
    },
    computed: {
        sortedMetadata: function () {
            this.viewerState.sceneSelectedMeshId;
            this.$route;  // force dependency on property
            let keys = Object.keys(this.metadata);
            keys = keys.filter((key) => { return ! (key.indexOf('_') === 0); });
            //keys = keys.filter((key) => { return (key.indexOf('osm:') === 0); });
            keys.sort();
            keys.sort((a, b) => { return (b.indexOf('osm:') - a.indexOf('osm:'));});
            return keys; // Do your custom sorting here
        },
        
        groundTextureLayerItems: function() {
            let result = [];
            
            result.push({value: null, text: 'None'});
            result.push({value: 'divider1', divider: true});
            
            for (let key in this.dddConfig.sceneGroundLayers) {
                result.push({value: key, text: this.dddConfig.sceneGroundLayers[key].text},)
            }
            return result;
        },
        
        textureModeItems: function() {
            let result = [];
            for (let conf of this.dddConfig.sceneMaterials) {
                result.push({value: conf.value, text: conf.text})
            }
            //result.push({value: 'divider1', divider: true});
            //result.push({value: null, text: 'None'});
            return result;
        },
        
        sceneLinkGoogleMaps: function() {
            this.$route;  // force dependency on property
            this.viewerState.sceneSelectedMeshId;
            let url = null;
            if (this.getSceneViewer()) {
                url = 'https://www.google.com/maps/' +  this.getSceneViewer().positionString() + '/data=!3m1!1e3';  // ?hl=es-ES
            }
            return url;
        },
        osmchaLink: function() {
            this.$route;  // force dependency on property
            this.viewerState.sceneSelectedMeshId;
            let url = null;
            if (this.metadata['osm:changeset']) {
                url = 'https://osmcha.org/changesets/' + this.metadata['osm:changeset'] + '/';
            }
            return url;
        },
        osmLink: function() {
            this.$route;  // force dependency on property
            this.viewerState.sceneSelectedMeshId;
            let url = null;
            if (this.metadata['osm:id']) {
                let element = this.metadata['osm:element'];
                let id = this.metadata['osm:id'].split("-")[1];
                url = 'https://www.openstreetmap.org/' + element + '/' + id;
            }
            return url;
        },
    },
    props: [
    'viewerState',
    ],
    watch: {
        '$route' () {
            this.setMesh(this.viewerState.selectedMesh);
        },
        'viewerState.sceneSelectedMeshId' () {
            this.$forceUpdate();
            this.setMesh(this.viewerState.selectedMesh);
            //if (! this.metadata['_updated']) {this.metadata['_updated'] = 0;}
            //this.metadata['_updated']++;
        },
        'viewerState.positionDateSeconds' () {
            if (!this.isChangingTime) {
                this.sceneTime = this.viewerState.positionDate.getHours() + this.viewerState.positionDate.getMinutes() / 60;
                this.$forceUpdate();
                //if (! this.metadata['_updated']) {this.metadata['_updated'] = 0;}
                //this.metadata['_updated']++;
            }
        }
    },
    
    components: {
        DDDScene,
        DDDSceneInsert,
        DDDPositionInfoPanel,
    },
    
    methods: {
        setMesh(mesh) {
            //this.mesh = mesh;
            if (!mesh) { return; }
            this.loading = false;
            this.nodeName = mesh.id.split("/").pop().replaceAll("_", " ");
            if (mesh.metadata && mesh.metadata.gltf && mesh.metadata.gltf.extras) {
                this.metadata = mesh.metadata.gltf.extras;
                if (this.metadata['osm:name']) {
                    this.nodeName = this.metadata['osm:name'];
                }
            }
            this.nodeGetter = () => { return this.viewerState.selectedMesh; };
            //console.debug("Scene Item setMesh called.");
        },
        
        resize() {
            let el = this.$el.querySelector('.v-card');
            //this.$el.style.height = '' + (window.innerHeight - 40) + 'px';
            el.style.minHeight = '' + (window.innerHeight - 38) + 'px';
        },
        
        beforeUnload() {
            //this.$router.push('/3d/' + this.getSceneViewer().positionString()).catch(()=>{});
        },
        
        
        selectCameraOrbit() {
            this.getSceneViewer().selectCameraOrbit();
        },
        selectCameraFree() {
            this.getSceneViewer().selectCameraFree();
        },
        selectCameraWalk() {
            this.getSceneViewer().selectCameraWalk();
        },
        
        sceneFullScreen() {
            this.getSceneViewer().showFullScreen();
        },
        
        removeNode() {
            //this.getViewerState().sceneViewer.selectMesh(node);
            let mesh = this.viewerState.selectedMesh;
            this.getSceneViewer().deselectMesh();
            mesh.setParent(null);
            mesh.dispose();
        },
        
        groundTextureLayerChange(key) {
            //console.debug("Setting ground texture: ", key);
            
            let url = null;
            const layers = this.viewerState.dddConfig.sceneGroundLayers;
            if ( key && layers[key]) {
                url = layers[key].url;
                this.$root.viewerAppState.sceneGroundTextureOverrideKey = key;
                this.getSceneViewer().groundTextureLayerSetUrl(url);
            } else {
                this.$root.viewerAppState.sceneGroundTextureOverrideKey = key;
                this.getSceneViewer().groundTextureLayerSetUrl(null);
            }
            
        },
        
        skyboxChange(value) {
            //console.debug("Changing skybox: ", value);
            this.getSceneViewer().loadSkybox(value);
        },
        
        sceneShadowsEnabledChange(value) {
            this.getSceneViewer().sceneShadowsSetEnabled(value);
        },
        sceneTextsEnabledChange(value) {
            this.getSceneViewer().sceneTextsSetEnabled(value);
        },
        scenePostprocessingEnabledChange(value) {
            this.getSceneViewer().scenePostprocessingSetEnabled(value);
        },
        
        sceneTextureSetChange(textureSetKey) {
            
            let textures = null;
            let splatmap = null;
            
            //console.debug("Setting viewer app texture set to: " + textureSetKey);
            
            const materialsConfigDef = this.viewerState.dddConfig.sceneMaterials.find((o) => { return o.value === textureSetKey; });
            if (materialsConfigDef) {
                textures = materialsConfigDef.textures;
                splatmap = materialsConfigDef.splatmap;
                localStorage.setItem( "dddSceneTextureSet", JSON.stringify(textureSetKey));
                this.$root.viewerAppState.sceneTextureSet = textureSetKey;
            }
            
            // TODO: This is currently not working without a restart (these settings are actually applied during DDDViewer creation)
            this.getSceneViewer().sceneTextureSet(textures, splatmap);
        },
        
        sceneTimeChange(value) {
            let currentDate = this.viewerState.positionDate;
            currentDate.setHours(parseInt(value));
            currentDate.setMinutes(parseInt((value - parseInt(value)) * 60));
            this.viewerState.positionDate = currentDate;
            this.viewerState.positionDateSeconds = this.viewerState.positionDate / 1000;
        },
        
        sceneTimeChangeStart(value) {
            this.isChangingTime = true;
        },
        
        sceneTimeChangeEnd(value) {
            this.isChangingTime = false;
        },
        
        sceneTileDrawDistanceChange(value) {
            this.getSceneViewer().viewerState.sceneTileDrawDistance = value;
        }
        
    },
    
}
</script>

