<template>
  <view class="">
    <!-- 搜索框 -->
    <view class="search-index-box">
      <uni-search-bar  @input="input" cancelButton="none" 
       class="search-input" :radius="18">
       </uni-search-bar>
    </view>
    <!-- 搜索建议 -->
    <view class="goods-list" v-if="searchResults.length!==0">
        <view class="goods-items" v-for="(item,i) in searchResults" :key="i" @click.native ="gotodetail(item.goods_id)">
       
          <view class="goods_name">{{item.goods_name}}</view>
           <uni-icons type="forward" size="20"></uni-icons>
        </view>
    </view>
    <!-- 搜索历史 -->
    <view v-else class="history-box"  >
        <view class="history-box-title">
          <text>搜索历史</text>
          <uni-icons type="trash" size="20" @click="clearHistoryData"></uni-icons>
        </view>
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotogoodslist(item)" class="history-box-content">
           
        </uni-tag>
    </view>
    
  
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchResults:[],
        // 定时器的id用于清除使用
        timer:null,
        // 因为value是
        kw:'',
        searchHistory:[]
        
      };
    },
    onLoad(){
      // 持久化 获取storage数据
     this.searchHistory= JSON.parse(uni.getStorageSync('kw')||'[]') 
    },
    methods:{
      input(value){
       // 用定时器防抖 清除延迟器
        clearTimeout(this.timer)
        this.timer= setTimeout(()=>{
          this.kw=value
         // console.log(value) 
         this.getSearchList()
        },500)
      },
      async getSearchList(){
        if (this.kw){
         const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
         this.searchResults=  res.message
         this.gethistory()
        }else{
          this.searchResults=[]
        }
      },
      gotodetail(goods_id){
        console.log(goods_id)
        uni.navigateTo({
            // 指定详情页面的 URL 地址，并传递 goods_id 参数
            url: '/subpkg/goods-detail/goods-detail?goods_id=' + goods_id,
            fail: (res) => {
                console.log(res)//打印错误信息
              }
          })
          
    },
    gethistory(){
      this.searchHistory.push(this.kw)
      const set = new Set(this.searchHistory)
      set.delete(this.kw)
      set.add(this.kw)
      // 复习array 的方法
      this.searchHistory= Array.from(set)
      // 数据持久化，设置storage的数据
      uni.setStorageSync('kw',JSON.stringify(this.searchHistory))
    },
    // 清空历史记录
    clearHistoryData(){
      this.searchHistory=[]
      uni.setStorageSync('kw','[]')
    },
    gotogoodslist(kw){
      uni.navigateTo({
        url:'/subpkg/goods-list/goods-list?query='+kw
      })
    }
  },
  computed:{
    histories(){
      return  [...this.searchHistory].reverse()
    }
  }
  }
</script>

<style lang="scss">
.search-index-box{
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #c00000;
  height: 50px;
  .uni-searchbar__box{
    height: 36px;
    border-radius: 18px;
  }
}
// .searchResult-list{
//    table-layout: fixed;//表格布局：固定
//   width: 100%;
.goods-list{
  padding: 0 5px;
  .goods-items{
     font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .goods_name{
            // 文本不允许换行
            white-space: nowrap;
            // 溢出部分隐藏
            overflow: hidden;
            // 文字溢出用...替换
            text-overflow:ellipsis;
        }
  }
}
 .history-box{
   .history-box-title{
     height: 30sspx;
     display: flex;
     justify-content: space-between;
     align-items: center;
     border-bottom: 1px solid #efefef;
   }
   .history-box-content{
     // display: flex;
     margin: 5px;
     .uni-tag{
        background-color: #efefef;
        color: #000000;
     }
    
     
   }
 }

</style>
