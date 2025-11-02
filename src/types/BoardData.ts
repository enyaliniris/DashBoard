// src/types/data.ts

export interface TopUnit {
  unit: string
  case_count: string
  unitname: string
}

export interface CountByBusinessType {
  year: string
  count10: number
  count20: number
  count30: number
  count40: number
  count41: number
}

export interface BoardData { 
  casetype1_lifecycle_20?: number
  casetype1_lifecycle_21?: number
  casetype1_thisyear_top10_40?: TopUnit[]
  casetype1_thisyear_top10_41?: TopUnit[]
  casetype1_thisyear20_count?: number
  casetype4_last1year_count?: number
  casetype1_thisyear10_count?: number
  casetype1_thisyear30_count?: number
  casetype1_last1year_count?: number
  casetype1_lastyear11_count?: number
  this_year?: string
  casetype1_lifecycle_10?: number
  casetype1_lifecycle_11?: number
  casetype1_thisyear40_count?: number
  casetype4_total_count?: number
  casetype4_lifecycle?: number
  casetype1_thisyear_top10_10?: TopUnit[]
  now_before365?: string
  casetype2_total_count?: number
  casetype3_total_count?: number
  casetype1_thisyear_top10_11?: TopUnit[]
  lastest_year?: string
  casetype1_total_count?: number
  casetype1_lastestyear20_count?: number
  casetype1_lastestyear40_count?: number
  casetype1_thisyear11_count?: number
  last_yearDate?: string
  conn_maxconnset?: string
  casetype1_CountbyBusinesstype?: CountByBusinessType[]
  casetype1_lifecycle_41?: number
  casetype1_lastyear40_count?: number
  casetype1_lifecycle_40?: number
  last_year?: string
  casetype1_lastyear10_count?: number
  casetype1_lastyear20_count?: number
  users_online?: number
  casetype1_lastyear30_count?: number
  casetype1_thisyear_top10_21?: TopUnit[]
  user_insystime?: number
  casetype3_last1year_count?: number
  casetype3_lifecycle?: number
  casetype1_thisyear_top10_20?: TopUnit[]
  now?: string
  users_todaylogin?: number
  casetype1_lastestyear41_count?: number
  casetype1_lastestyear11_count?: number
  casetype1_lastestyear21_count?: number
  casetype1_lifecycle_30?: number
  users_count?: number
  casetype2_last1year_count?: number
  casetype1_lastyear21_count?: number
  casetype1_lastyear41_count?: number
  casetype2_lifecycle?: number
  this_yearDate?: string
  conn_active?: string
  casetype1_thisyear_top10_30?: TopUnit[]
  casetype1_lastestyear10_count?: number
  casetype1_lastestyear30_count?: number
  casetype1_thisyear21_count?: number
  casetype1_thisyear41_count?: number
}
