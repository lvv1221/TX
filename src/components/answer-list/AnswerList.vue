<template>
  <div class="wrap">
    <div class="fullpop-box">
      <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
      <div class="fullpop-content">
        <div class="fullpop-top">
          <strong>听写单词答案</strong>
          <p class="fullpop-topys"><i class="icon iconfont">&#xe650;</i>共用时&nbsp;<b>{{costTime}}</b></p>
        </div>
        <div class="singlebox pa30">
          <div class="single-refresh"><button class="btn-empty"><i class="icon iconfont">&#xe645;</i></button></div>
          <div class="pa10" v-for="item in rowNum">
            <table class="singletable">
              <tr>
                <th width="20%">单词1</th>
                <th width="20%">单词2</th>
                <th width="20%">单词3</th>
                <th width="20%">单词4</th>
                <th width="20%">单词5</th>
              </tr>
              <tr>
                <td>easy</td>
                <td><span class="red">dangerous</span></td>
                <td>easy</td>
                <td>easy</td>
                <td>easy</td>
              </tr>
            </table>
          </div>
         <!-- <div class="pa10">
            <table class="singletable">
              <tr>
                <th width="20%">单词1</th>
                <th width="20%">单词2</th>
                <th width="20%">单词3</th>
                <th width="20%">单词4</th>
                <th width="20%">单词5</th>
              </tr>
              <tr>
                <td>easy</td>
                <td><span class="red">dangerous</span></td>
                <td>easy</td>
                <td>easy</td>
                <td>easy</td>
              </tr>
            </table>
          </div>
          <div class="pa10">
            <table class="singletable">
              <tr>
                <th width="20%">单词1</th>
                <th width="20%">单词2</th>
                <th width="20%">单词3</th>
                <th width="20%">单词4</th>
                <th width="20%">单词5</th>
              </tr>
              <tr>
                <td>easy</td>
                <td><span class="red">dangerous</span></td>
                <td>easy</td>
                <td>easy</td>
                <td>easy</td>
              </tr>
            </table>
          </div>
          <div class="pa10">
            <table class="singletable">
              <tr>
                <th width="20%">单词1</th>
                <th width="20%">单词2</th>
                <th width="20%">单词3</th>
                <th width="20%">单词4</th>
                <th width="20%">单词5</th>
              </tr>
              <tr>
                <td>easy</td>
                <td><span class="red">dangerous</span></td>
                <td>easy</td>
                <td>easy</td>
                <td>easy</td>
              </tr>
            </table>
          </div>-->
          <div class="singletable-tips">注意：红色字体单词为<span class="red">正确率＜60%</span></div>
        </div>

        <div class="fullpop-btnbar"><button class="btn-blue" @click="goDetails">查看作答详情</button><button class="btn-blue">结束听写</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'answerList',
    data () {
      return {
        words: ['1abc','2dsc','3ssd','4abc','5dsc','6ssd','7abc','8dsc','9ssd','10ssd','11ssd','12ssd','13ssd','14ssd','15ssd'],
        costTime: '',
        fff: '15'
      }
    },
    created () {
      this.costTime = this.$route.params.time
     // this.words = this.$store.state.readWords
     // console.log(JSON.stringify(this.words))
    },
    computed: {
      rowNum: function () {
        return Math.ceil(this.words.length/5)
      }
    },
    methods: {
      goDetails () {
        this.$router.push({name: 'answerDetails'})
      }
    }
  }
</script>

<style>

</style>
