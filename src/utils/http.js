import axios from 'axios';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', 
  timeout: 5000, // 请求超时时间
});

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 1.从pinia获取token数据
  const userStore = useUserStore()
  // 2.按照后端要求拼接数据
  const token = userStore.userInfo.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  const userStore = useUserStore()
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 统一错误提示
  ElMessage({
    message: error.response.data.message,
    type: 'warning',
  })
  // 401token失效处理
  if(error.response.status === 401){
    // 清除本地用户数据
    userStore.clearUserInfo()
    // 跳转到登录页面
    router.push('/login')
  }
  return Promise.reject(error);
});

export default httpInstance;
