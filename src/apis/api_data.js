// src/apis/api_data.js
import axios from 'axios'

// 預設的 API base URL，可以根據需求修改
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api-domain.com'

/**
 * postLISData
 * @param {Object} data - 要傳給 API 的資料，例如 { uid, token }
 * @returns Promise - axios 的 Promise
 */
export function postLISData(data) {
  return axios.post(`${API_BASE_URL}/lis-data`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 秒超時
  })
}
