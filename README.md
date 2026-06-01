# mineMap 地图项目

Vue 3 + Vite，集成了 mineMap v4.9.0 的地图前端项目。

## 技术栈

Vue 3 / Vite / Vue Router 4 / Pinia / Element Plus / Axios / mineMap v4.9.0

## 跑起来

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## 环境变量

看 `.env.development`，核心配置在这几行：

```env
VITE_MINEMAP_DOMAIN = //111.50.130.153:10873
VITE_MINEMAP_SERVER_DOMAIN = http://111.50.130.153:10873/
VITE_MINEMAP_CDN = http://111.50.130.153:10873/minemapapi/minemap-CDN
VITE_MINEMAP_KEY = 4c27c22a8765405a80121eb75387ad3b
VITE_MINEMAP_SOLUTION = 1510940573904695296
VITE_MINEMAP_STYLE = http://111.50.130.153:10873/map/solu/style/11001
VITE_DEFAULT_CENTER_LNG = 107.29945
VITE_DEFAULT_CENTER_LAT = 38.0187
VITE_DEFAULT_ZOOM = 8
```

变量名见名知意，不解释了。换环境改 `.env.production`。

## 目录

```
src/
├── api/            # 接口
├── hooks/          # useMap 在这儿
├── layout/         # MainLayout
├── router/         # 路由，含 token 守卫
├── store/          # Pinia，user / map 两个 module
├── utils/          # request.js（axios 封装）、工具函数
├── views/          # login / map / 404
├── App.vue
└── main.js
```

## useMap

地图初始化和操作全封装在 `src/hooks/useMap.js`，直接用就行：

```js
import { useMap } from '@/hooks/useMap'

const map = useMap({
  containerId: mapRef.value,
  center: [107.29945, 38.0187],
  zoom: 8
})

map.on('load', () => {
  console.log('loaded')
})

map.flyTo([116.4074, 39.9042], 14)
const instance = map.getInstance()
```

返回值：

| 方法 | 干啥的 |
|------|--------|
| getInstance() | 拿原生 mineMap 实例 |
| on / off | 事件绑定 / 解绑 |
| flyTo(center, zoom) | 飞到指定位置 |
| panTo(center) | 平移 |
| setZoom / getZoom | zoom 读写 |
| getCenter() | 拿当前中心点 |
| addLayer / removeLayer | 图层增删 |
| addSource / removeSource | 数据源增删 |
| queryRenderedFeatures | 查询要素 |

## 登录

当前写死的 mock 登录，`admin / 123`。代码在 `src/views/login/index.vue`，接后端的时候把 `handleLogin` 里的 mock 逻辑换成调接口就行。

路由守卫在 `src/router/index.js`，没 token 自动跳登录页。

## 构建

```bash
pnpm build
pnpm preview     # 本地预览构建产物
```

## 坑

- mineMap 的 JS 和 CSS 在 `index.html` 里通过 CDN 引入的，不是 npm 包，换环境记得改 `index.html` 里的 script src。
- `useMap.js` 里 `window.minemap.*` 的配置必须在 new Map 之前设好，顺序别动。