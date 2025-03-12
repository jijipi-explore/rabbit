// 封装banner轮播图
import { onMounted, ref } from 'vue'
import { getBannerApi } from '@/apis/home'
export function useBanner() {
  const bannerList = ref([]);

  const getBanner = async () => {
    const res = await getBannerApi({
      distributionSite: '2'
    });
    bannerList.value = res.data.result;
  }

  onMounted(() => {
    getBanner();
  });

  return { bannerList };
}