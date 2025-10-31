<template>
  <div class="InfoCard BarChart">
    <div class="f-title">近三年累計案件數</div>
    <canvas ref="LIS_Bar" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watchEffect } from 'vue'
import Chart, { ChartOptions, ChartData, ChartDataset } from 'chart.js/auto'
import { useGlobalStore } from '@/stores/global'
import type { BoardData } from '@/types/BoardData'

const props = defineProps<{ LISData?: BoardData }>()

// =====  Pinia store 引入項目標籤名稱 =====
const globalStore = useGlobalStore()
const labels: string[] = globalStore.departmentLabels


// =====  Canvas 與 Chart 型別 =====
const LIS_Bar = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

// ===== 年份計算 =====
const currentYear = new Date().getFullYear()
const lastYear = currentYear - 1
const twoYearsAgo = currentYear - 2

// ===== 組陣列 ====
const datasetsConfig = [
  { year: currentYear, fields: ['thisyear10_count','thisyear20_count','thisyear30_count','thisyear40_count','thisyear41_count'], gradient: ['#F86060','#6060F0'], height: 200 },
  { year: lastYear, fields: ['lastyear10_count','lastyear20_count','lastyear30_count','lastyear40_count','lastyear41_count'], gradient: ['#F8D060','#30E0D0'], height: 300 },
  { year: twoYearsAgo, fields: ['lastestyear10_count','lastestyear20_count','lastestyear30_count','lastestyear40_count','lastestyear41_count'], gradient: ['#A3EFFF','#01859A'], height: 300 },
]
function createGradient(ctx: CanvasRenderingContext2D, colorStart: string, colorEnd: string, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorEnd)
  return gradient
}

// ===== WatchEffect 建立 Chart =====
watchEffect(() => {
  if (!props.LISData || !LIS_Bar.value) return

  const ctx = LIS_Bar.value.getContext('2d')
  if (!ctx) return

  if (myChart) {
    myChart.destroy()
  }

const datasets: ChartDataset<'bar', number[]>[] = datasetsConfig.map(cfg => ({
  label: `${cfg.year}年`,
  backgroundColor: createGradient(ctx, cfg.gradient[0], cfg.gradient[1], cfg.height),
  borderWidth: 1,
  borderRadius: 20,
  data: cfg.fields.map(
    f => props.LISData![`casetype1_${f}` as keyof BoardData] as number
  )
}))

const data: ChartData<'bar'> = {
  labels,
  datasets
}

  // ===== Chart Options =====
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    plugins: {
      legend: {
        position: 'bottom',
        align: 'end'
      }
    }
  }

  // ===== 建立 Chart =====
  myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  })
})
</script>
