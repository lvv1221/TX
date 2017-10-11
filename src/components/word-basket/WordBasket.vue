<template>
  <div class="basket" v-show="showFlag">
    <div class="wrap">
      <div class="fullpop-box">
        <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
        <div class="fullpop-content">
          <div class="fullpop-top">
            <strong>听写单词答案</strong>
          </div>
          <div class="singlebox">
            <ul class="singleword">
              <li class="singleorange"><!--请注意桔色选中状态class名为singleorange-current-->
                <div>
                  <div class="serial-number">单词1</div>
                  <div class="soundmark">[ i:zi ]</div>
                  <div class="transmit"><i class="transmit-normal"></i></div>
                </div>
              </li>
              <li class="singleblue"><!--请注意蓝色选中状态class名为singleblue-current-->
                <div class="serial-number">单词2</div>
                <div class="soundmark">[ dendrs ]</div>
                <div class="transmit"><i class="transmit-normal"></i></div>
              </li>
              <li class="singlered  singlered-current"><!--请注意红色选中状态class名为singlered-current-->
                <div class="serial-number">单词3</div>
                <div class="soundmark">[ hæpi ]</div>
                <div class="transmit"><i class="transmit-normal"></i></div>
              </li>
              <li class="singlered  singlered-current"><!--请注意红色选中状态class名为singlered-current-->
                <div class="serial-number">单词4</div>
                <div class="soundmark">[ mst ]</div>
                <div class="transmit"><i class="transmit-play"></i></div><!--请注意transmit中i标签的名称,默认状态为transmit-normal，当播放的过程中名称变为transmit-play-->
              </li>
              <li class="singlegreen"><!--请注意绿色选中状态class名为singlegreen-current-->
                <div class="serial-number">单词5</div>
                <div class="soundmark">[ ju:sfl ]</div>
                <div class="transmit"><i class="transmit-normal"></i></div>
              </li>
              <li>
              </li>
            </ul>
            <div class="singlepage">
              <button class="singlepage-noraml"><i></i></button>
              <button class="singlepage-noraml"><i></i></button>
              <button class="singlepage-noraml"><i></i></button>
              <button class="singlepage-current"><i></i></button>
            </div>
          </div>
          <div class="fullpop-btnbar"><button class="btn-blue" @click="goBack">返回</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'basket',
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = !this.showFlag
      },
      goBack () {
        this.showFlag = !this.showFlag
      }
    }
  }
</script>

<style scoped>
.basket {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
  width:100%;
  background: #fff;
}
.fullpop-btnbar {
  height: 151px;
}

</style>
