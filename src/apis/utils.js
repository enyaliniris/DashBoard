// utils.js
import { reactive } from 'vue'

// 建立一個全域響應式狀態
const state = reactive({
  showModal: false,
  errorMessage: ''
})

// 顯示 modal
export function showModal() {
  state.showModal = true
}

// 關閉 modal
export function closeModal() {
  state.showModal = false
  state.errorMessage = ''
}

// 設定錯誤訊息
export function errorMessage(msg) {
  state.errorMessage = msg
}

// 同時設定訊息並打開 modal
export function openModalWithErrorMessage(msg) {
  state.errorMessage = msg
  state.showModal = true
}

export function tip(message) {
  // 簡單用 alert 或 console.log，實際可換成 Toast / Modal
  alert(message)
}
// 導出給其他組件使用
export { state }
