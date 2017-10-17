import config from '@/assets/config/conf.json'
import axios from 'axios'

export const answerListService = {
  getJ0Token (uuid) {
    return axios.get(config.baseUrl.base_j0 + "/api4/j0/getMd5Signature",{
      params: {
        uuid: uuid
      }
    })
  },
  getAnswerList (param) {
    return axios.get(config.baseUrl.base_j0 + "/api4/j0/resource",{
      params: {
        method: "task_detail_dictation",
        uuid: param.uuid,
        authToken: param.authToken,
        fileId:param.fileId
      }
    })
  }
}
