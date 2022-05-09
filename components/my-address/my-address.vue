<template>
  <view>
    <button type="primary"  size="mini" v-if="JSON.stringify(address)==='{}'" @click="addAddress" class="address-button">
      <uni-icons type="plusempty" style="margin-right: 5px;;" ></uni-icons>
      增加收货地址
    </button>
    <view class="adress-content" @click="addAddress" v-else>
      <view class="user-info">
        <view class="user-name">
           <text style="margin-right: 5px;">收获人:</text>
           <text>{{address.userName}}</text>
        </view>
        
         <view style="min-width:400rpx;">
            <text style="margin-right: 5px;">手机号:</text>
            <text>{{address.telNumber}}</text>
         </view>
      </view>
      <view class="">
        收获地址： {{addres}} 
      </view>
    </view>
  
  </view>
</template>

<script>
import {mapState,mapMutations,mapGetters}  from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address:[]
      };
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      async addAddress(){
       const [fail,succ] = await uni.chooseAddress().catch((fail) => fail)
       // errMsg: "chooseAddress:ok"
       if(fail === null && succ.errMsg === 'chooseAddress:ok'){
           this.updateAddress(succ)
           console.log(this.address)
       }
      //'chooseAddress:fail auth deny 判断的是小程序和安卓上是否授权，chooseAddress:fail authorize no response 判断的是苹果手机是否授权
        // 3. 用户没有授权
        if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
          this.reAuth()
        }
      },
      async reAuth(){
         const [err2, confirmResult]= await uni.showModal({
           content: '检测到您没打开地址权限，是否去设置打开？',
           confirmText: "确认",
           cancelText: "取消",
        })
         // 3.2 如果弹框异常，则直接退出
        if (err2) return

        // 3.3 如果用户点击了 “取消” 按钮，则提示用户 “您取消了地址授权！”
        if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        // 3.4 如果用户点击了 “确认” 按钮，则调用 uni.openSetting() 方法进入授权页面，让用户重新进行授权
       if (confirmResult.confirm) return uni.openSetting({
      // 3.4.1 授权结束，需要对授权的结果做进一步判断
      success: (settingResult) => {
        // 3.4.2 地址授权的值等于 true，提示用户 “授权成功”
        if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
        // 3.4.3 地址授权的值等于 false，提示用户 “您取消了地址授权”
        if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
      }
    })

      }
    },
    computed:{
      // ...mapState('m_user',['address']),
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user',['addres'])
    }
  }
</script>

<style lang="scss">
  .address-button{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 15px 0;
  }
.adress-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  .user-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name{
      margin-bottom: 8px
    }
  }
  
}
</style>