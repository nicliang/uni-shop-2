<template>
  <view class="search-container" @click="searchClick">
    <view class="search-button">
      <uni-icons type="search" size="20"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      searchClick(){
        console.log("children")
        this.$emit("click")
      }
    }
  }
</script>

<style lang="scss">
.search-container{
   display: flex;
   justify-content: center;
   align-items: center;
   height: 50px;
   background-color: #C00000;
  .search-button{
    display: flex;
    justify-content: center;
    align-items: center;
   height: 36px;
   background-color: #fff;
   border-radius: 18px;
   width: 100%;
   margin: 5px;
   // box-sizing: border-box;
   uni-icons{
     margin-right: 5px;
   }
  }
}
</style>