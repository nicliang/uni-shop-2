
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入网络请求包
import { $http } from '@escook/request-miniprogram'  
uni.$http = $http
// https://www.escook.cn
//https://api-ugo-web.itheima.net
$http.baseUrl="https://www.uinav.com"
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  // console.log(options)
  wx.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function (response) {
  response.data.message.forEach(item=>{
   
   //  Object.keys(item).forEach(key=>{
      
      
   //    if(key==="image_src"){
   //     var str = item[key]
   //     const reg = new RegExp('157.122.54.189:9090','g')
   //     item[key].image_src = str.replace(reg,"www.uinav.com")
   //     console.log(item[key].image_src,'dafd')
   //     return item[key].image_src
   //      console.log(item[key],'完成')
   //    }else{
        
   //       if (item[key].nv_length){
   //         Object.keys(item[key]).map(ites=>{
   //           // console.log(item[key][ites].image_src)
   //         })
   //           // item[key].forEach(itms=>console.log(itms))
   //       }
        
   //      // if(typeof item[key] === 'object'){
   //      //   console.log(item[key], typeof item[key], '未完成')
   //      //  Object.keys(item[key]).forEach(itcs =>console.log(itcs))
   //      // }
     
        
   //       // Object.keys(key).forEach(itss=>{
   //       //   console.log(itss)
   //       // })__proto__
   //      }
   //    // if((typeof item[key]) === Array ){
   //    //    console.log(item[key],'test')
   //    // }else{
   //    //   console.log(item[key],'test1')
   //    // }
     
   //  })
   //  // console.log(item)
   //  // const str =item.image_src
   //  // const reg = new RegExp('157.122.54.189:9090','g')
   //  //  item.image_src = str.replace(reg,"www.uinav.com")
     
   //  // return item.image_src
  }
  )
  uni.hideLoading()
}

// 封装一个弹出提示消息方法
uni.$showMeg=function(title="数据加载失败",duration=1500){
  uni.showToast({
    title,
    // 持续时间毫秒
    duration,
    icon:"none"
  })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif