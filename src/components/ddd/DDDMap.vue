<template>

    <div style="height: 400px; position: relative; z-index: 0;" id="ddd-map-parent" class="ddd-map-parent">
        <div class="ddd-map" id="ddd-map" style="height: 400px; position: relative; z-index: -1;">
        </div>

        <div class="ddd-map-overlay" id="ddd-map-overlay" style="width: 100%; height: 100%; position: absolute; z-index: 2; top: 0px; pointer-events: none;">

        <DDDMap3DSwitch />
        <DDDSearch v-if="viewerState.sceneVisible || viewerState.mapVisible"/>
        </div>

    </div>

</template>

<script>
import 'ol/ol.css';
import * as olProj from 'ol/proj';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';
import TileLayer from 'ol/layer/Tile';
import {Tile, Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {createXYZ, extentFromProjection} from 'ol/tilegrid.js';
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import DDDMap3DSwitch from '@/components/ddd/DDDMap3DSwitch.vue';
import DDDSearch from '@/components/ddd/DDDSearch.vue';

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

  components: {
    DDDMap3DSwitch,
    DDDSearch
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
    //console.debug("Destroying map.");

    window.removeEventListener('resize', this.resize);

    this.map.un('singleclick', this.click);
    this.map.un('moveend', this.move);
    this.map.setTarget(null);
    this.map = null;

  },

  created() {
    //console.warn("TODO: Setting dddMap attribute on $root.viewerAppState directly. Use a setMapViewer-like approach as in DDDScene.");
    this.$root.viewerAppState.dddMap = this;
  },

  mounted() {

    this.mapParent = this.$el; // .querySelector('.ddd-scene-parent');


    //const el = that.$el.querySelector('.ddd-map');
    //el.style.height = "calc(100%)";

    const scaleLine = new ScaleLine({
      units: 'metric',
    });

    // CAPA DE ICONOS



    this.mapMarkersLayer = new VectorLayer({
      source: new VectorSource({
        features: [],
      }),
    });


    this.map = new Map({
      controls: defaultControls().extend([scaleLine]),
      layers: [

        new TileLayer({
          source: new OSM({
          }),
          maxZoom: 19
        }),

        new TileLayer({
             source: new XYZ({
                 url: this.viewerState.dddConfig.tileUrlBase + '{z}/{x}/{y}.png',
             }),
            minZoom: 16.6,
            maxZoom: 17.4,
        }),

        new TileLayer({
          source: new TileDebug({
          }),
          minZoom: 16.6,
          maxZoom: 17.4
        }),

        this.mapMarkersLayer
      ],



      target: 'ddd-map',
      view: new View({
        center: olProj.transform( this.$root.viewerAppState.positionWGS84, 'EPSG:4326', 'EPSG:3857'),
        zoom: this.$root.viewerAppState.positionTileZoomLevel,
        maxZoom: 18,
        rotation: 0, // -that.viewerState.positionHeading * Math.PI / 180.0,
      }),
    });



    const map = this.map;

    // Events
    map.on('singleclick', this.click);
    map.on("moveend", this.move);
    window.addEventListener('resize', this.resize);

    // Resize initially
    //setTimeout(() => { that.resize(); }, 100);
    this.resize();

  },

  methods: {

      resize: function() {
        /*
        //console.debug("Resizing map: " + height);
        this.$el.querySelector('.ddd-map').style.height = height + "px";
        if (this.$el.querySelector('canvas')) { this.$el.querySelector('canvas').height = height; }
        this.map.updateSize();
        */

        console.debug("Resizing DDDMap.");
        if (!this.mapParent) { return; }

        let panel = document.querySelector('.ddd-front .row div');
        //let panel = this.$refs.dddViewPanel;

        // Do not resize (overlay):
        // TODO: Restore (removed during migration to TS)
        let overlay = false; // (this.sceneViewer.sequencer.playing);
        //if (overlay) { return; }


        let width = null;
        let height = window.innerHeight;
        if (this.mapParent.parentNode.id === 'ddd-map-insert') {
            width = this.mapParent.parentNode.clientWidth;
            height = this.mapParent.parentNode.clientHeight;
        } else {
            width = document.body.clientWidth - ((panel && !overlay) ? panel.offsetWidth : 0);
            height = window.innerHeight - 40;
        }

        let el = this.$el.querySelector('.ddd-map');
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
            this.map.updateSize();
        }

        let elOverlay = this.$el.querySelector('.ddd-map-overlay');
        if (elOverlay) {
            //console.debug("Resizing scene: " + width + " " + height);
            //el.style.height = height + "px";
            elOverlay.style.height = height + "px";
            elOverlay.style.width = width + "px";
        }

      },

      getMap: function() {
        return this.map;
      },

      positionWGS84: function() {
        const extent = this.map.getView().calculateExtent(this.map.getSize());
        let point = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        point = olProj.transform(point, 'EPSG:3857', 'EPSG:4326');
        return point;
      },

      positionString: function() {
        const point = this.positionWGS84();
        const zoom = this.map.getView().getZoom();
        const posString = "@" + point[1].toFixed(7) + "," + point[0].toFixed(7) + "," + zoom.toFixed(1) + "z";
        return posString;
      },

      move: function(event) {

        //console.debug(event);
        //console.debug(this.positionWGS84());

        const posString = this.positionString();

        if (this.$route.name === 'mapMain') {
            this.$router.replace('/maps/' + posString).catch(()=>{});
        } else if (this.$route.name === 'mapPlace')  {
            this.$router.replace('/maps/place/' + this.$route.params.name + '/' + posString).catch(()=>{});
        }

        //that.$emit('dddPosition', 4.positionWGS84(), this.map.getView().getZoom());

        this.$root.viewerAppState.positionWGS84 = this.positionWGS84();
        this.$root.viewerAppState.positionTileZoomLevel = this.map.getView().getZoom();
        this.$root.viewerAppState.positionHeading = - this.map.getView().getRotation() * 180.0 / Math.PI;
        this.$root.viewerAppState.positionTilt = 0.01;
        this.$root.viewerAppState.positionGroundHeight = 150.0;

        this.map.once('rendercomplete', () => {

            const image = this.exportImage();
            const switchEl = document.getElementById('ddd-map-3d-switch');
            if (switchEl) {
                switchEl.style.backgroundColor = '#ffffff';
                const canvas = document.getElementById('ddd-map-3d-switch');
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                canvas.getContext('2d').drawImage(image.canvas, 0, 0, canvas.width, canvas.height);
            }

        });

      },

      click: function(event) {
          //console.debug("Map click: " + event.coordinate);

          // Redirect to appropriate click handler

          // Direct to /map/place
          const point = olProj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
          const pointString = point[1].toFixed(7) + "," + point[0].toFixed(7);

          const posString = this.positionString();

          this.$router.push('/maps/search/' + pointString + '/' + posString).catch(()=>{});

      },

      exportImage: function() {
        const map = this.map;

        const mapCanvas = document.createElement('canvas');
        const size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        const mapContext = mapCanvas.getContext('2d');
        Array.prototype.forEach.call(
          document.querySelectorAll('.ol-layer canvas'),
          (canvas) => {
            if (canvas.width > 0) {
              const opacity = canvas.parentNode.style.opacity;
              mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
              const transform = canvas.style.transform;
              // Get the transform parameters from the style's transform matrix
              const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
              // Apply the transform to the export map context
              CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
              mapContext.drawImage(canvas, 0, 0);
            }
          }
        );
        //console.debug(mapContext);

        return mapContext;

      }

  },

}

</script>
