<template>
  <div class="wrap">
    <!--<div class="loading-mask" v-show="loading">
      <img src="../../assets/img/loading.gif"  class ="loading-img" alt="加载中..." v-if="imgType === 1">
      <img src="../../assets/img/tips2_big.png"  class ="loading-img" alt="没有数据" v-else-if="imgType === 2">
    </div>-->
    <div class="fullpop-box">
      <div class="fullpop-tab clearfix"><em>{{this.$store.state.title}}</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe652;</i></a><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
      <div class="fullpop-content">
        <div class="fullpop-top">
          <strong>听写单词答案</strong>
          <p class="fullpop-topys"><i class="icon iconfont">&#xe650;</i>共用时&nbsp;<b>{{costTime}}</b></p>
        </div>
        <div class="singlebox pa30 err" v-if="loading">
          <img src="../../assets/img/loading.gif"   alt="加载中..." v-if="imgType === 1">
          <img src="../../assets/img/tips2_big.png"   alt="没有数据" v-else-if="imgType === -1">
          <img src="../../assets/img/tips1_big.png"  alt="服务异常" v-else-if="imgType === -2">
          <img src="../../assets/img/tips3_big.png"   alt="网络异常" v-else-if="imgType === -3">
        </div>

        <div class="singlebox pa30" v-if="!loading">
          <div class="single-refresh"><button class="btn-empty" @click="init()"><i class="icon iconfont">&#xe645;</i></button></div>
          <div class="pa10" v-for="item in rowNum">
            <table class="singletable">
              <tr>
                <th width="20%" v-for="word in rowWord(item)">单词{{word.index+1}}</th>
                <th v-for="b in blank" style="border: none" v-if="item === rowNum"></th>
              </tr>
              <tr>
                <td v-for="word in rowWord(item)"><span :class="{'red': word.correctRate<60?true:false}">{{word.name}}</span></td>
                <td v-for="b in blank" style="border: none" v-if="item === rowNum"></td>
              </tr>
            </table>
          </div>
          <div class="singletable-tips">注意：红色字体单词为<span class="red">正确率＜60%</span></div>
        </div>

        <div class="fullpop-btnbar"><button class="btn-blue" @click="goDetails">查看作答详情</button><button class="btn-blue">结束听写</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {answerListService} from '@/api'
  export default {
    name: 'answerList',
    data () {
      return {
        words: [],
        costTime: '',
        loading: false,
        imgType: '1'
      }
    },
    created () {
      // this.costTime = this.$route.params.time
      this.costTime = this.$store.state.costTime
     // this.words = this.$store.state.readWords
     /* let word = ['1abc','2dsc','3ssd','4abc','5dsc','6ssd','7abc','8dsc','9ssd','10ssd','11ssd','12ssd','13ssd','14ssd','15ssd']
      for (let i=0;i<word.length;i++) {
        this.words.push({index:i, word:word[i], red:i%3 === 0?true:false})
      }*/
     this.init()
     // console.log(JSON.stringify(this.words))
    },
    computed: {
      rowNum: function () {
        return Math.ceil(this.words.length/5)
      },
      blank: function () {
        let arr = []
        let num = this.words.length % 5
        if (num > 0) {
          for (let i=0; i < 5 - num; i++) {
            arr.push('')
          }
        } else {
          arr = []
        }
        return arr
      }
    },
    methods: {
      rowWord: function (i) {
        i--
        return this.words.slice(i*5,i*5+5)
      },
      init () {
        this.loading = true
        this.imgType = 1
       // let word = ['1abc','2dsc','3ssd','4abc','5dsc','6ssd','7abc','8dsc','9ssd','10ssd','11ssd','12ssd','13ssd','14ssd','15ssd']
        /*let word = [{word:'1abc', correct: 35.23},{word:'2dsc', correct: 66},{word:'3ssd', correct: 77},
                         {word:'4abc', correct: 35.23},{word:'5dsc', correct: 66},{word:'6ssd', correct: 77},
                         {word:'7abc', correct: 35.23},{word:'8dsc', correct: 66},{word:'9ssd', correct: 77},
                         {word:'10ssd', correct: 35.23},{word:'11ssd', correct: 66},{word:'12ssd', correct: 77},
                         {word:'14ssd', correct: 35.23},{word:'15ssd', correct: 66}]*/

        answerListService.getJ0Token('2000000030000014198').then(data => {
          let authToken = data
          answerListService.getAnswerList({
            uuid:this.$store.state.uuid,
            authToken:authToken,
            fileId:"408065847907586048"
          }).then(data => {
            let result = data.result
            // console.log(JSON.stringify(data.result[0]))
            let storeWords = _.cloneDeep(this.$store.state.readWords)

            /*let storeWords = [{index: 1, word: 'Chinese'},{index: 2, word: 'where'},{index: 3, word: 'not'},{index: 4, word: 'about'},{index: 5, word: 'Ms'},
                                        {index: 6, word: 'America'},{index: 7, word: 'not'},{index: 8, word: 'England'},{index: 9, word: 'hi'},{index: 10, word: 'American'},
                                        {index: 11, word: 'our'},{index: 12, word: 'grade'},{index: 13, word: 'book'},{index: 14, word: 'apple'}]*/
            /*for (let r of result) {
              console.log(r.rightAnswer)
            }*/
            for (let sw of storeWords) {
              for (let r of result) {
                if (r.rightAnswer === sw.name) {
                  this.$set(sw,'correctRate',r.correctRate)
                }
              }
            }
           // console.log(JSON.stringify(storeWords))
            this.words = storeWords
            this.loading = false
            /*this.$set(data.result[0],'index',1)
            console.log(JSON.stringify(data.result[0]))*/
          }).catch(err => {
            if(err.code === -1) {
              this.imgType = -1
            } else if (err.code === -2) {
              this.imgType = -2
            }
          })
        })

        /*let storeWords = _.cloneDeep(this.$store.state.readWords)
        for (let sw of storeWords) {
          for (let w of word) {
            if (w.word === sw.word) {
              this.$set(sw,'correct',w.correct)
            }
          }
        }
        this.words = storeWords
          setTimeout(() => {
            this.loading = false
          },1000) */
      },
      goDetails () {
        this.$router.push({name: 'answerDetails'})
      }
    }
  }
</script>

<style>
  .loading-mask{
    position: absolute;
    -webkit-box-orient:vertical;
    left: 104px;
    top: 179px;
    z-index: 1000;
    width: 1682.25px;/*1270.25px86%*/
    height: 70.5%;/*669px70.5%*/
    /*line-height: 70.5%;*/
    background-color: hsla(0,0%,100%,.8);
    transition: opacity .3s;
    text-align: center;
  }
  @media only screen and (max-width: 1500px) {
    .loading-mask{
      width: 1260.25px;
    }
  }
  @media only screen and (max-width: 1300px) {
    .loading-mask{
      left: 82px;
      top: 178px;
      width: 995.03px;
      height: 489px;
    }
  }
  .loading-img{
    position: relative;
    top: 30%;
  }
  .err {
    text-align: center;
    padding-top: 25%
  }
</style>
