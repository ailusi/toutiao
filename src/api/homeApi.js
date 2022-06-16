import request from '@/utils/request.js'

// 请求频道api
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

export const getArtListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id,
      timestamp: time
    }
  })
}
export const dislikeArticleAPI = (id) => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}
export const reportArticleAPI = (target, type) => {
  return request.post('/v1_0/article/reports', {
    target,
    type
  })
}
export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}

// 更新用户频道列表数据的 API
// 注意：形参 channels 是一个数组，格式： [ {id, seq} ]
export const updateUserChannelAPI = (channels) => {
  return request.put('/v1_0/user/channels', {
    channels
  })
}
