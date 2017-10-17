<template>
  <div>
  <div class="fullpop-prompts">
    <div class="prompts-left clearfix" style="width:960px">
      <div class="prompts-dcm fl">单词5</div>
      <div class="prompts-progressbar fl" style="width: 780px;"><p :style="processStyle"></p></div>
      <div class="prompts-yzd fl">已作答<span class="red">{{students.yStudents.length}}人</span></div>
    </div>
    <div class="prompts-line"><em></em></div>
    <div class="prompts-right">
      <button class="btn-gray" @click="showList">未作答名单</button>
      <div class="prompts-bubble" v-if="isShowNameList">
        <div class="prompts-bubblecon">
          <div class="prompts-bubblescroll">
            <div class="tc mb-5"><strong>未作答名单（{{students.nStudents.length}}）</strong></div>
            <div class="clearfix">
              <span v-for="stu in students.nStudents"><a href="#">{{stu.name}}</a></span>
            </div>
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
        isShowNameList: false,
        processStyle:{
          width:""
        },
        students:{
          yStudents:[],
          nStudents:[],
          aStudents:[]
        }
      }
    },
    created(){
      let self = this;
      let aStudents =[{name:"测试名1",isWrite:false},{name:"测试名2",isWrite:true},{name:"测试名3",isWrite:false},{name:"测试名4",isWrite:false}];
      for(let i=0;i<aStudents.length;i++){
        if(aStudents[i].isWrite){
          self.students.yStudents.push(aStudents[i]);
        }else {
          self.students.nStudents.push(aStudents[i]);
        }
      }
      self.students.aStudents = aStudents;
      self.processStyle.width = self.students.yStudents.length/self.students.aStudents.length *100 + "%";
    },
    methods: {
      finishDic () {
        this.$emit('finish')
      },
      showList () {
        this.isShowNameList = !this.isShowNameList
      }
    }
  }
</script>

<style>

</style>
