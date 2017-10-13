<template>
  <div class="basket" v-show="showFlag">
    <div class="wrap">
      <div class="fullpop-box">
        <!--<div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>-->
        <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe652;</i></a><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
        <div class="fullpop-content">
          <div class="fullpop-top">
            <strong>已报单词篮</strong>
          </div>
          <div class="singlebox">
            <ul class="singleword">
              <li v-for="item in readwords" :key="item.index" :class="[colorclass[item.index%4],
                {'singleorange-current': item.index%4 === 0 && item.current},
                {'singleblue-current': item.index%4 === 1 && item.current},
                {'singlered-current': item.index%4 === 2 && item.current},
                {'singlegreen-current': item.index%4 === 3 && item.current}]"
                  v-if="item.show"  ><!--请注意桔色选中状态class名为singleorange-current-->
                <div class="serial-number">单词{{item.index+1}}</div>
                <div class="soundmark">[ i:zi ]{{item.word}}</div>
              </li>
              <li v-for="item in emptyLi"></li>
            </ul>
            <div class="singlepage">
              <button :class="index+1===pageNum?'singlepage-current':'singlepage-noraml'" v-for="(item,index) in pageCount" @click="page(index+1)"><i></i></button>
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
    props: ['readwords', 'colorclass'],
    data () {
      return {
        showFlag: false,
        pageCount: '',
        pageNum: 1
      //  emptyLi: []
      }
    },
    beforeUpdate () {
      if (this.readwords.length < 7 ) {
        for (let i = 0;i < this.readwords.length; i++) {
          this.readwords[i].show = true
        }
      }
      this.pageCount = Math.ceil(this.readwords.length/6)
    },
    computed: {
      emptyLi: function () {
        let arr = []
        let showCount = this.UTILS.countShow(this.readwords)
        if (showCount<6) {
          for (let i = 0; i<6-showCount; i++) {
            arr.push('')
          }
        }
        return arr
      }
    },
    methods: {
      show () {
       // console.log(this.readwords.length)
        this.restShow(this.pageNum)
        this.showFlag = !this.showFlag
      },
        /*countShow () {
          let showCount = 0
          for (let w of this.readwords) {
            if (w.show === true) {
              showCount++
            }
          }
          return showCount
        },*/
      restShow (page) {
        for (let i = 0; i < this.readwords.length; i++) {
          if (i >= (page-1)*6 && i < page*6) {
            this.readwords[i].show = true
          } else {
            this.readwords[i].show = false
          }
        }
      },
      page(page) {
        if (page !== this.pageNum) {
          /*for (let i = 0; i < this.readwords.length; i++) {
            if (i >= (page-1)*6 && i < page*6) {
              this.readwords[i].show = true
            } else {
              this.readwords[i].show = false
            }
          }*/
          this.restShow(page)
          /*let showCount = this.UTILS.countShow(this.readwords)
          if (showCount<6) {
            for (let i = 0; i<6-showCount; i++) {
              this.emptyLi.push('')
            }
          } else {
            this.emptyLi = []
          }*/
          this.pageNum = page
        }
      },
      goBack () {
       // console.log(JSON.stringify(this.readwords))
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
