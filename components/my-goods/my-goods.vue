<template>
    <view class="goods-item" @click="gotodetail(goods)">
      <view class="goods-item-left">
       <radio :checked ="goods.goods_state" @click.stop="Usercheck" v-if='showRadio' color="orange"></radio>
        <image :src="goods.goods_small_logo||defaultPics"  
         class="item-left-img"></image>
       </view>
      <view class="goods-item-right">
        <view class="good-name">{{goods.goods_name}}</view>
        <view class="goods-price-info">
          <text>￥{{goods.goods_price| tofixed}}</text>
          <view class="" @click.stop >
            <uni-number-box :value="goods.goods_count" v-if='showRadio'  @change="bindChange" :min="1" ></uni-number-box>
          </view>
        </view>
        
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
      },
      showRadio:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        ShowChecked:true,
          defaultPics: 'http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000605979872_2_400x400.jpg',
          goods_count: this.goods.goods_count
      };
    },
    filters:{
      tofixed(num){
       return Number(num).toFixed(2)
      }
    },methods:{
      gotodetail(item){
      
        uni.navigateTo({
          url:'/subpkg/goods-detail/goods-detail?goods_id='+item.goods_id
        })
      },
      Usercheck(){
        // 为了父级点击触发事件
        this.$emit('radio_checkout',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      bindChange(val){
       console.log(val) 
       
        this.$emit('number_change',{
          goods_id:this.goods.goods_id,
          goods_count: val-0 //转换成数字类型
        })
        // console.log(this.$refs.chak) 
        // event.stopPropagation()
        // this.$emit.stop('number_change')
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    border: 2px solid #f0f0f0;
    display: flex;
    padding: 10px 5px;
    .goods-item-left{
      display: flex;
      align-items: center;
      .item-left-img{
        width: 100px;
        height: 100px;
        margin-right: 8px;
        display: block;
      }
    }
    .goods-item-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .good-name{
        font-size: 13px;
      }
      .goods-price-info{
        display: flex;
        justify-content: space-between;
        text{
          font-size: 18px;
          color:red;
        }
        
        // .numbox-style{
        //   background-color: #9f9f9f;
        //   border: 1px solid #9f9f9f;
        // }
      }
    }
  }
  
</style>