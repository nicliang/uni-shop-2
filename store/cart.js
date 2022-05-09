export default {
   namespaced: true,
   
   state:()=>({
     cart:  JSON.parse(uni.getStorageSync('cart') || '[]')
   }),
   mutations:{
     addToCart(state,goods){
       // 没有返回undefined 取反，返回值是true
       // 思路：在增加购物车之前先判断有没有这个数据，有则增加，没有则加入购物
       const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
       this.commit('my_cart/saveToStorage')
    
      
       // 没有将追加数组
       if(!findResult){
         
         state.cart.push(goods)
       }else{
      
         // 有的话，将为购物车里的商品数量+1
         // 这里用了常量的特性，const会将state.cart的物理地址给了findResult，当
         // findResult发生变化时,state.cart的数据也会变化
         findResult.goods_count++
         
       }
     },
     saveToStorage(state){
       uni.setStorageSync('cart',JSON.stringify(state.cart))
     },
     // 更新单个商品选中的状态
     updateGoodsState(state,goods){
       const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
       // console.log(findResult,'22')
       if(findResult){
         findResult.goods_state=goods.goods_state
         this.commit('my_cart/saveToStorage')
       }
     },
     // 更新购物车每一个产品的加购的数量
     updateGoodsCount(state,goods){
       const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
       // console.log(findResult,'22')
       if(findResult){
         findResult.goods_count=goods.goods_count
         this.commit('my_cart/saveToStorage')
       }
     },
     // 左滑动删除的动作
     removeGoods(state,goods){
       state.cart = state.cart.filter(x=>x.goods_id!== goods.goods_id)
      this.commit('my_cart/saveToStorage')
     },
     // 更新所有商品的选中状态
     updateAllChoose(state,newstate){
       state.cart.forEach(x=>x.goods_state=newstate )
        this.commit('my_cart/saveToStorage')
     }
   },
   
   getters:{
     // 统计购物车商品的个数
     total(state){
      //  let c=0
      // state.cart&&state.cart.forEach(x=>c+=x.goods_count)
      //   return c
      // 这个0只会在第一次循环 的时候会生效
      return state.cart.reduce((total,item)=>total+=item.goods_count,0)
     },
     // 统计所有选中商品的个数
     checkAll(state){
     return state.cart.filter(item=>item.goods_state).reduce((total,its)=>total+=its.goods_count,0)
     },
     // 统计所有选中商品的价格
     CountGoodsPrice(state){
       return state.cart.filter(x=>x.goods_state).reduce((price,item)=>price+=item.goods_price*item.goods_count,0).toFixed(2)
     }
      },
  
  
}