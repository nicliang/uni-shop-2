<template>
  <view>
    <block v-for="(goods,i) in goodsList" :key='i'>
      <my-goods :goods="goods"></my-goods>
     
    </block>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        requryobj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        // 截流阀门，当在请求数据的时候不不会触发再次请求
        loading:false
      };
    },
    //当页面触底触发是会处理的函数
    // 节流阀：实现思路，
     // 需求1.： 这里不是所有的触底都要发起数据请求所以判断一下
    // 1.首先定义一个loading变量，当在请求数据之前打开截流阀门，请求数据结束后关闭
    // 2.在上来触底的函数中判断一下显示是什么请求数据的什么状态,已经是关闭状态,则可以请求数据
    
    // 需求2：当数据加载完了无需要加载，
    // 实现思路： 用一页多少条数据* 页面 >=总数
    onReachBottom:function(){
      if(this.requryobj.pagenum * this.requryobj.pagesize >=this.total) return uni.$showMeg("数据加载完毕")
      if(!this.loading){
        this.requryobj.pagenum++
        this.getGoodsList()
      }
    },
    //下拉刷新 功能  在pages.jsion 中开启
    // 首先要重置所有因数据加载变化的值
    // 调用获取数的方法，重新获取数据，并在中写一个回调函数停止下拉刷新的界面
    
    onPullDownRefresh:function(){
      this.loading=false,
      this.requryobj.pagenum=1,
      this.requryobj.pagesize=10,
      this.goodList=[]
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    methods:{
      // 这里的cb是关闭下拉刷新的回调函数
      async getGoodsList(cb){
        this.loading=true
        const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.requryobj)
        cb&&cb()
        this.loading=false
        if(res.meta.status!==200) return uni.$showMeg
        // 页面触底要将新旧数据增加到一起展示
        this.goodsList=[...this.goodsList,...res.message.goods]
        this.total = res.message.total
        
        
        
      }
    },
    // option 是跳转携带的参数
    onLoad(option){
      // 这里的用了或者也就是说当前面的参数没有传递的时候，这里传递'',不会让其返回一个undefined
      this.requryobj.query=option.query || ''
      this.requryobj.cid=option.cid || ''
      this.getGoodsList()
    }
  }
</script>

<style lang="scss">

</style>
