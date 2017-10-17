<template>
  <div>
    <div class="wrap">
      <div class="fullpop-box">
        <div class="fullpop-tab clearfix"><em>Lesson 2  A Dangerous Job</em><p class="fr"><a href="#"><i class="icon iconfont">&#xe652;</i></a><a href="#"><i class="icon iconfont">&#xe648;</i></a></p></div>
        <div class="fullpop-content">
          <div class="fullpop-top">
            <strong>听写作答详情</strong>
            <p class="fullpop-topys"><i class="icon iconfont">&#xe650;</i>共用时&nbsp;<b>{{costTime}}</b></p>
          </div>
          <div class="singlebox">
            <div class="single-refresh" @click="refreshBar"><button class="btn-empty"><i class="icon iconfont">&#xe645;</i></button></div>
            <div class="tc tc1" id="tc" v-show="tcStatus == 'bar'">
              <div id="bar">
              </div>
              <div class="explain" id="explain">
                  <div style="float: left;"><div class="color1"></div>  正确率>=60%</div>
                  <div style="float: left;"><div class="color2"></div>  正确率<60%</div>
              </div>
            </div>
            <div class="tc tc1" :style="tcStyle" v-show="tcStatus == 'net'">
                <img width="200" height="200" src="../../assets/img/tips3_big.png">
            </div>
            <div class="tc tc1" :style="tcStyle" v-show="tcStatus == 'loading'">
              <div>
                <img src="../../assets/img/loading.gif">
                <!--<span>识别结果正在转换中...</span>-->
              </div>
            </div>
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
        tcStatus:"bar", //bar:柱状图,net:网络异常
        tcStyle:{
          lineHeight:"0px"
        },
        costTime:"",
        wordList:[]
      }
    },
    methods: {
      toAnswer () {
        this.$router.push({name: 'answerList'})
      },
      refreshBar(){
        //测试
        let self = this;
        self.tcStatus = "loading";
        let wordList = ["book","England","American","our","Chinese","hi","book","England","American","our","Chinese","hi","book","England","American","our","Chinese","hi","book","England","American","book","England","American"];
        let scores = [33,40,87,20,100,60,33,40,87,20,100,60,33,40,87,20,100,60,87,20,100,60,33,40];
        setTimeout(function () {
          self.tcStatus = "bar";
          self.getBarChart(wordList,scores)
        },1000)
      },
      getBarChart(words,scores){
//        let words = [];
//        let scores = [];
//        for(let i=0;i<wordList.length;i++){
//          words.push(wordList[i].rightAnswer);
//          scores.push(wordList[i].correctRate);
//        }
        //计算柱状图大小
        let screenHeight = window.screen.height;
        let screenWidth = window.screen.width;
        let barHeight = screenHeight - 280 -30 - 50;
        let barWidth = words.length*70 + 160;
        document.getElementById('bar').style.width = barWidth + "px";
        document.getElementById('bar').style.height = barHeight + "px";
        if(barWidth<screenWidth*0.86){
          document.getElementById('bar').style.marginLeft = (screenWidth*0.86-barWidth)/2 + "px";
        }
        document.getElementById('explain').style.left = screenWidth*0.86*0.5 - 140 + "px";
        let myChart = this.$echarts.init(document.getElementById('bar'));
        let option = {
            title: {
            },
            tooltip: {
                show:true
            },
            legend: {
                data: ['bar', 'bar2'],
                align: 'left'
            },
            series: [{
                name: '正确率',
                type: 'bar',
                data: scores,
                markLine : {
                data:[
                    ]
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%',
                    },

                },
                barMaxWidth:40
            }],
            xAxis: {
                data: words,
                axisTick: {
                    show: true
                },
                axisLine: {
                    show: true
                },
                axisLabel :{
                    interval:0,
                    // rotate:30,
                    formatter:function(val){
                        if(val.length>9){
                           return val.substring(0,9)+"...";
                        }else{
                            return val;
                        }
                    }
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}%',
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            visualMap: {
                show:false,
                top: 10,
                right: 10,
                // text:["正确率"],
                pieces: [{
                    gt: 0,
                    lte: 59,
                    color: '#ffbf5e'
                },{
                    gt: 59,
                    lte: 100,
                    color: '#6dd675'
                }],
            },
            legend:{
                width:"1000px",
                align:"right"
            },
            grid : {
                left : 80,    //距离容器上边界40像素
                right: 80   //距离容器下边界30像素
            }
        };
        myChart.setOption(option);
      }
    },
    created(){
      let self = this;
      this.costTime = this.$store.state.costTime || "00:00"
      console.log(self.j0Service);
      self.j0Service.getJ0Token("2000000030000014198").then(function (res) {
        let param = {
          uuid:"2000000030000014198",
          authToken:res.data,
          fileId:"408065847907586048"
        }
        console.log(param);
        self.j0Service.getAnswerDetail(param).then(function (res) {
          console.log(res);
        });
      });


    },
    mounted(){
      let self = this;
      self.tcStatus = "loading";
      let screenHeight = window.screen.height;
      document.getElementById('tc').style.height = screenHeight - 280 -30 + "px";
      self.tcStyle.lineHeight = screenHeight - 280 -30 + 120 + "px";//最后的120要改，试试看
      //网络状态判断
      if(1){
        self.tcStatus = "bar";
        let words = ["book","England","American","our","Chinese","hi","book","England","American","our","Chinese","hi","book","England","American","our","Chinese","hi","book","England","American","book","England","American"];
        let scores = [33,40,87,20,100,60,33,40,87,20,100,60,33,40,87,20,100,60,87,20,100,60,33,40];
        self.getBarChart(words,scores)
      }else {
        self.tcStatus = "net";
      }


    }
  }
</script>

<style>
  .tc1{
    overflow-x:auto;
    overflow-y:hidden;
    margin-top: 30px;
  }
  .explain{
    position:absolute;
    width: 300px;
    left:45%;
  }
  .explain .color1{
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 20px;
    margin-right: 10px;
    background-color: #6dd675;
  }
  .explain .color2{
    width: 20px;
    height: 20px;
    float: left;
    margin-left: 20px;
    margin-right: 10px;
    background-color: #ffbf5e;
  }
</style>
