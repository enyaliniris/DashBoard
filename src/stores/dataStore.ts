// stores/dataStore.ts
import { defineStore } from 'pinia'
import { postLISData } from '@/apis/api_data'
import jsonData1 from '@/assets/json/data1.json'
import jsonData2 from '@/assets/json/data2.json'
import { useAuthStore } from './auth'
import type { BoardData } from '@/types/BoardData'

export const useDataStore = defineStore('data', {
  state: () => ({
    rawData: {} as Partial<BoardData>,    // 原始資料
    filteredData: {} as Partial<BoardData>, // 過濾後資料
    useData1: true,                          // 切換假資料旗標
  }),

  actions: {
    async fetchData() {
      const auth = useAuthStore()
      let result: any = {}

      // --- 1本地假資料模式 ---
      if (import.meta.env.VITE_ENV === "development") {
        result = this.useData1 ? jsonData1 : jsonData2
        this.useData1 = !this.useData1
      }
      // --- 2實際 API 模式 ---
      else {
        try {
          const res = await postLISData({
            uid: auth.user?.username || 'guest',
            token: auth.token || '',
          })
          if (res.data.rc === 'M0000') {
            result = res.data.result
          } else {
            console.warn('API 回傳非成功代碼：', res.data.rc)
          }
        } catch (err) {
          console.error('fetchData 錯誤：', err)
        }
      }

      // --- 3儲存原始資料並過濾 ---
      this.rawData = result
      this.filteredData = this.filterByRole(result, auth.user?.roles || [])
    },

    filterByRole(data: Record<string, any>, roles: string[]) {
      console.log("原始資料 keys:", Object.keys(data));

      if (!roles.includes('guest')) return data;

      // 遞迴處理物件或陣列
      function deepFilter(obj: any): any {
        if (Array.isArray(obj)) {
          return obj.map(deepFilter);
        } else if (obj !== null && typeof obj === 'object') {
          return Object.fromEntries(
            Object.entries(obj)
              .filter(([key]) => !key.includes('41'))  // 過濾 key 包含 '41'
              .map(([key, value]) => [key, deepFilter(value)])
          );
        } else {
          return obj;
        }
      }

      const filtered = deepFilter(data);
      console.log("過濾後資料 keys:", Object.keys(filtered));
      return filtered;
    }
  },
})
