<template>
  <div class="InfoCard LineChart">
    <div class="f-title">各年度案件量累計</div>
    <!-- <div class="label-container">
      <div v-for="(item, index) in LineChartLabels" :key="index" class="label">
        <span class="labeltitle">{{item.title}}</span>
        <div class="labelrect" :style="{backgroundColor: item.color}"></div>
      </div>
    </div> -->
    <canvas ref="LIS_LineChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref, defineProps } from 'vue'
import Chart from 'chart.js/auto'                 // 只導入默認 Chart
import type { ChartData, ChartOptions } from 'chart.js' // 型別用 import type
import 'chartjs-plugin-zoom'
import { useGlobalStore } from '@/stores/global'
import type { CountByBusinessType } from '@/types/BoardData'

const globalStore = useGlobalStore()
const labels = globalStore.departmentLabels
const colors = ['#01859A', '#6060F0', '#30E0D0', '#F8D060', '#F86060']
const datasetKeys = ['count10', 'count20', 'count30', 'count40', 'count41'] as const

// ===== 將 labels、key、color 組成 Linechart 專用配置  =====
const datasetsConfig = labels.map((label, index) => ({
  key: datasetKeys[index],
  label,
  color: colors[index]
}))

// ===== Label 顯示設定 =====
const LineChartLabels = labels.map((label, index) => ({
  title: label,
  color: colors[index]
}))

interface LISDataType {
  casetype1_CountbyBusinesstype?: CountByBusinessType[]
}

const props = defineProps<{ LISData: LISDataType | null }>()

// ===== Canvas 與 Chart refs =====
const LIS_LineChart = ref<HTMLCanvasElement | null>(null)
let LineChart_tempt: Chart<'line'> | null = null


watchEffect(() => {
  if (!props.LISData || !props.LISData.casetype1_CountbyBusinesstype || !LIS_LineChart.value) return

  const ctx = LIS_LineChart.value.getContext('2d')
  if (!ctx) return

  // ===== 避免重複建 Chart =====
  if (LineChart_tempt) {
    LineChart_tempt.destroy()
  }

  // ===== 處理資料 =====
  const result = props.LISData.casetype1_CountbyBusinesstype.reduce<Record<string, number[]>>((acc, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (key !== 'year') {
        if (!acc[key]) acc[key] = []
        acc[key].push(val as number)
      }
    })
    return acc
  }, {})

  const years = props.LISData.casetype1_CountbyBusinesstype.map(item => item.year)

  const data: ChartData<'line'> = {
  labels: years,
  datasets: datasetsConfig.map(d => ({
    label: d.label,
    borderColor: d.color,
    borderWidth: 3,
    fill: false,
    data: result[d.key] ?? []
  }))
}

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    zoom: {
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: 'xy'
      },
      pan: {
        enabled: true,
        mode: 'xy'
      }
    }
  },
  scales: {
    x: { display: true, title: { display: true, text: '年份' } },
    y: { display: true, title: { display: true } }
  },
  elements: {
    point: {
      radius: 0 // 將 radius 放在 point 裡
    },
    line: {
      tension: 0.5
    }
  }
};

  LineChart_tempt = new Chart(ctx, { type: 'line', data, options })
})
</script>
