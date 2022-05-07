<template>
  <view class="">
    <!-- 这里的v-if解决数据没有获取之前返回undefined的问题 -->
    <view v-if="goodsdetail.goods_name" class="goods-describe-content">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <!-- goods_big_logo -->
        <swiper-item  v-for="(item,i) in goodsdetail.pics" :key="i" >
                    <image :src="item.pics_big" class="swiper-item-pic" @click="preview(i)"></image>
        </swiper-item>
      </swiper>
      
      <view class="goods-intro-info">
        <!--商品价格 -->
        <view class="goods-price">
         ￥{{goodsdetail.goods_price}}
        </view>
        <!-- 商品title标题 -->
        <view class="goods-name">
          <view class="">{{goodsdetail.goods_name}}</view>
          <view class="goods-star">
            <uni-icons type="star" size="20"></uni-icons>
             <text>收藏</text>
           </view>
        </view>
        <!-- 运费 -->
        <view class="goods-express">
          快递：<text>免运费</text>
        </view>
      </view>
      <!-- 渲染商品详情页 -->
      <!-- 可以在这里渲染html标签 -->
      <rich-text :nodes="goodsdetail.goods_introduce"></rich-text>
    </view>
    <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"  @buttonClick="buttonClick" class="goods-bottom-nav" />
   
  </view>
 
</template>

<script>
  export default {
    data() {
      return {
        goodsdetail:{},
         options: [ {
        			icon: 'shop',
        			text: '店铺',
        			infoBackgroundColor:'#007aff',
        			infoColor:"red"
        		}, {
        			icon: 'cart',
        			text: '购物车',
        			info: 66
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#fff'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ]
      };
    },
    onLoad(option){
      const goods_id = option.goods_id
      this.getdetail(goods_id)
      
    },
    methods:{
      async getdetail(goods_id){
        // 这里get内部 可以用拼接的方法接收参数也行，或者用地址后面用逗号分隔传一个对象
       const {data:res}= await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
       if(res.meta.status!==200) return uni.$showMeg()
       // 修改带有html标签的返回值替换字符 利用行内标签修改图片之前的间隙
       // 注意：webp在ios上不兼容，用replace替换成.jpg
       res.message.goods_introduce =res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g,'jpg')
       this.goodsdetail=res.message
       // console.log( res)
      },
      preview(i){
        // 图片预览api
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current:i,
          // 循环数组中的大图
          urls:this.goodsdetail.pics.map(x=>x.pics_big)
        })
      },
      onClick(e){
        console.log(e)
        if(e.content.icon==='cart'){
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
        
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;

  image {
    width: 100%;
    height: 100%;
  }
}
.goods-describe-content{
  padding-bottom:50px ;
}
.goods-intro-info{
  padding:20px 5px ;
   .goods-price{
     font-size: 18px;
     color: red;
   }
   .goods-name{
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 13px;
     margin: 5px 0;
     .goods-star{
       display: flex;
       flex-direction: column;
       align-items: center;
       width: 210rpx;
       margin-left: 5px;
       border-left: 1px solid #a3a3a3;
      
       text{
         font-size: 12px;
       }
     }
   }
   .goods-express{
     font-size: 12px;
     color:#a3959b
   }
}
.goods-bottom-nav{
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
