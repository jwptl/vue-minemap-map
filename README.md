# mineMap 地图 Vue 项目框架

基于 Vue 3 + Vite 开发的 mineMap 地图集成项目框架，包含完整的项目架构、权限管理、API 请求封装等。

## 📋 项目简介

这是一个集成了 **mineMap 天地图** 的 Vue 3 项目框架，适用于需要展示地图、GIS 相关功能的前端项目。

## ✨ 特性

- 🗺️ **mineMap 集成** - 内置 mineMap v4.9.0，开箱即用
- ⚡ **Vue 3 + Vite** - 快速开发，热更新
- 🧭 **Vue Router 4** - 路由权限管理
- 📦 **Pinia** - 状态管理
- 🔐 **登录权限** - 完整的登录认证流程（默认账号 admin/123）
- 🌐 **Axios 封装** - 请求/响应拦截器，统一错误处理
- 🎨 **Element Plus** - UI 组件库
- 🔧 **自定义 Hooks** - `useMap` 封装了常用地图操作
- 📁 **清晰目录结构** - 按功能模块划分，便于维护

## 📁 项目结构

```
src/
├── api/              # API 接口层
│   ├── login.js      # 登录相关接口
│   └── map.js        # 地图相关接口
├── assets/           # 静态资源
├── components/       # 公共组件
├── hooks/            # 自定义 Hooks
│   └── useMap.js     # mineMap 地图初始化 Hook
├── layout/           # 布局组件
│   └── MainLayout.vue
├── router/           # 路由配置
│   └── index.js
├── store/            # Pinia 状态管理
│   └── modules/
│       ├── user.js   # 用户状态
│       └── map.js    # 地图状态
├── utils/            # 工具函数
│   ├── request.js   # axios 拦截器配置
│   └── index.js      # 通用工具
├── views/            # 页面视图
│   ├── login/        # 登录页
│   ├── home/         # 地图页
│   └── error/        # 404 页
├── App.vue
└── main.js
```

## 🚀 快速开始

### 环境要求

- Node.js 16+
- pnpm / npm / yarn

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 配置

1. 在 `.env.development` 或 `.env.production` 中配置你的 mineMap Key:

```bash
VITE_MINEMAP_KEY = 你的mineMap密钥
VITE_MINEMAP_SOLUTION = 11001
```

2. 修改后端接口地址:

```bash
VITE_PROXYURL = http://你的后端地址
```

### 开发启动

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
```

## 🗺️ useMap Hook 使用示例

```javascript
import { ref, onMounted } from 'vue'
import { useMap } from '@/hooks/useMap'

const mapRef = ref(null)
let map

onMounted(() => {
  map = useMap({
    containerId: mapRef.value,
    center: [118.799565, 32.093502],
    zoom: 10
  })

  map.on('load', () => {
    console.log('地图加载完成')
  })

  map.on('click', (e) => {
    console.log('点击坐标:', e.lngLat)
  })
})
```

### 可用方法

| 方法 | 说明 |
|------|------|
| `getInstance()` | 获取原始 mineMap 实例 |
| `on(eventName, callback)` | 添加事件监听 |
| `off(eventName, callback)` | 移除事件监听 |
| `flyTo(center, zoom)` | 飞行动画到指定位置 |
| `panTo(center)` | 平滑移动到指定位置 |
| `setZoom(zoom)` | 设置缩放级别 |
| `getZoom()` | 获取当前缩放级别 |
| `getCenter()` | 获取当前中心点 |
| `addLayer(layer)` | 添加图层 |
| `removeLayer(layerId)` | 移除图层 |
| `addSource(sourceId, source)` | 添加数据源 |
| `removeSource(sourceId)` | 移除数据源 |
| `queryRenderedFeatures(geometry, options)` | 查询要素 |

## 🔐 默认登录账号

| 用户名 | 密码 |
|--------|------|
| admin | 123 |

对接后端接口后，可在 `src/views/login/index.vue` 中修改为调用真实接口。

## 📝 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| VITE_PROXYURL | 后端代理地址 | `http://localhost:8080` |
| VITE_BASE_API | API 基础路径 | `/api` |
| VITE_MINEMAP_KEY | mineMap 密钥 | `your_key` |
| VITE_MINEMAP_SOLUTION | mineMap 方案 ID | `11001` |
| VITE_MINEMAP_STYLE | 地图样式 URL | `https://service.minedata.cn/map/solu/style/11001` |
| VITE_DEFAULT_CENTER_LNG | 默认中心点经度 | `118.799565` |
| VITE_DEFAULT_CENTER_LAT | 默认中心点纬度 | `32.093502` |
| VITE_DEFAULT_ZOOM | 默认缩放级别 | `10` |

## 🧩 技术栈

- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Vue Router 4](https://router.vuejs.org/) - Vue.js 官方路由
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [Element Plus](https://element-plus.org/) - 基于 Vue 3 的组件库
- [Axios](https://axios-http.com/) - HTTP 客户端
- [mineMap](https://www.minedata.cn/) - 智图地图

## 📄 许可证

MIT
