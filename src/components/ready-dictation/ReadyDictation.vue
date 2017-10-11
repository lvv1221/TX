<template>
  <div class="wrap">
    <div class="fullpop-box">
      <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
      <div class="fullpop-content">
        <div class="fullpop-top">
          <button class="pop-state"><i class="icon iconfont">&#xe650;</i>未开始</button>
          <p v-show="startDic"><button class="btn-gray" @click="openBasket" ref="bascket">已报单词篮<span class="red">（0）</span></button></p>

          <div class="ball-container">
            <div v-for="ball in balls">
              <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div v-show="ball.show" class="ball" >
                  <div class="inner inner-hook"></div>
                </div>
              </transition>
            </div>
          </div>

        </div>
        <div class="singlebox">
          <ul class="singleword">
            <li v-for="item in words" :key="item.index" :class="[class1[item.index%4],
                {'singleorange-current': item.index%4 === 0 && curStatu[item.index]},
                {'singleblue-current': item.index%4 === 1 && curStatu[item.index]},
                {'singlered-current': item.index%4 === 2 && curStatu[item.index]},
                {'singlegreen-current': item.index%4 === 3 && curStatu[item.index]}]"
                @click="start(item.index)" v-if="showStatu[item.index]"><!--请注意桔色选中状态class名为singleorange-current-->
              <div class="serial-number">单词{{item.index+1}}</div>
              <div class="soundmark">[ i:zi ]{{item.word}}</div>
              <div class="transmit"><i :class="transmit"></i></div>
            </li>
         <!--   <transition name="list"> {'singleorange-current': curStatu[index]}
            <li class="singleblue"  :class="{'singleblue-current': isCur2}" @click="start2" v-if="!isOver[2]">&lt;!&ndash;请注意蓝色选中状态class名为singleblue-current&ndash;&gt;
              <div class="serial-number">单词2</div>
              <div class="soundmark">[ dendrs ]</div>
              <div class="transmit"><i :class="transmit"></i></div>
            </li>
            </transition>
            <transition name="list">
            <li class="singlered" :class="{'singlered-current': isCur3}" @click="start3" v-if="!isOver[3]">&lt;!&ndash;请注意红色选中状态class名为singlered-current&ndash;&gt;
              <div class="serial-number">单词3</div>
              <div class="soundmark">[ hæpi ]</div>
              <div class="transmit"><i :class="transmit"></i></div>
            </li>
            </transition>
            <li class="singlered" :class="{'singlered-current': isCur4}" @click="start4" v-if="!isOver[4]">&lt;!&ndash;请注意红色选中状态class名为singlered-current&ndash;&gt;
              <div class="serial-number">单词4</div>
              <div class="soundmark">[ mst ]</div>
              <div class="transmit"><i :class="transmit"></i></div>&lt;!&ndash;请注意transmit中i标签的名称,默认状态为transmit-normal，当播放的过程中名称变为transmit-play&ndash;&gt;
            </li>
            <li class="singlegreen" :class="{'singlegreen-current': isCur5}" @click="start5" v-if="!isOver[5]">&lt;!&ndash;请注意绿色选中状态class名为singlegreen-current&ndash;&gt;
              <div class="serial-number">单词5</div>
              <div class="soundmark">[ ju:sfl ]</div>
              <div class="transmit"><i :class="transmit"></i></div>
            </li>
            <li class="singleorange" :class="{'singleorange-current': isCur6}" @click="start6" v-if="!isOver[6]">&lt;!&ndash;请注意桔色选中状态class名为singleorange-current&ndash;&gt;
              <div class="serial-number">单词6</div>
              <div class="soundmark">[ ju:sfl ]</div>
              <div class="transmit"><i :class="transmit"></i></div>
            </li>
            <li v-if="isOver[1]"></li>
            <li v-if="isOver[2]"></li>
            <li v-if="isOver[3]"></li>
            <li v-if="isOver[4]"></li>
            <li v-if="isOver[5]"></li>
            <li v-if="isOver[6]"></li>-->
            <li v-for="item in emptyLi"></li>
          </ul>
          <div class="singlepage">
            <button :class="index+1===pageNum?'singlepage-current':'singlepage-noraml'" v-for="(item,index) in pageCount" @click="page(index)"><i></i></button>
           <!-- <button class="singlepage-noraml"><i></i></button>
            <button class="singlepage-noraml"><i></i></button>
            <button class="singlepage-current"><i></i></button>-->
          </div>
        </div>
        <div class="fullpop-reminders2" v-if="!startDic" >请点选单词开始听写</div>
        <anspro v-else="startDic" @finish="toAnswer"></anspro>

      </div>
    </div>
    <basket ref="basket"></basket>
  </div>


