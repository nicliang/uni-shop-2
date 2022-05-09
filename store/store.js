import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart'
import modulesUser from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    my_cart:moduleCart,
    m_user:modulesUser
  }
})
export default store