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
