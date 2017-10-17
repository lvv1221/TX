import config from '@/assets/config/conf.json'
import axios from 'axios'

export default {
  /**
   *  method:获取j0 token
   *  @:param uuid
   */
  getJ0Token (uuid) {
    let url = config.baseUrl.base_j0 + "/api4/j0/getMd5Signature";
    return axios.get(url,{
      params: {
        uuid: uuid
      }
    })
    .then(function (response) {
      if(response.status === 200){
        return response.data;
      }else {

      }
    })
    .catch(function (error) {
      return error;
    });
  },

  /**
   *  method:获取智听写作答详情
   *  @:param {uuid:"",authToken:'身份令牌',fileId:小卷子上传返回的参数}
   */
  getAnswerDetail(param){
    let url = config.baseUrl.base_j0 + "/api4/j0/resource";
    return axios.get(url,{
      params: {
        method: "task_detail_dictation",
        uuid: param.uuid,
        authToken: param.authToken,
        fileId:param.fileId
      }
    })
    .then(function (response) {
      if(response.status === 200){
        return response.data;
      }else {

      }
    })
    .catch(function (error) {
      return error;
    });
  }
}

