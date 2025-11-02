// stores/global.ts
import { defineStore } from 'pinia'

interface GlobalState {
  departmentLabels: string[]  // 對應 10,20,30,40,41
  departmentColors:string[] 
}

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => ({
    departmentLabels: ["研發部", "行銷部", "客服部", "專案部", "支援部"],
    departmentColors:["linear-gradient(127deg, #66D4E5 5.97%, #01859A 102.98%)",
  "linear-gradient(127deg, #6060F0 5.97%, #01859A 102.98%)",
  "linear-gradient(127deg, #6060F0 5.97%, #01859A 102.98%)",
  "linear-gradient(90deg, #F8D060 -18.98%, #FF7D61 113.88%)",
  "linear-gradient(90deg, #30E0D0 -18.98%, #00AD9D 113.88%)"]
  }),


  actions: {
    // 取得對應數字的 label
    getLabel(num: number) {
      switch (num) {
        case 10: return this.departmentLabels[0]
        case 20: return this.departmentLabels[1]
        case 30: return this.departmentLabels[2]
        case 40: return this.departmentLabels[3]
        case 41: return this.departmentLabels[4]
        default: return '未知部門'
      }
    },

    // 將 keyPattern 過濾後轉為label
    keyToLabel(key: string) {
    // 取 key 裡最後一組數字，例如 casetype1_thisyear20_count → 20
    const numMatch = key.match(/\d+(?=_count$)/) // 找 "_count" 前的數字
    const num = numMatch ? Number(numMatch[0]) : 0
    return this.getLabel(num)
    }
  }
})