</template>

<script>
  import anspro from '../doing-dictation/AnswerProgress.vue'
  import basket from '../word-basket/WordBasket.vue'
  import _ from 'lodash'
  export default {
    name:'ready-diraction',
    data () {
      return {
        words: [],
        class1: ['singleorange','singleblue','singlered','singlegreen'],
        class2: ['singleorange-current','singleblue-current','singlered-current','singlegreen-current'],
        curStatu: [],
        showStatu: [],
        i: 0,
        emptyLi: [],
        startDic: false,
/*        isCur1: false,
        isCur2: false,
        isCur3: false,
        isCur4: false,
        isCur5: false,
        isCur6: false,*/
        transmit: 'transmit-normal',
        wordNum: '',
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        ballColor: [],
        pageCount:'',
        pageNum: 1
      }
    },
    created () {
      let word = ['1abc','2dsc','3ssd','4abc','5dsc','6ssd','7abc','8dsc','9ssd']
      this.pageCount = Math.ceil(word.length/6)
     // console.log(this.pageCount)
      for (let i=0;i<word.length;i++) {
        this.words.push({index:i, word:word[i], current:false, show:i<6?true:false})
      }
      console.log(JSON.stringify(this.words))
      for(let i = 0; i<this.words.length; i++) {
        this.curStatu.push(false)
        if (i<6) {
          this.showStatu.push(true)
        }
        else {
          this.showStatu.push(false)
        }
      }
     // console.log(this.curStatu)
    },
    methods: {
      show () {
        this.$refs.hello.show()
        console.log(this.$refs.hello.flag)
      },
      test() {
        this.f1()
        console.log(123)
      },
      start (index) {
        // 获取点击单词板的颜色
        let color = this.chooseColor(event.target.parentNode.classList)
        this.ballColor.push(color)
        // 上个单词板消失
        if(this.wordNum !== '' && this.wordNum !== index) {
          this.showStatu[this.wordNum] = false
          this.$nextTick(() => {
            this.drop(event.target)
          })
          this.addWord()
        }
        this.transmit = 'transmit-play'
        this.curStatu[index]=true
        this.play()
        this.wordNum = index
      },
      addWord () {
        if(6+this.i > this.words.length-1) {
              this.emptyLi.push('')
        } else {
          this.showStatu[6+this.i] = true
        }
        this.i++
       // console.log(this.emptyLi.length)
      },
      /*start2 () {
        console.log(this.wordNum)
        if(this.wordNum !== '') {
          this.isOver[this.wordNum] = true
        }
        this.transmit = 'transmit-play'
        this.isCur2=true
        this.play()
        this.wordNum = 2
      },*/
      play () {
        if (!this.startDic) {
          this.startDic = true
        }
        let timeout
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.transmit = 'transmit-normal'
        },2000)
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x =- (window.innerWidth - rect.right -127)
            let y = rect.top - 123
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.backgroundColor = this.ballColor[this.ballColor.length-2]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      chooseColor(classList) {
        let color = classList[0]
        if (color === 'singleorange') {
          return '#ffd19b'
        }
        if (color === 'singleblue') {
          return '#74bcfe'
        }
        if (color === 'singlered') {
          return '#fc91ab'
        } else {
          return '#7cde98'
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight // 手动触发浏览器重绘
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      page (num) {
        let tempWords = this.words.splice(num*6,6)
       // console.log(JSON.stringify(tempWords))
        for (let a of tempWords) {
          console.log(a.index)
          this.showStatu[a.index] = true
          for(let i = 0; i<6;i++) {
            this.showStatu[this.words[i].index] =false
          }
        }
        if (tempWords.length<6) {
          console.log(6-tempWords.length)
          for(let i=0;i<(6-tempWords.length);i++) {
            this.emptyLi.push('')
          }
        }
          this.words.splice(0,0,...tempWords)
          let arr =_.cloneDeep(this.words)
          this.words = arr
          console.log(JSON.stringify(this.words))
         // this.words = arr
      },
      toAnswer () {
        this.$router.push({name: 'answerList'})
      },
      openBasket () {
        this.$refs.basket.show()
      }
    },
    components: {
      anspro,
      basket
    }
  }
</script>

<style>
  .fullpop-reminders2 {
    height: 178px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.3s linear;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translate3d(calc(500%),-160px,100px) scale(0.1,0.1);
  }
  .ball {
    position: fixed;
    right: 127px;
    top: 123px;
    z-index: 200;
    transition: all 0.4s ease
  }
  .inner {
    width: 32px;
    height: 20px;
    background: rgb(0, 160, 220);
    transition: all 0.4s linear
  }
</style>
