<template>
  <view>
    <view class="scroll-content" >
      <scroll-view scroll-y="true" :style="{height:wh +'px'}" class="scroll-left">
        <block v-for="(item,i) in catelist" :key="i">
             <view :class="['left-scroll-view-item' ,i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <scroll-view :scroll-y="scrollTop" class="scroll-right" :style="{height:wh +'px'}">
        <view class="" v-for="(items2,i2) in cateLevel2" :key="i2">
          <view class="cateLevel2-title">/{{items2.cat_name}}/</view>
          <view class="cate-lv3-item3">
            <view class="cate-lv3-item" v-for="(item3,i3) in items2.children" @click="gotocatelist(item3)">
              <image :src="item3.cat_icon" ></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>

        </view>
      </scroll-view>s
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh:0,
        catelist:[],
        active:0,
        cateLevel2:[],
        // 切换一级类目 二级滚动条置顶
        scrollTop:0
      };
    },
    onLoad(){
      const sysinfo= uni.getSystemInfoSync()
      this.wh=sysinfo.windowHeight
      // 调用获取分类列表数据的方法
        this.getCateList()
    },
    methods:{
      async getCateList(){
       const {data : res} = await uni.$http.get('/api/public/v1/categories')
       if(res.meta.status!==200) return uni.showMeg()
       this.catelist=res.message
       this.cateLevel2= res.message[0].children
      },
      activeChanged(i){
        this.active=i
        this.cateLevel2=this.catelist[i].children
        this.scrollTop=this.scrollTop===0?1:0
      },
      gotocatelist(item){
        // console.log(item)
        uni.navigateTo({
          url:'/subpkg/goods-list/goods-list?cid='+item.cat_id
        })
      }
      
    }
  }
</script>

<style lang="scss">
.scroll-content{
  // height: 300px;
  display: flex;
  .scroll-left{
    width: 120px;
    .left-scroll-view-item{
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: #efefef;
      &.active{
        background-color: #fff;
        position: relative;
        &::before{
          content: '';
          display: block;
          height: 30px;
          width: 2px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cateLevel2-title{
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.scroll-right{
  background-color: #fff;
  .cate-lv3-item3{
    display: flex;
   
    flex-wrap: wrap;
    .cate-lv3-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
       width: 33%;
       margin-bottom: 5px;
     
      image{
        width: 60px;
        height: 60px;
      }
      text{
        font-size: 12px;
      }
    }
  }
}


</style>
