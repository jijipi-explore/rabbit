import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getCategoryApi } from '@/apis/layout';

export const useCategoryStore = defineStore('category', () => {
  // 导航列表数据管理
  const categoryList = ref([]);

  const getCategory = async () => {
    const res = await getCategoryApi();
    categoryList.value = res.data.result;
  }

  return { categoryList, getCategory };
})
