import { GeoJson3DLayer } from "ddd-viewer";

const actions = {
    saveLayers() {
        const layers = JSON.stringify(this.state.layers.layers);
        localStorage.setItem("dddLayers", layers);
    },

    loadLayers(context, sceneViewer) {
        if (this.state.layers.layers !== null) {
            return;
        }
        console.log(this.state.layers.layers);

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

    addLayer( context, {fileData, fileName, sceneViewer} ) {
        function createLayerObject(layerKey, label) {
            return {
                "key": layerKey,
                "label": label,
                "url": "",
                "visible": true,
                "color": "#ff00ff",
                "altitude": 60,
                "data": null
            };
        }

        const fileObject = JSON.parse(fileData);
        const layerKey = `custom${this.state.layers.layers.length + 1}`; // FIXME This will not be unique if layers are removed
        const layerObject = createLayerObject(layerKey, `Custom: ${fileName}`);

        layerObject.data = fileData;

        this.state.layers.layers.push(layerObject);
        context.dispatch('saveLayers')

        const geoJsonLayerPoints = new GeoJson3DLayer(fileObject);
        sceneViewer.layerManager.addLayer(layerKey, geoJsonLayerPoints);
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
    layers: null
}

export default {
    state,
    actions,
    mutations
}
