export default{
  namespaced:true,
  state: () => ({
    address:JSON.parse(uni.getStorageSync('address')||'{}') ,
  }),
  mutations:{
    updateAddress(state,address){
      state.address=address
      this.commit('m_user/SaveAddressStorage')
    },
   SaveAddressStorage(state){
     uni.setStorageSync('address',JSON.stringify(state.address))
   }
  },
  getters:{
    addres(state){
      if(state.address.provinceName){
        return state.address.provinceName+ state.address.cityName+ state.address.countyName+ state.address.detailInfo+ state.address.postalCode
      }
      return ''
    }
  }
}