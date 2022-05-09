<!-- 需求:1.选中所有购物车的商品，全选自动选中
         2.反选
         1.思路：用全选的总数和购物车所有商品的总数对比，如果有一项没有选择，反选自动取消
         2.思路：用反选的状态更新，所有商品选择中的状态
      注意：radio 选中或不能取消，但可以以其他数据来带动这个选项的变化，比如：vuex后端获取来的数据，修改vuex的值来变化取消和选中
 -->
<template>
  <view class="settle-container">
    <view class="settle-content">
      <view class="">
        <radio :checked="checkAllState"  @click="changeState"></radio>
        <text>全选 </text>
      </view>
      <view class="goods-price-settle">
        <view class="">
          合计:￥ <text>{{CountGoodsPrice}}</text>
        </view>
        <button type="warn" size="mini" class="settle-button">结算({{checkAll}})</button>
      </view>
    </view>
  </view>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('my_cart',['checkAll','total','CountGoodsPrice']),
      checkAllState(){
        return this.checkAll === this.total
      }
    },
    methods:{
      ...mapMutations('my_cart',['updateAllChoose']),
      changeState(){
        this.updateAllChoose(!this.checkAllState)
        // console.log(this.checkAllState)
      }
    }
  }
</script>

<style lang="scss">
.settle-container{
  position: fixed;
  bottom: 0;
  left:0;
  right:0;
  padding: 0 5px;
  .settle-content{
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    height: 50px;
    border-top: 1px solid #efefef;
    .goods-price-settle{
      display: flex;
      align-items: center;
      // flex-direction: column;
      .settle-button{
        margin-left: 5px;
        line-height: 50px;
        height: 50px;
         
         background-color: #c00000;
         color:#fff;
         font-size: 20px;
         button{
           min-width: 200rpx;
         }
      }
    }
    
  }
}

</style>