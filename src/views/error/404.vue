<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1 class="code">404</h1>
      <p class="desc">页面未找到</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;

  .content {
    text-align: center;

    .code {
      font-size: 120px;
      color: #409eff;
      margin: 0;
    }

    .desc {
      font-size: 16px;
      color: #666;
      margin: 16px 0 24px;
    }
  }
}
</style>
