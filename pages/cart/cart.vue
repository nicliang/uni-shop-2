<template>
  <view class="">
   
     <view class="shop-container" v-if="cart.length!==0">
       <view class="">
         <my-address></my-address>
         <image src="/static/cart_border@2x.png" class="cart_border"></image>
       </view>
       
      <view class="shop-title-content">
        <uni-icons type="shop" size="20"></uni-icons>
        <text>购物车 ({{cart.length}}) </text>
      </view>
     
       
      <uni-swipe-action>
         <block v-for="(goods,i) in cart" :key="i">
           <uni-swipe-action-item :right-options="options" @click="delSwipItem(goods)">
             <!-- <my-goods :goods="item"></my-goods> -->
               <!-- 执行过程 这里调用my-goods组件
                内部调用radio的click 来修改项目选择和取消的状态值，更新到vuex 由于再有watch监听
                当数据变化则更新数据，这里的数据此时渲染的是vuex的数据，所有会随之改变选择/取消状态
                -->
                <my-goods :goods="goods" :showRadio="true" @number_change="NumberChangeHandler" @radio_checkout="radioChangeHandler">
                  <uni-section title="基本用法" type="line" padding>
                        <uni-number-box @change="changeValue" />
                      </uni-section>
                </my-goods>
        
           </uni-swipe-action-item>
         </block>
      </uni-swipe-action>
      
      <my-settle ></my-settle>
     </view>
     <view class="NotShop" v-else>
       <image src="/static/cart_empty@2x.png" ></image>
       <text>空空如也~</text>
     </view>
  </view>
</template>

<script>
import {mapState,mapMutations}   from 'vuex'
import mixins from '@/mixins/mixins.js'
  export default {
    mixins:[mixins],
    data() {
      return {
        options:[
                {
                    text: '删除',
                    style: {
                        backgroundColor: '#C00000'
                    }
      }]
    }},
    computed:{
     
      ...mapState('my_cart',['cart'])
    },
    methods:{
      ...mapMutations('my_cart',['updateGoodsState','updateGoodsCount','removeGoods']),
      radioChangeHandler(e){

        this.updateGoodsState(e)
      },
      NumberChangeHandler(e){
      this.updateGoodsCount(e)
     
      },
      delSwipItem(goods){
        
        this.removeGoods(goods)
      }
    }
  }
</script>

<style lang="scss">
.shop-container{
  background-color: #fff;
  padding: 10px 5px;
  .cart_border{
    width: 100%;
    height: 5px;
  }
  .shop-title-content{
    height: 100rpx;
    line-height: 100rpx;
    border-bottom: 1px solid #9d9d9d;
     text{
       margin-left: 5px;
     }
  }
}
.NotShop{
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin-top: 150px;
  image{
    height: 90px;
    width:90px;
    margin-bottom: 15px;
  }
}
</style>
