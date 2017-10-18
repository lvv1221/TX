import axios from 'axios'

// 引入其他services
export * from './services/words'
export * from './services/answerList'

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
 // console.log(JSON.stringify(result.data.message))
  if (!result) {
    return Promise.reject({message: '数据异常！'})
  }
  if (!result.data.message && result.status === 200) {
    // 成功
    return result.data
  } else if (result.data.message) {
    // 失败
    return Promise.reject({message: result.data.message,code:-1})
  } /*else if (result.status === -1) {
    // 未登录
    window.location.href = result.data
  } else if (result.status === -2) {
    // 效验错误
    return Promise.reject({message: result.errMsg})
  }*/
  return Promise.reject({message: '服务异常！',code: -2})
}, (error) => {
  // 请求错误时提示
  return Promise.reject(error)
})
