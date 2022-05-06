
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入网络请求包
import { $http } from '@escook/request-miniprogram'  
uni.$http = $http
// https://www.escook.cn
//https://api-ugo-web.itheima.net
// https://www.uinav.com
$http.baseUrl="https://www.escook.cn"
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  // console.log(options)
  wx.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function (response) {


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