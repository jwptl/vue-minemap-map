import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    mapInstance: null,
    currentCenter: [118.799565, 32.093502],
    currentZoom: 10,
    loadedLayers: [],
    selectedFeature: null
  }),
  actions: {
    setMapInstance(map) {
      this.mapInstance = map
    },
    setCurrentCenter(center) {
      this.currentCenter = center
    },
    setCurrentZoom(zoom) {
      this.currentZoom = zoom
    },
    addLoadedLayer(layerId) {
      if (!this.loadedLayers.includes(layerId)) {
        this.loadedLayers.push(layerId)
      }
    },
    removeLoadedLayer(layerId) {
      this.loadedLayers = this.loadedLayers.filter(id => id !== layerId)
    },
    setSelectedFeature(feature) {
      this.selectedFeature = feature
    },
    clearMapStore() {
      this.mapInstance = null
      this.loadedLayers = []
      this.selectedFeature = null
    }
  }
})
