<template>
   <div class="header">
       <img src="/static/icons/left.png" alt=""  @click="back">
       <span>{{title}}</span>
   </div>
</template>
<script>
export default {
     props: ['title'],
     methods:{
         back: function(){
             history.back(-1);
         }
     }
}
</script>
<style scoped>
.header{
    padding: 10px 40px 10px 40px;
    height: 40px;
    text-align: center;
    line-height: 25px;
    background: #FFF;
}
img{
    float: left;
    width: 20px;
    margin-left: -25px;
    height: auto;
}
</style>
