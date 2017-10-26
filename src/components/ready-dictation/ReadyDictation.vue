<template>
  <div class="wrap">
    <div class="fullpop-box">
      <div class="fullpop-tab clearfix"><em>{{this.$store.state.title}}</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe652;</i></a><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
      <div class="fullpop-content">
        <div class="fullpop-top">
          <timetool ref="timeTool"></timetool>
          <p v-show="startDic"><button class="btn-gray" @click="openBasket" ref="bascket">已报单词篮<span class="red">（{{readCount}}）</span></button></p>

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
        <div class="singlebox animated"  :class="{bounceInLeft:aLeft, bounceInRight:aRight}" @touchstart="touchstart($event)" @touchend="touchend($event)" @animationend="animationend">
          <ul class="singleword">
            <li v-for="item in words" :key="item.index" :class="[class1[item.index%4],
                {'singleorange-current': item.index%4 === 0 && item.current},
                {'singleblue-current': item.index%4 === 1 && item.current},
                {'singlered-current': item.index%4 === 2 && item.current},
                {'singlegreen-current': item.index%4 === 3 && item.current}]"
                @click="start(item.index,$event)" v-if="item.show"><!--请注意桔色选中状态class名为singleorange-current-->
              <div class="serial-number">单词{{item.index+1}}</div>
              <div class="soundmark">{{item.phonogram}}</div>
              <div class="transmit"><i :class="transmit"></i></div>
              <audio  :id="item.index"></audio>
            </li>
            <li v-for="item in emptyLi"></li>
          </ul>
          <div class="singlepage">
            <button :class="index+1===pageNum?'singlepage-current':'singlepage-noraml'" v-for="(item,index) in pageCount" @click="page(index+1)"><i></i></button>
          </div>
        </div>
        <div class="fullpop-reminders2" v-if="!startDic" >请点选单词开始听写</div>
        <anspro v-else="startDic" @finish="toAnswer"></anspro>

      </div>
    </div>
    <basket ref="basket" :readwords="readWords" :colorclass="class1"></basket>
  </div>


</template>

