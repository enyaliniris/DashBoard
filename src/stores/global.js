import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    departmentLabels: ["研發部", "行銷部", "客服部", "專案部", "支援部"]
  }),

  actions: {
    setDepartments(newLabels) {
      this.departmentLabels = newLabels
    }
  }
})