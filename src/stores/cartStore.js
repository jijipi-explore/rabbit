// 封装购物车模块
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // 1. 定义state - 购物车数组
  const cartList = ref([])
  // 2. 定义actions - 加入购物车
  const addCart = (goods) => {
    // 已添加过 count+1
    // 没有添加 直接push
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if(item){
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }

  // 删除购物车
  const delCart = (skuId) => {
    const index = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(index, 1)
  }

  return { cartList, addCart, delCart }
}, {
  persist: true
})