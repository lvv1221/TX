import config from '@/assets/config/env-config.json'
import axios from 'axios'

export const wordsService = {
  getWords (id) {
    return axios.get(config.baseUrl.words + 'aaa/' + id)
  }
}
