import request from '@/utils/request'

export function getMapLayerList(params) {
  return request({
    url: '/map/layer/list',
    method: 'get',
    params
  })
}

export function getMapData(params) {
  return request({
    url: '/map/data',
    method: 'get',
    params
  })
}

export function getFeatureById(id) {
  return request({
    url: `/map/feature/${id}`,
    method: 'get'
  })
}

export function searchLocation(keyword) {
  return request({
    url: '/map/search/location',
    method: 'get',
    params: { keyword }
  })
}

export function getBoundaryByAdcode(adcode) {
  return request({
    url: `/map/boundary/${adcode}`,
    method: 'get'
  })
}