<script>
  import anspro from '../doing-dictation/AnswerProgress.vue'
  import basket from '../word-basket/WordBasket.vue'
  import timetool from './TimeTool.vue'
  import _ from 'lodash'
  import axios from 'axios'

  export default {
    name:'ready-diraction',
    data () {
      return {
        words: [],
        readWords: [],
        readCount: 0,
        showBasket: false,
        class1: ['singleorange','singleblue','singlered','singlegreen'],
       // class2: ['singleorange-current','singleblue-current','singlered-current','singlegreen-current'],
       // emptyLi: [],
        startDic: false,
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
       // rect: {},
        rect1: [],
        ballColor: [],
        target: '',
        pageCount:'',
        fyFlag: false,
        pageNum: 1,
       // dragX: '',
        pageX: '',
        aLeft: false,
        aRight: false,
        costTime: ''
      }
    },
    created () {
      let title = 'Lesson 2  A Dangerous Job'
      let uuid = '2000000030000014198'
      this.$store.dispatch('setUuid', uuid)
      this.$store.dispatch('setTitle', title)
      axios.get('/api/words').then(res => {
       // console.log(JSON.stringify(res))
        let word = res
        this.pageCount = Math.ceil(word.length/6)
        for (let i=0;i<word.length;i++) {
          this.$set(word[i], 'index', i)
          this.$set(word[i], 'current', false)
          this.$set(word[i], 'show', i<6?true:false)
         // this.words.push({index:i, word:word[i], current:false, show:i<6?true:false})
        }
        this.words = word
       // console.log(JSON.stringify(this.words[0]))
      })
      /*let word = ['1abc','2dsc','3ssd','4abc','5dsc','6ssd','7abc','8dsc','9ssd','10ssd','11ssd','12ssd','13ssd','14ssd','15ssd','16swe']
      this.pageCount = Math.ceil(word.length/6)
      for (let i=0;i<word.length;i++) {
        this.words.push({index:i, word:word[i], current:false, show:i<6?true:false})
      }*/
      /*for(let i = 0; i<this.words.length; i++) {
        this.curStatu.push(false)
        if (i<6) {
          this.showStatu.push(true)
        }
        else {
          this.showStatu.push(false)
        }
      }*/
    },
    computed: {
      emptyLi: function () {
        let arr = []
        let showCount = this.UTILS.countShow(this.words)
        if (showCount<6) {
          for (let i = 0; i<6-showCount; i++) {
            arr.push('')
          }
        }
        return arr
      }
    },
    methods: {
      /* 拖动翻页，因需求不符，暂已弃用
      dragStart (event) {
        this.dragX = event.clientX
      },
      dragOver(event) {
        let length = this.dragX - event.clientX
        if (length > 20) {
          if (this.pageNum < this.pageCount) {
            this.page(this.pageNum+1)
          }
        }
        else if (length < -20) {
          if (this.pageNum > 1) {
            this.page(this.pageNum-1)
          }
        }
      },*/
      animationend  () {
        this.aRight = false
        this.aLeft = false
      },
      touchstart (event) {
        this.pageX = event.touches[0].pageX
      },
      touchend (event) {
        let length = this.pageX - event.changedTouches[0].pageX
        if (length > 20) {
          if (this.pageNum < this.pageCount) {
            this.page(this.pageNum+1)
            this.aRight = true
          }
        } else if (length < -20) {
          if (this.pageNum > 1) {
            this.page(this.pageNum-1)
            this.aLeft = true
          }
        }
      },
      start (index,event) {
        // 开始计时器
        if(this.wordNum === '') {
          this.$refs.timeTool.startTime()
        }
        // 获取点击单词板的颜色
        let color = this.chooseColor(event.target.parentNode.classList)
        this.ballColor.push(color)
        // 上个单词板消失
        if(this.wordNum !== '' && this.wordNum !== index) {
          for(let w of this.words) {
            if(w.index === this.wordNum) {
              if (w.show === false && w.index < index) {
                this.fyFlag = true
              }
              w.show=false
              //添加到已读单词组
              this.readWords.push(w)
              this.readCount++
             // console.log(JSON.stringify(this.readWords))
              // 移除被点击单词
             /* let n = this.words.findIndex((word) => {
                return word === w
              })*/
              let n = this.UTILS.findIndex(w,this.words)
              this.words.splice(n,1)
              this.pageCount = Math.ceil(this.words.length/6)
              // 执行飞出动画
              this.$nextTick(() => {
                this.drop(event.target)
              })
              // 添加单词
              this.addWord(index)
            }
          }
        }
        if (this.rect1.length === 0) {
          this.rect1.push(event.target.getBoundingClientRect())
        }

        this.transmit = 'transmit-play'
        for(let w of this.words) {
          if(w.index === index)
            w.current=true
        }
        this.play(index)
        this.wordNum = index
      },
      // 获取当前页面显示单词数
      /*countShow () {
        let showCount = 0
        for (let w of this.words) {
          if (w.show === true) {
            showCount++
          }
        }
        return showCount
      },*/
      addWord (m) {
        if (this.fyFlag === true) {
          for (let w of this.words) {
            if (w.show === true) {
              w.show = false
              this.fyFlag =false
              /*为旧版翻页添加*/
              /*let word = this.words.shift()
              this.words.push(word)*/
              break
            }
          }
        }
        // 找下一个单词显示出来
        if ( this.UTILS.countShow(this.words) < 6) {
          for (let w of this.words) {
            if (w.index > m && w.show === false) {
              w.show = true
              return
            }
          }
        }
        /*// 填充占位li
        let showCount = this.UTILS.countShow(this.words)
        if (this.UTILS.countShow(this.words) <6) {
          for (let i = 0; i<6-showCount-this.emptyLi.length; i++) {
            this.emptyLi.push('')
          }
        }*/
       /* console.log(JSON.stringify(this.words))
        if(5+this.i > this.words.length-1 || this.words[5+this.i].index<this.words[this.i].index) {
              this.emptyLi.push('')
        } else {
          this.words[5+this.i].show = true
        }
        this.i++*/
      },
      play (index) {
        if (!this.startDic) {
          this.startDic = true
        }
        let au = document.getElementById(index)
        au = new Audio
        au.id = index
        au.onended = this.ended
        for (let w of this.words) {
          if (w.index === index) {
            au.src = w.pronPath
          }
        }
        console.log(au.src)
       /* if (au.id >2) {
          au.src = '../../static/cool.mp3'
        } else {
          au.src = '../../static/because.mp3'
        }*/
        // console.log(au)
        au.play()
        /*this.$refs.audios[index].onended = function () {
          console.log(1111)
         let  _this = this
          _this.transmit = 'transmit-normal'
        }*/
/*        let timeout
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          this.transmit = 'transmit-normal'
        },2000)*/
      },
      ended () {
        this.transmit = 'transmit-normal'
       // console.log('end')
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
            /*if (ball.el.getBoundingClientRect().left !==0) {
              this.rect = ball.el.getBoundingClientRect()
            }*/
            this.rect1.push(ball.el.getBoundingClientRect())
            let x =- (window.innerWidth - this.rect1[0].right -127)
            let y = this.rect1[0].top - 123
            this.rect1.shift()
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
          el.style.transform = `scale(.1,.1)`
          el.style.webkitTransform = `scale(.1,.1)`
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
      page(page) {
        if (page !== this.pageNum) {
          for (let i = 0; i < this.words.length; i++) {
            if (i >= (page-1)*6 && i < page*6) {
              this.words[i].show = true
            } else {
              this.words[i].show = false
            }
          }
          /*let showCount = this.UTILS.countShow(this.words)
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
      // 原分页方法，逻辑复杂，已弃用，如项目需求变更，可能重新启用
      /*page1 (page) {
        if (page !== this.pageNum) {
          let num = page - this.pageNum
          // 下一页
          if (num > 0) {
            // 选取目标页单词
            let tempWords = this.words.slice(num*6,num*6+6)
            // 目标页单词（不含之前上一页翻过去的）显示
            for (let i = 0; i<tempWords.length;i++) {
              if (tempWords[i].index >= tempWords[0].index) {
               tempWords[i].show = true
              }
            }
            //当前页单词隐藏
            for(let i = 0; i<6;i++) {
              this.words[i].show =false
            }
            // 是否增加占位标签li
            let showCount = this.UTILS.countShow(this.words)
            if (tempWords.length<6) {
              for(let i=0;i<(6-tempWords.length);i++) {
                this.emptyLi.push('')
              }
            } else if (showCount<6) {
              for (let i = 0; i<6-showCount; i++) {
                this.emptyLi.push('')
              }
            }
            // 翻过页的单词添加到队尾
            let preWords = this.words.splice(0,num*6)
            this.words.push(...preWords)
          } else
            // 上一页
            {
            // 选取目标页单词
            let tempWords = this.words.splice((this.words.length+num*6),-(6*num))
            // 目标页单词显示
            for (let i = 0; i<6; i++) {
              tempWords[i].show = true
            }
            // 剩余单词隐藏
            for (let obj of this.words) {
              obj.show = false
            }
            // 清楚占位标签li (因为补充原理，故上一页单词必为6)
           this.emptyLi = []
            // 目标页单词添加到队首
            this.words.unshift(...tempWords)
          }

          this.pageNum = page
        }
      },*/
      toAnswer () {
        this.costTime = this.$refs.timeTool.stopTime()
        this.$store.dispatch('setTime', this.costTime)
        this.$store.dispatch('setWords', this.readWords)
       // this.$store.dispatch('setWords', this.words)
        this.$router.push({name: 'answerList'})
      },
      openBasket () {
        this.$refs.basket.show()
      }
    },
    components: {
      anspro,
      basket,
      timetool
    }
  }
</script>

<style>
  .fullpop-reminders2 {
    height: 178px;
  }
  .ball {
    position: fixed;
    right: 62px;
    top: 68px;
    z-index: 200;
    transition: all 0.4s ease
  }
  .inner {
    width: 200px;/*32*/
    height: 128px;/*20*/
    opacity: .7;
    background: rgb(0, 160, 220);
    transition: all 0.4s linear
  }
</style>
