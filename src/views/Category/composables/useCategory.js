// 封装分类
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { getTopCategoryAPI } from '@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute();
  const categoryData = ref({});

  const getCategory = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.data.result;
  };

  onMounted(() => {
    getCategory();
  });

  onBeforeRouteUpdate((to)=>{
    // 存在问题：使用最新的路由参数，但是getCategory()方法中，还是使用旧的路由参数
    getCategory(to.params.id);
  })

  return { categoryData }
}
