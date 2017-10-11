<template>
  <div>
    <div class="wrap">
      <div class="fullpop-box">
        <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
        <div class="fullpop-content">
          <div class="fullpop-top">
            <strong>听写单词答案</strong>
            <p class="fullpop-topys"><i class="icon iconfont">&#xe650;</i>共用时&nbsp;<b>03:21</b></p>
          </div>
          <div class="singlebox">
            <div class="single-refresh"><button class="btn-empty"><i class="icon iconfont">&#xe645;</i></button></div>
            <div class="tc"><img src="../../assets/css/common/images/tb.png" width="920" height="500"></div>
          </div>

          <div class="fullpop-btnbar"><button class="btn-blue" @click="toAnswer">查看答案</button><button class="btn-blue">关闭</button></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'answerDetails',
    data () {
      return {
        js: ''
      }
    },
    methods: {
      toAnswer () {
        this.$router.push({name: 'answerList'})
      }
    }
  }
</script>

<style>

</style>
