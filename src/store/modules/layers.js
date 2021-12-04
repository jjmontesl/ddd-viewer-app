import { DDD3DLayer, GeoJson3DLayer, OverlayLayer } from "ddd-viewer";

function loadLayerViewer(sceneViewer, layerObject) {
    let dddLayer = null;
    if (layerObject.type === 'GeoJson3DLayer') {
        dddLayer = new GeoJson3DLayer(layerObject.key, JSON.parse(layerObject.data));
        sceneViewer.layerManager.addLayer(dddLayer);

        dddLayer.setColor(layerObject.color);
        dddLayer.setAltitudeOffset(layerObject.altitude);
        dddLayer.setVisible(layerObject.visible);

    } else if (layerObject.type === 'DDD3DLayer') {
        dddLayer = new DDD3DLayer(layerObject.key);
        sceneViewer.layerManager.addLayer(dddLayer);
        dddLayer.loadData(layerObject.data);  // must be done after adding due to dependency :/

    } else if (layerObject.type === 'OverlayLayer') {
        dddLayer = new OverlayLayer(layerObject.key, layerObject.data.sourceLayer);
        sceneViewer.layerManager.addLayer(dddLayer);

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
        console.debug("Loaded layers state: ", this.state.layers.layers);

        for (let i = 0; i < this.state.layers.layers.length; i++) {
            const layer = this.state.layers.layers[i];
            if (layer.visible) {
                context.dispatch('loadLayer', {sceneViewer: sceneViewer, layerObject: layer})
            }
        }
    },

    loadLayer(context, {sceneViewer, layerObject}) {
        loadLayerViewer(sceneViewer, layerObject);
    },

    getViewerLayer(context, {sceneViewer, layer}) {
        let layerViewer = sceneViewer.layerManager.getLayer(layer.key)
        if (layerViewer === null) {
            layerViewer = context.dispatch('loadLayer', {sceneViewer: sceneViewer, layerObject: layer})
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

    updateLayer(context, layer) {
        const existingLayer = this.state.layers.layers.find((e) => layer.key === e.key )
        this.editedItem = Object.assign(existingLayer, layer)
        context.commit('setLayers', this.state.layers.layers)
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
