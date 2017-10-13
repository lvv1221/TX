import Vue from 'vue'
import Router from 'vue-router'
import Ready from '@/components/ready-dictation/ReadyDictation'
import answerList from '@/components/answer-list/answerList'
import answerDetails from '@/components/answer-details/answerDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ready',
      component: Ready
    },
    {
      path:'/answerList',
      name: 'answerList',
      component: answerList
    },
    {
      path:'/answerDetails',
      name: 'answerDetails',
      component: answerDetails
    }
  ]
})
