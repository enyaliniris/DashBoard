import { defineStore } from 'pinia'

interface GlobalState {
  departmentLabels: string[]
}

export const useGlobalStore = defineStore('global', {
  state: (): GlobalState => ({
    departmentLabels: ["研發部", "行銷部", "客服部", "專案部", "支援部"]
  }),

  actions: {
    // 指定參數型別
    setDepartments(newLabels: string[]) {
      this.departmentLabels = newLabels
    }
  }
})
