import { DDD3DLayer, GeoJson3DLayer } from "ddd-viewer";

function loadLayerViewer(sceneViewer, layerObject) {
    let dddLayer = null;
    if (layerObject.type === 'GeoJson3DLayer') {
        dddLayer = new GeoJson3DLayer(layerObject.key, JSON.parse(layerObject.data));
        sceneViewer.layerManager.addLayer(dddLayer);
    } else if (layerObject.type === 'DDD3DLayer') {
        dddLayer = new DDD3DLayer(layerObject.key);
        sceneViewer.layerManager.addLayer(dddLayer);
        dddLayer.loadData(layerObject.data);  // must be done after adding due to dependency :/
    } else {
        console.warn("Tried to create unknown layer type: " + layerObject.type);
    }
}

const actions = {

    saveLayers() {
        // Save only saveable layerds
        const saveableLayers = this.state.layers.layers.filter(layer => layer.save);
        const layers = JSON.stringify(saveableLayers);
        localStorage.setItem("dddLayers", layers);
    },

    loadLayers(context, sceneViewer) {
        // Do not load layers if they are already loaded
        if (this.state.layers.layers.length > 0) {
            return;
        }

        console.log("Loaded ddd-viewer-app layers: " + this.state.layers.layers);

        const layers = localStorage.getItem('dddLayers');

        this.state.layers.layers = layers ? JSON.parse(layers) : this.state.layers.layers;

        console.log(this.state.layers.layers);

        for (let i = 0; i < this.state.layers.layers.length; i++) {
            const layer = this.state.layers.layers[i];
            if (layer.visible) {
                context.dispatch('loadLayer', {sceneViewer: sceneViewer, layer: layer})
            }
        }
    },

    loadLayer(context, {sceneViewer, layer}) {
        const geoJsonLayerPoints = new GeoJson3DLayer(JSON.parse(layer.data));
        sceneViewer.layerManager.addLayer(layer.key, geoJsonLayerPoints);

        //Attributes
        const layerViewer = sceneViewer.layerManager.getLayer(layer.key);

        layerViewer.setColor(layer.color);
        layerViewer.setAltitudeOffset(layer.altitude);
        layerViewer.setVisible(layer.visible);

        return layerViewer
    },

    getViewerLayer(context, {sceneViewer, layer}) {
        let layerViewer = sceneViewer.layerManager.getLayer(layer.key)
        if (layerViewer === null) {
            layerViewer = context.dispatch('loadLayer', {sceneViewer: sceneViewer, layer: layer})
        }
        return layerViewer
    },

    addLayer(context, {sceneViewer, layerConfig, data}) {

        //const layerKey = `custom${this.state.layers.layers.length + 1}`; // FIXME This will not be unique if layers are removed
        const layerKey = layerConfig.key;

        const layerObject = {
            "key": layerKey,
            "type": layerConfig.type,
            "save": layerConfig.save,
            "label": layerConfig.label,
            "url": "",
            "visible": true,
            "color": "#ff00ff",
            "altitude": 60,
            "data": null
        };

        layerObject.data = data;

        this.state.layers.layers.push(layerObject);
        context.dispatch('saveLayers');

        loadLayerViewer(sceneViewer, layerObject);

    },

    deleteLayer(context, layer) {
        const key = layer.key;

        const layersNew = this.state.layers.layers.filter(e => key !== e.key)

        context.commit('setLayers', layersNew)

        context.dispatch('saveLayers')
    },

    updateName(context, layer) {
        const existingLayer = this.state.layers.layers.find(e => layer.key === e.key)
        existingLayer.label = layer.label

        context.commit(this.state.layers.layers)
    }
}

const mutations = {
    setLayers(state, layers) {
        state.layers = layers
    }
}


const state = {
    layers: []
}

export default {
    state,
    actions,
    mutations
}
