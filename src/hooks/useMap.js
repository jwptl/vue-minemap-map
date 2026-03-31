import { onUnmounted } from 'vue'

const domain = import.meta.env.VITE_MINEMAP_DOMAIN || 'https://minedata.cn'

window.minemap.domainUrl = domain
window.minemap.dataDomainUrl = domain
window.minemap.serverDomainUrl = 'https://ol-data.minedata.cn'
window.minemap.spriteUrl = `${domain}/minemapapi/v4.0.0/sprite/sprite`
window.minemap.serviceUrl = 'https://service.minedata.cn/service'
window.minemapCDN = `${domain}/minemapapi/minemap-CDN`

window.minemap.key = import.meta.env.VITE_MINEMAP_KEY || ''
window.minemap.solution = Number(import.meta.env.VITE_MINEMAP_SOLUTION) || 11001

/**
 * mineMap 地图初始化 Hook
 * @param {Object} options - 地图初始化配置选项
 * @param {HTMLElement} options.containerId - 地图容器 DOM 元素（必填，ref 值）
 * @param {[number, number]} [options.center] - 地图初始中心点 [经度, 纬度]，默认从环境变量读取
 * @param {number} [options.zoom] - 地图初始缩放级别，默认从环境变量读取
 * @param {string} [options.style] - 地图样式 URL，默认从环境变量读取
 * @param {number} [options.pitch] - 地图倾斜角度，默认 0
 * @param {number} [options.bearing] - 地图旋转角度，默认 0
 * @param {number} [options.maxZoom] - 最大缩放级别，默认 21
 * @param {number} [options.minZoom] - 最小缩放级别，默认 3
 * @param {string} [options.projection] - 投影方式，默认 'MERCATOR'
 * @returns {Object} 返回地图操作方法集合
 * 
 * @example
 * // 基础使用示例
 * const mapRef = ref(null)
 * const map = useMap({
 *   containerId: mapRef.value,
 *   center: [118.799565, 32.093502],
 *   zoom: 10
 * })
 * 
 * // 监听地图加载完成事件
 * map.on('load', () => {
 *   console.log('地图加载完成')
 * })
 * 
 * // 飞行动画到指定位置
 * map.flyTo([116.4074, 39.9042], 14)
 * 
 * // 获取原始地图实例进行高级操作
 * const instance = map.getInstance()
 */
export const useMap = (options = {}) => {
  let map = null

  const initMap = () => {
    if (map) return

    const defaultCenter = [
      Number(import.meta.env.VITE_DEFAULT_CENTER_LNG) || 118.799565,
      Number(import.meta.env.VITE_DEFAULT_CENTER_LAT) || 32.093502
    ]
    const defaultZoom = Number(import.meta.env.VITE_DEFAULT_ZOOM) || 10

    const mapOptions = {
      container: options.containerId || 'map',
      style: options.style || import.meta.env.VITE_MINEMAP_STYLE || 'https://service.minedata.cn/map/solu/style/11001',
      center: options.center || defaultCenter,
      zoom: options.zoom || defaultZoom,
      pitch: options.pitch || 0,
      bearing: options.bearing || 0,
      maxZoom: options.maxZoom || 21,
      minZoom: options.minZoom || 3,
      projection: options.projection || 'MERCATOR',
      boxZoom: true,
      logoControl: true,
    }
    map = new window.minemap.Map(mapOptions)
  }

  initMap()

  onUnmounted(() => {
    if (map) {
      map.remove()
      map = null
    }
  })

  /**
   * 添加地图事件监听
   * @param {string} eventName - 事件名称，如 'load', 'click', 'movestart', 'moveend' 等
   * @param {Function} callback - 事件回调函数
   */
  const addEvent = (eventName, callback) => {
    if (map) {
      map.on(eventName, callback)
    }
  }

  /**
   * 移除地图事件监听
   * @param {string} eventName - 事件名称
   * @param {Function} callback - 要移除的回调函数
   */
  const removeEvent = (eventName, callback) => {
    if (map) {
      map.off(eventName, callback)
    }
  }

  return {
    /**
     * 获取原始 mineMap 实例，用于调用原生 API
     * @returns {Object} mineMap 地图实例
     */
    getInstance: () => map,

    /**
     * 添加事件监听（别名）
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     */
    on: addEvent,

    /**
     * 移除事件监听（别名）
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     */
    off: removeEvent,

    /**
     * 飞行动画到指定中心点和缩放级别
     * @param {[number, number]} center - 目标中心点 [经度, 纬度]
     * @param {number} zoom - 目标缩放级别
     */
    flyTo: (center, zoom) => {
      if (map) {
        map.flyTo({ center, zoom })
      }
    },

    /**
     * 平滑移动到指定中心点（无动画）
     * @param {[number, number]} center - 目标中心点 [经度, 纬度]
     */
    panTo: (center) => {
      if (map) {
        map.panTo(center)
      }
    },

    /**
     * 设置地图缩放级别
     * @param {number} zoom - 目标缩放级别
     */
    setZoom: (zoom) => {
      if (map) {
        map.setZoom(zoom)
      }
    },

    /**
     * 获取当前地图缩放级别
     * @returns {number|null} 当前缩放级别，地图未初始化返回 null
     */
    getZoom: () => map ? map.getZoom() : null,

    /**
     * 获取当前地图中心点
     * @returns {[number, number]|null} 当前中心点 [经度, 纬度]，地图未初始化返回 null
     */
    getCenter: () => map ? map.getCenter() : null,

    /**
     * 添加图层到地图
     * @param {Object} layer - 图层配置对象，遵循 mineMap 图层规范
     */
    addLayer: (layer) => {
      if (map) {
        map.addLayer(layer)
      }
    },

    /**
     * 从地图移除图层
     * @param {string} layerId - 图层 ID
     */
    removeLayer: (layerId) => {
      if (map) {
        map.removeLayer(layerId)
      }
    },

    /**
     * 添加数据源
     * @param {string} sourceId - 数据源 ID
     * @param {Object} source - 数据源配置对象
     */
    addSource: (sourceId, source) => {
      if (map) {
        map.addSource(sourceId, source)
      }
    },

    /**
     * 移除数据源
     * @param {string} sourceId - 数据源 ID
     */
    removeSource: (sourceId) => {
      if (map) {
        map.removeSource(sourceId)
      }
    },

    /**
     * 查询指定区域内渲染的要素
     * @param {Array|Object} geometry - 查询的几何区域
     * @param {Object} [options] - 查询选项，可指定 layers 过滤
     * @returns {Array} 匹配的要素数组
     */
    queryRenderedFeatures: (geometry, options) => {
      if (map) {
        return map.queryRenderedFeatures(geometry, options)
      }
      return []
    }
  }
}
