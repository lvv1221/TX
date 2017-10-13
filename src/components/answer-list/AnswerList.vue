<template>
  <div class="wrap">
    <div class="loading-mask" v-show="loading">
      <img src="../../assets/img/loading.gif"  class ="loading-img" alt="加载中...">
    </div>
    <div class="fullpop-box">
      <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe652;</i></a><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
      <div class="fullpop-content">
        <div class="fullpop-top">
          <strong>听写单词答案</strong>
          <p class="fullpop-topys"><i class="icon iconfont">&#xe650;</i>共用时&nbsp;<b>{{costTime}}</b></p>
        </div>
        <div class="singlebox pa30">
          <div class="single-refresh"><button class="btn-empty" @click="init()"><i class="icon iconfont">&#xe645;</i></button></div>
          <div class="pa10" v-for="item in rowNum">
            <table class="singletable">
              <tr>
                <th width="20%" v-for="word in rowWord(item)">单词{{word.index+1}}</th>
                <th v-for="b in blank"></th>
              </tr>
              <tr>
                <td v-for="word in rowWord(item)"><span :class="{'red': word.correct<60?true:false}">{{word.word}}</span></td>
                <td v-for="b in blank"></td>
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
  export default {
    name: 'answerList',
    data () {
      return {
        words: [],
        blank: [],
        costTime: '',
        loading: false
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
        let num = Math.ceil(this.words.length/5)
        for (let i=0; i < 5 - num; i++) {
          this.blank.push('')
        }
        return num
      }
    },
    methods: {
      rowWord: function (i) {
        i--
        return this.words.slice(i*5,i*5+5)
      },
      init () {
        this.loading = true
       // let word = ['1abc','2dsc','3ssd','4abc','5dsc','6ssd','7abc','8dsc','9ssd','10ssd','11ssd','12ssd','13ssd','14ssd','15ssd']
        let word = [{word:'1abc', correct: 35.23},{word:'2dsc', correct: 66},{word:'3ssd', correct: 77},
                         {word:'4abc', correct: 35.23},{word:'5dsc', correct: 66},{word:'6ssd', correct: 77},
                         {word:'7abc', correct: 35.23},{word:'8dsc', correct: 66},{word:'9ssd', correct: 77},
                         {word:'10ssd', correct: 35.23},{word:'11ssd', correct: 66},{word:'12ssd', correct: 77},
                         {word:'14ssd', correct: 35.23},{word:'15ssd', correct: 66}]
        let storeWords = _.cloneDeep(this.$store.state.readWords)
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
          },1000)
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
    top: 178px;
    z-index: 1000;
    width: 1682.25px;/*1270.25px86%*/
    height: 669px;/*669px70.5%*/
    /*line-height: 70.5%;*/
    background-color: hsla(0,0%,100%,.8);
    transition: opacity .3s;
    text-align: center;
  }
  @media only screen and (max-width: 1500px) {
    .loading-mask{
      width: 1270.25px;
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
</style>
