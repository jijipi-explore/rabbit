// 封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)


  // 1. 定义state - 购物车数组
  const cartList = ref([])
  // 2. 定义actions - 加入购物车
  const addCart = async (goods) => {
    const {skuId, count} = goods

    // 已添加过 count+1
    // 没有添加 直接push

    if(isLogin.value) {
      // 登录之后的加入购物车逻辑
      await insertCartAPI({skuId, count})
      const res = await findNewCartListAPI()
      cartList.value = res.data.result
    } else {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if(item){
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = (skuId) => {
    const index = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(index, 1)
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => skuId === item.skuId)
    item.selected = selected
  }

  // 全选功能
  const checkAll = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  // 计算属性
  // 总的数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 已选择数量
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))
  // 已选择商品合计
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isCheckAll = computed(() => cartList.value.every((item) => item.selected))

  return { cartList, allCount, allPrice, isCheckAll, selectedCount, selectedPrice, addCart, delCart, singleCheck, checkAll }
}, {
  persist: true
})