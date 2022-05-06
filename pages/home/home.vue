<template>
  <view>
    <!-- 这里的搜索需要吸顶操作定义在样式search-box表里 -->
    <view class="search-home-box">
      <my-search @click="gotosearch"></my-search>
    </view>
    
    <!-- 轮播图 -->
   <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
     <swiper-item v-for="(item,index ) in swiperList"  :key="item.goods_id">
       <navigator class="swiper-item" :url="'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id">
          <image :src="item.imagesrc" style="width: 100%;height: 100%;"></image>
       </navigator>
     </swiper-item>
   </swiper>
   <!-- 分类导航 -->
  <view class="nav-list">
     <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
       <image :src="item.imagesrc" class="nav-img"></image>
     </view>
   </view>
   <!-- 楼层title -->
  <view class="" v-for="(item,i) in floorList" :key='i'>
    <image :src="item.floor_title.imagesrc"  class="foor-title"></image>
    <!-- 楼层内容部分 -->
    <view class="floor-img-box">
      <!-- 楼层左边部分 -->
      <navigator class="foor-item-left" :url="item.product_list[0].url">
        <image :src="item.product_list[0].imagesrc"  :style="'width:'+item.product_list[0].image_width+'rpx'" mode="widthFix"></image> 
     </navigator>
     <view class="foor-item-right">
       <navigator v-for="(itms,ims) in item.product_list"  :key="ims" v-if="ims!==0"  :url="itms.url">
         <image :src="itms.imagesrc" mode=""  :style="'width:'+itms.image_width+'rpx'" mode="widthFix"></image>
       </navigator>
     </view>
     
    </view>
  </view>
  

  </view>
  
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        floorList:[],
        message:''
      };
    },
    onLoad(){
      this.getSwiperList(),
      this.getNavList()
      this.getFoolsList()
    },
    methods:{
      async getSwiperList(){
        // 发送请求，结构出data 并重名名为res
        const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status!==200) return uni.$showMeg()
       res.message.forEach(item=>{
         // replice('157.122.54.189:9090','210.21.98.31:6005')
         item.imagesrc='http://210.21.98.31:6005/pyg'+item.image_src.split('pyg')[1]
         // console.log(item.imagesrc)
       })

          this.swiperList = res.message
          // console.log(this.swiperList.join("")) 
          // console.log(res.message[0].image_src)
          var new_list= []
                 
          // uni.$showMeg("数据加载成功")
    
       
      },
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200) return uni.$showMeg()
        res.message.forEach(item=>{
          // replice('157.122.54.189:9090','210.21.98.31:6005')
          item.imagesrc='http://210.21.98.31:6005/pyg'+item.image_src.split('pyg')[1]
          // console.log(item.imagesrc)
        })
           this.navList = res.message
        
       
        
      },
      navClickHandler(item){
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
     async getFoolsList(){
       const {data:res} =await uni.$http.get("/api/public/v1/home/floordata")
       if(res.meta.status !== 200) return uni.$showMeg()
        if(res.message){
          res.message.forEach(floor=>{
              floor.product_list.forEach(prod=>{
                prod.url='/subpkg/goods-list/goods-list?'+prod.navigator_url.split('?')[1]
                prod.imagesrc='http://210.21.98.31:6005/pyg'+prod.image_src.split('pyg')[1]
                // console.log(prod.imagesrc)
               
              })
            })
          this.floorList = res.message
          
        }
         
     },
    gotosearch(){
      uni.navigateTo({
        url:'/subpkg/search/search'
      })
    }
    }
  }
</script>

<style lang="scss">
  swiper{
    height: 330rpx;
    .swiper-item{
      width: 100%;
      height: 100%;
      background-color: pink;
    }
  }
.nav-list{
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
}
.foor-title{
    height: 60rpx;
    width: 100%;
    display: flex;
}
.floor-img-box{
  display: flex;
  padding-left: 10rpx;
  
}
.foor-item-right{
    display: flex;
    // flex: 1;
    flex-wrap: wrap;
    justify-content: space-around;
  }
.foor-item-left{
  display: flex;
}
.search-home-box{
  // 吸顶样式
  position: sticky;
  // 吸顶位置
  top: 0;
  z-index: 999;
}
</style>
