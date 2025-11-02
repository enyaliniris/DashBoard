<template>
  <div class="InfoCard BarChart">
    <div class="f-title">近三年累計案件數</div>
    <canvas ref="LIS_Bar" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import Chart, { ChartOptions, ChartData, ChartDataset } from 'chart.js/auto'
import { useGlobalStore } from '@/stores/global'
import type { BoardData } from '@/types/BoardData'

const props = defineProps<{ LISData?: BoardData }>()
const globalStore = useGlobalStore()

const LIS_Bar = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

// 年份計算
const currentYear = new Date().getFullYear()
const lastYear = currentYear - 1
const twoYearsAgo = currentYear - 2

// 年份對應欄位前綴
const yearPrefixes = [
  { year: currentYear, prefix: 'thisyear' },
  { year: lastYear, prefix: 'lastyear' },
  { year: twoYearsAgo, prefix: 'lastestyear' }
]

function createGradient(ctx: CanvasRenderingContext2D, colorStart: string, colorEnd: string, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorEnd)
  return gradient
}

watchEffect(() => {
  if (!props.LISData || !LIS_Bar.value) return
  const ctx = LIS_Bar.value.getContext('2d')
  if (!ctx) return

  if (myChart) myChart.destroy()

  // 動態抓欄位：thisyear\d+_count / lastyear\d+_count / lastestyear\d+_count
  const getFieldsForPrefix = (prefix: string) => {
    return Object.keys(props.LISData!)
      .filter(k => k.startsWith(`casetype1_${prefix}`) && k.endsWith('_count'))
      .sort((a, b) => {
        const nA = Number(a.match(/\d+(?=_count$)/)?.[0])
        const nB = Number(b.match(/\d+(?=_count$)/)?.[0])
        return (nA ?? 0) - (nB ?? 0)
      })
  }

  const datasets: ChartDataset<'bar', number[]>[] = yearPrefixes.map((y, idx) => {
    const fields = getFieldsForPrefix(y.prefix)
    const gradientColors = [
      ['#F86060', '#6060F0'],
      ['#F8D060', '#30E0D0'],
      ['#A3EFFF', '#01859A']
    ]
    return {
      label: `${y.year}年`,
      data: fields.map(f => (props.LISData![f as keyof BoardData] ?? 0) as number),
      backgroundColor: createGradient(ctx, gradientColors[idx][0], gradientColors[idx][1], 200),
      borderWidth: 1,
      borderRadius: 20
    }
  })

  // 對應 key → 中文 label
  const labels = getFieldsForPrefix('thisyear').map(key => {
    return globalStore.keyToLabel(key)
  })

  const data: ChartData<'bar'> = { labels, datasets }

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
  myChart = new Chart(ctx, { type: 'bar', data, options })
})
</script>
