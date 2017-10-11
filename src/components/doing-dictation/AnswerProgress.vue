<template>
  <div>
  <div class="fullpop-prompts">
    <div class="prompts-left clearfix">
      <div class="prompts-dcm fl">单词5</div>
      <div class="prompts-progressbar fl"><p style="width:50%;"></p></div>
      <div class="prompts-yzd fl">已作答<span class="red">27人</span></div>
    </div>
    <div class="prompts-line"><em></em></div>
    <div class="prompts-right">
      <button class="btn-gray" @click="showList">未作答名单</button>
      <div class="prompts-bubble" v-if="nameList">
        <div class="prompts-bubblecon">
          <div class="prompts-bubblescroll">
            <div class="tc mb-5"><strong>未作答名单（23）</strong></div>
            <div class="clearfix"><span><a href="#">胡宇于飞</a></span><span>胡宇于飞</span><span>胡宇于飞</span><span>王希</span><span>胡宇飞</span><span>胡宇飞</span><span>王希</span><span>胡宇飞</span><span>胡宇飞</span><span>王希</span><span>胡宇飞</span><span>胡宇飞</span><span>王希</span><span>胡宇飞</span><span>王希</span><span>胡宇飞</span><span>王希</span></div>
          </div>
        </div>
        <div class="prompts-bubblearrow"></div>
      </div>
    </div>
  </div>
  <div class="fullpop-btnbar"><button class="btn-blue" @click="finishDic">结束听写</button></div>
  </div>
</template>

<script>
  export default {
    name: 'anspro',
    data () {
      return {
//        endDic: false
        nameList: false
      }
    },
    methods: {
      finishDic () {
//        this.endDic = true
        this.$emit('finish')
      },
      showList () {
        this.nameList = !this.nameList
      }
    }
  }
</script>

<style>

</style>
