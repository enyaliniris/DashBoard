import axios, { AxiosResponse } from 'axios'

// 預設的 API base URL，可以根據需求修改
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

// 🔹 請根據實際回傳內容調整這個 interface
export interface LISResponse {
  rc: string
  result: any
}

//  傳入參數的型別
export interface LISRequest {
  uid: string
  token: string
}

/**
 * postLISData
 * 向 LIS API 發送資料
 * @param data - 要傳給 API 的資料，例如 { uid, token }
 * @returns Promise - 回傳 AxiosResponse<LISResponse>
 */
export function postLISData(
  data: LISRequest
): Promise<AxiosResponse<LISResponse>> {
  return axios.post(`${API_BASE_URL}/lis-data`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 秒超時
  })
}
