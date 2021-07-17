<template>

    <div style="width: 100%; position: relative; z-index: 0; text-align: left;" id="ddd-scene-parent" class="ddd-scene-parent">

        <canvas class="ddd-scene" id="ddd-scene" style="width: 100%; outline:none; height: 100%;">
        </canvas>

        <div class="ddd-scene-overlay" id="ddd-scene-overlay" style="width: 100%; height: 100%; position: absolute; z-index: 2; top: 0px; pointer-events: none;">

            <div v-if="viewerState.sceneTitleText" id="ddd-scene-overlay-text-title" style="white-space: pre-line; line-height: 130%; text-align: center; font-size: 150%; color: white; z-index: 10; bottom: 20%; width: 100%; font-outline: 1px black; position: absolute; text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;"><h2>{{ viewerState.sceneTitleText }}</h2></div>

            <SceneViewMode v-if="viewerState.sceneVisible && viewerState.sceneViewModeShow" :viewerState="viewerState" />

        </div>

    </div>

</template>

<script>

import { SceneViewer } from 'ddd-viewer';
import { GeoTile3DLayer } from 'ddd-viewer';
import { ViewerProcess } from 'ddd-viewer';
import { DDDObjectRef } from 'ddd-viewer';

import SceneViewMode from '@/components/scene/SceneViewMode.vue';

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  components: {
      SceneViewMode,
  },
  data() {
    return {
    }
  },
  props: [
      'viewerState',
  ],
  inject: [
      'setSceneViewer',
  ],

  beforeDestroy() {
      //console.debug("Disposing BabylonJS scene.");
      window.removeEventListener('resize', this.resize);
      clearTimeout(this._timeout);
      this.sceneViewer.dispose();
      this.viewerState.sceneViewer = null;
      this.sceneViewer = null;
  },

  mounted() {
    //console.debug('Creating 3D scene.');

    this.sceneParent = this.$el; // .querySelector('.ddd-scene-parent');

    const height = window.innerHeight - 40;
    //console.debug("Resizing 3D canvas: " + height);
    if (this.$el) {
        this.$el.querySelector('.ddd-scene').style.height = height + "px";
        if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        //this.map.updateSize();
    }


    let textures = null;
    let splatmap = null;
    const materialsConfigDef = this.viewerState.dddConfig.sceneMaterials.find((o) => { return o.value === this.viewerState.sceneTextureSet; });
    if (materialsConfigDef) {
        textures = materialsConfigDef.textures;
        splatmap = materialsConfigDef.splatmap;
    }

    console.info("Initializing DDDViewer (defaultCoords=" + this.viewerState.positionWGS84 + ")");

    const dddConfig = {
        "defaultCoords": this.viewerState.positionWGS84,

        "tileUrlBase": this.viewerState.dddConfig.tileUrlBase,
        "assetsUrlbase": "/assets/",

        "materialsTextureSet": textures,
        "materialsSplatmap": splatmap,

        "geolocation": false
        // TODO: move to viewer-app?
        //"dddHttpApiUrlBase": "https://{{hostname}}:8000/api/",
    }

    // Initialize DDDViewer
    const canvas = document.getElementById('ddd-scene');
    this.sceneViewer = new SceneViewer(canvas, dddConfig);
    this.setSceneViewer(this.sceneViewer);  // Set the reference to App so it can be accessed by other components

    const layerDddOsm3d = new GeoTile3DLayer();
    this.sceneViewer.layerManager.addLayer("ddd-osm-3d", layerDddOsm3d);

    // Set camera from ViewerAppState (ie. if set from URL or otherwise)
    this.sceneViewer.viewerState.positionHeading = this.$root.viewerAppState.positionHeading;
    this.sceneViewer.viewerState.positionTilt = this.$root.viewerAppState.positionTilt;
    this.sceneViewer.viewerState.positionGroundHeight = this.$root.viewerAppState.positionGroundHeight;
    // Forces camera repositioning according to sceneViewer.viewerState
    // TODO: Provide a setCameraPosition/target, once Cameras are refactored
    // NOTE: this causes an initial camera change, which can make other bugs surface (eg. wrong shadows if shadowGenerator.autoCalcDepthBounds is true)
    this.sceneViewer.selectCameraFree();

    // Hook a callback to DDDViewer to update state.
    const that = this;
    class DDDSceneProcess extends ViewerProcess {
        update(deltaTime) {
            super.update(deltaTime);
            that.viewerState.positionWGS84 = that.sceneViewer.viewerState.positionWGS84;
            that.viewerState.positionScene = that.sceneViewer.viewerState.positionScene;
            that.viewerState.positionGroundHeight = that.sceneViewer.viewerState.positionGroundHeight;
            that.viewerState.positionHeading = that.sceneViewer.viewerState.positionHeading;
            that.viewerState.positionTileZoomLevel = that.sceneViewer.viewerState.positionTileZoomLevel;
            that.viewerState.positionName = that.sceneViewer.viewerState.positionName;

            that.viewerState.sceneFPS = that.sceneViewer.viewerState.sceneFPS;
            that.viewerState.sceneDrawCalls = that.sceneViewer.viewerState.sceneDrawCalls;
            that.viewerState.sceneTriangles = that.sceneViewer.viewerState.sceneTriangles;

            that.viewerState.positionDate = that.sceneViewer.viewerState.positionDate;
            that.viewerState.positionDateSeconds = that.sceneViewer.viewerState.positionDateSeconds;

            that.viewerState.sceneMoveSpeed = that.sceneViewer.viewerState.sceneMoveSpeed;

            that.viewerState.sceneTitleText = that.sceneViewer.viewerState.sceneTitleText;

            that.viewerState.sceneSelectedMeshId = that.sceneViewer.viewerState.sceneSelectedMeshId;
        }
    }
    this.sceneViewer.processes.add(new DDDSceneProcess(this.sceneViewer));

    // Events
    window.addEventListener('resize', this.resize);

    // Filter drag event for clicks
    let drag = false;
    canvas.addEventListener('pointerdown', () => {drag = false;});
    canvas.addEventListener('pointermove', () => {drag = true;});
    canvas.addEventListener('pointerup', (ev) => { if (!drag) { ev.preventDefault(); that.click(); } } );
    //canvas.addEventListener('click', () => { that.click(); } );

    //canvas.addEventListener('keydown', (e) => { if (e.keyCode === 16) { that.cycleMoveSpeed(); } });
    canvas.addEventListener('keyup', (e) => { if (e.keyCode === 16) { that.cycleMoveSpeed(); } });

    let timeSkipIntervalSec = 30 * 60;
    canvas.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'N') { that.cycleTime(-timeSkipIntervalSec); } });
    canvas.addEventListener('keyup', (e) => { if (String.fromCharCode(e.which) === 'M') { that.cycleTime(timeSkipIntervalSec); } });

    this._timeout = setTimeout(this.checkUpdateHref, 1500);

    // Resize initially
    //setTimeout(() => { this.resize(); }, 100);
    //this.sceneViewer.engine.resize();
    this.resize();

  },

  methods: {

      checkUpdateHref: function() {

          // Check movement and camera are stopped

          // Update route
          const posString = this.sceneViewer.positionString();

          if (posString !== null) {

              localStorage.setItem('dddLastPositionString', posString);

              //this.$router.replace('/maps/' + posString);
              if (this.$route.name === 'sceneMain') {
                  this.$router.replace('/3d/' + posString).catch(()=>{});
              } else if (this.$route.name === 'scenePos') {
                  this.$router.replace('/3d/pos/' + posString).catch(()=>{});
              } else if (this.$route.name === 'sceneItem')  {
                  this.$router.replace('/3d/item/' + this.$route.params.id + '/' + posString).catch(()=>{});
              }
          }

          // Check if projection center is too far away
          if (Math.abs(this.sceneViewer.viewerState.positionScene[0]) > 50000 ||
              Math.abs(this.sceneViewer.viewerState.positionScene[2]) > 50000) {
             // TODO: Recreate or recenter the scene viewer
             alert('Reloading scene. Please be patient.');
             this.$router.go(this.$router.currentRoute);
             return;
          }

          this._timeout = setTimeout(this.checkUpdateHref, 1500);

      },

      cycleMoveSpeed: function() {
          this.sceneViewer.cycleMoveSpeed();
      },

      resize: function() {

        //console.debug("Resizing DDDScene.");
        if (!this.sceneParent) { return; }

        let panel = document.querySelector('.ddd-front .row div');
        //let panel = this.$refs.dddViewPanel;

        // Do not resize (overlay):
        // TODO: Restore (removed during migration to TS)
        let overlay = false; // (this.sceneViewer.sequencer.playing);
        //if (overlay) { return; }


        let width = null;
        let height = window.innerHeight;
        if (this.sceneParent.parentNode.id === 'ddd-scene-insert') {
            width = this.sceneParent.parentNode.clientWidth;
            height = this.sceneParent.parentNode.clientHeight;
        } else {
            width = document.body.clientWidth - ((panel && !overlay) ? panel.offsetWidth : 0);
            height = window.innerHeight - 40;
        }

        let el = this.sceneParent.querySelector('.ddd-scene');
        if (el) {
            //console.debug("Resizing scene: " + width + " " + height);
            //el.style.height = parseInt(height / this.viewerState.sceneViewportRescale) + "px";
            //el.style.width = parseInt(width / this.viewerState.sceneViewportRescale) + "px";
            //el.width = parseInt(width / this.viewerState.sceneViewportRescale);
            //el.height = parseInt(height / this.viewerState.sceneViewportRescale);
            //this.sceneViewer.engine.resize(true);
            el.style.height = (height) + "px";
            el.style.width = (width) + "px";

            el.width = width;
            el.height = height;
            this.sceneViewer.engine.setHardwareScalingLevel(this.viewerState.sceneViewportRescale);
            this.sceneViewer.engine.resize();
        }

        let elOverlay = this.sceneParent.querySelector('.ddd-scene-overlay');
        if (elOverlay) {
            //console.debug("Resizing scene: " + width + " " + height);
            //el.style.height = height + "px";
            elOverlay.style.height = height + "px";
            elOverlay.style.width = width + "px";
        }

        //this.sceneViewer.engine.resize(true);
      },

      cycleTime: function(seconds) {
            this.sceneViewer.viewerState.positionDate.setSeconds(this.sceneViewer.viewerState.positionDate.getSeconds() + seconds);
            this.sceneViewer.viewerState.positionDateSeconds = this.sceneViewer.viewerState.positionDate / 1000;
            this.sceneViewer.lightSetupFromDatePos();
      },

      click: function() {

        if (! this.viewerState.scenePickingEnabled) { return; }

        // Easy way of computing dragging (still clicks if mouse is stopped before button release
        if (this.sceneViewer.camera.inertialAlphaOffset || this.sceneViewer.camera.inertialBetaOffset) {
            return;
        }

        const pickResult = this.sceneViewer.scene.pick(this.sceneViewer.scene.pointerX, this.sceneViewer.scene.pointerY);

        //console.debug("Scene click: " + pickResult.pickedMesh.id);
        //console.log(pickResult.pickedMesh.id);
        //console.log(pickResult);

        // Direct to /3d/mesh/
        //const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
        //const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);
        //const posString = this.positionString();

        if (!pickResult.pickedMesh || pickResult.pickedMesh.id === "skyBox") {
            this.$router.push('/3d/pos/').catch(()=>{});
            return;
        } else {
            //console.debug("Pick result (click): ", pickResult);
            const objectRef = DDDObjectRef.fromMeshFace(pickResult.pickedMesh, pickResult.faceId);
            console.debug("Pick result (objectref metadata): ", objectRef.getMetadata());
            this.sceneViewer.selectObject(objectRef);
            //this.sceneViewer.selectMesh(pickResult.pickedMesh, true);

            // Route to Object detail view
            this.$router.push('/3d/item/' + objectRef.getUrlId() + '/' + this.sceneViewer.positionString()).catch(()=>{} );

            return;
        }
    }


  }

}
</script>
