import axios from 'axios'

// 引入其他services
export * from './services/words'

// 以下为axios全局设置
// axios.defaults.withCredentials = true
axios.defaults.timeout = 1000 * 15
// 配置axios 拦截器
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某事
  return config
}, (error) => {
  // 请求错误时做些事
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做些事
  const result = response.data
  if (!result) {
    return Promise.reject({message: '数据异常！'})
  }
  if (result.retCode === 1) {
    // 成功
    return result.data
  } else if (result.retCode === 0) {
    // 失败
    return Promise.reject({message: result.errMsg})
  } else if (result.retCode === -1) {
    // 未登录
    window.location.href = result.data
  } else if (result.retCode === -2) {
    // 效验错误
    return Promise.reject({message: result.errMsg})
  }
  return Promise.reject({message: '未知状态！'})
}, (error) => {
  // 请求错误时提示
  return Promise.reject(error)
})
