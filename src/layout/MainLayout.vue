<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="main-layout">
    <div class="layout-content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .layout-content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
