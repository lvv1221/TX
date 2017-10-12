<template>
<div>
  <button class="pop-state"><i class="icon iconfont">&#xe650;</i>{{time}}</button>
</div>
</template>

<script>
  export default {
    name: 'timeTool',
    data () {
      return {
        time: '未开始',
        tool: '',
        m: 0,
        s: 0
      }
    },
    methods: {
       startTime() {
         this.m = this.checkTime(this.m)
         this.s = this.checkTime(this.s)
         this.time = this.m+":"+ this.s
         this.tool = setInterval (() => {
           this.s++
           if (this.s === 60) {
             this.m++
             this.s = 0
           }
           this.m = this.checkTime(this.m)
           this.s = this.checkTime(this.s)
           this.time = this.m+":"+ this.s
         },1000)
      },
      checkTime(i)  {
        if (i<10) {
        i="0" + parseInt(i)
        }
        return i
      },
      stopTime () {
        clearInterval(this.tool)
        return this.time
      }
    }
  }
</script>

<style>

</style>
