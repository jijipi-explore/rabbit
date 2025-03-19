// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '@/apis/user'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()

  // 1.定义管理数据的state
  const userInfo = ref({})
  // 2.定义管理行为（函数）的actions
  const getUserinfo = async ({account, password}) => {
    // 获取用户信息
    const res = await loginApi({account, password})
    userInfo.value = res.data.result
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清空购物车的action
    cartStore.clearCart()
  }
  // 3.返回state和actions
  return { userInfo, getUserinfo, clearUserInfo }
}, {
  persist: true
})