// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lasyPlugin = {
  install (app){
    app.directive('img-lazy', {
      mounted(el, binding){
        // el: 指令绑定的元素
        // binding: 指令绑定的值 {value: '图片地址'}
        const { stop } = useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            if(isIntersecting){
              el.src = binding.value
              stop() // 停止监听
            }
          },
        )
      }
    })
  }
}