import { GeoJson3DLayer } from "ddd-viewer";

export default class LayerManagerApp {
    viewerState = null;
    layers = [
        // { "key": "test-geojson-points", "label": "Example GeoJSON Points", "url": "", "visible": true, },
        //{ "key": "test-geojson-lines", "label": "Example GeoJSON Lines", "url": "", "visible": true },
        //{ "key": "test-geojson-madrid-transport", "label": "Madrid Transport", "url": "", "visible": true },
    ];

    constructor( viewerState ) {
        this.viewerState = viewerState;

        // Load layers on localstorage
        this.loadLayers();
    }

    saveLayers() {
        const layers = JSON.stringify(this.layers);
        localStorage.setItem("dddLayers", layers);
    }

    loadLayers() {
        const layers = localStorage.getItem('dddLayers');
        this.layers = layers ? JSON.parse(layers) : this.layers;
    }

    layerObject(layerKey, label) {
        return {
            "key": layerKey,
            "label": label,
            "url": "",
            "visible": true,
            "color": "#ff00ff",
            "altitude": 60
        };
    }

    addLayer( fileData, fileName, sceneViewer ) {
        const fileObject = JSON.parse(fileData);
        const layerKey = `custom${this.layers.length + 1}`; // FIXME This will not be unique if layers are removed
        const layerObject = this.layerObject(layerKey, `Custom: ${fileName}`);

        this.layers.push(layerObject);
        this.saveLayers();

        const geoJsonLayerPoints = new GeoJson3DLayer(fileObject);
        sceneViewer.layerManager.addLayer(layerKey, geoJsonLayerPoints);
    }
}
