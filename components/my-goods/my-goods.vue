<template>
 <view class="goods-item" @click="gotodetail(goods)">
   <view class="goods-item-left">
   
     <image :src="goods.goods_small_logo||defaultPics"  
      class="item-left-img"></image>
    </view>
 <view class="goods-item-right">
   <view class="good-name">{{goods.goods_name}}</view>
   <text>￥{{goods.goods_price| tofixed}}</text>
 </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        
          defaultPics: 'http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000605979872_2_400x400.jpg'
      };
    },
    filters:{
      tofixed(num){
       return Number(num).toFixed(2)
      }
    },methods:{
      gotodetail(item){
        console.log(item)
        uni.navigateTo({
          url:'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    border: 2px solid #f0f0f0;
    display: flex;
    padding: 10px 5px;
    // flex-wrap: wrap;
    .goods-item-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .good-name{
        font-size: 13px;
      }
      text{
        font-size: 18px;
        color:red;
      }
    }
    
    .item-left-img{
      width: 100px;
      height: 100px;
      margin-right: 5px;
      display: block;
    }
  }
</style>