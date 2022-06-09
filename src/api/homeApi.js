import request from '@/utils/request.js'

// 请求频道api
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}
