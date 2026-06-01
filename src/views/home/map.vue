<template>
  <div class="map-container">
    <div class="map" ref="mapRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMap } from "@/hooks/useMap";

const mapRef = ref()
const mapInstance = ref()

onMounted(() => {
  mapInstance.value = useMap({
    containerId: mapRef.value
  })

  mapInstance.value.on('load', () => {
    console.log('mineMap 地图加载成功')
  })
})
</script>

<style scoped lang="scss">
.map-container {
  width: 100%;
  height: 100%;
  position: relative;

  .map {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
}
</style>