// 代码提取，主要功能是设置购物社右上角的图标
import {mapGetters} from 'vuex'
export default{
  computed:{
      ...mapGetters('my_cart',['total'])
    },
  watch:{
    total(){
      this.setBadge()
    }
  },
    onShow() {
     // 在页面刚展示的时候，设置数字徽标
    this.setBadge()
    },
    methods:{
      setBadge(){
        uni.setTabBarBadge({
          // 从左到右那个tabbar 从下标0开始
          index:2,
          // 设置一定要数字符串所有加了''
          text:this.total+''
        })
      }
    }
}