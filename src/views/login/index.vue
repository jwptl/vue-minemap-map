<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();

const loginForm = ref({
  username: "",
  password: "",
});

const loading = ref(false);

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning("请输入用户名和密码");
    return;
  }
  loading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (loginForm.value.username === 'admin' && loginForm.value.password === '123') {
      userStore.setToken('mock-token-admin');
      userStore.setUserInfo({
        id: 1,
        username: 'admin',
        name: '管理员'
      });
      ElMessage.success("登录成功");
      router.push("/map");
    } else {
      ElMessage.error("用户名或密码错误，默认账号：admin / 123");
    }
  } catch (error) {
    console.error("Login error:", error);
    ElMessage.error("登录失败，请重试");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="title">mineMap 地图系统</h2>
      <el-form class="login-form" :model="loginForm">
        <el-form-item>
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            style="width: 100%"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        <div class="tip">
          默认账号：admin / 123
        </div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .login-container {
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

    .title {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 24px;
      font-weight: 600;
    }

    .login-form {
      .el-form-item {
        margin-bottom: 20px;
      }
      
      .tip {
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
