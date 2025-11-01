<template>
  <div class="InfoCard Pie">
    <div class="title">
      <div class="f-title">各業務交易量占比</div>
      <span>2023/01/01—2023/12/30</span>
    </div>
    <div class="Pie_Container">
      <div class="Pie_Chart">
        <canvas ref="LIS_Pie" width="300" height="150" class="LIS_Pie"></canvas>
        <div class="pie-chart-bk"></div>
        <div class="pie-chart-bk2"></div>
        <div class="pie-chart-shadow"></div>
      </div>
      <div class="LabelList">
        <div v-for="(item, index) in labelList" :key="index">
          <div class="label">
            <span>{{ item.label }}</span>
            <div class="label-dot" :style="{ backgroundColor: item.color }"></div>
            <span>{{ item.percent }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useGlobalStore } from '@/stores/global'
import type { BoardData } from '@/types/BoardData'


const props = defineProps<{
  LISData?: BoardData
}>()

// 取全域 store
const globalStore = useGlobalStore()
const labels = globalStore.departmentLabels as string[]

// labelList 型別
interface LabelItem {
  label: string
  percent: string
  color: string
}
const labelList = ref<LabelItem[]>([])

// Canvas 參照
const LIS_Pie = ref<HTMLCanvasElement | null>(null)

// 監聽資料變化並重繪
watchEffect(() => {
  if (!props.LISData || !LIS_Pie.value) return

  const canvas = LIS_Pie.value
  const context = canvas.getContext('2d')
  if (!context) return

  const x = canvas.width / 2
  const y = canvas.height / 2
  const radius = 50
  const lineWidth = 15
  const totalParts = 5

  const partValues = [
    props.LISData.casetype1_thisyear10_count,
    props.LISData.casetype1_thisyear20_count,
    props.LISData.casetype1_thisyear30_count,
    props.LISData.casetype1_thisyear40_count,
    props.LISData.casetype1_thisyear41_count
  ]
  const partColors = ['#01859A', '#6060F0', '#F8D060', '#30E0D0', '#F86060']
  const gradientColors = ['#C1E1FF', '#C1E1FF', '#FFDD7C', '#C1E1FF', '#F88460']

  let startAngle = 0
  const gapDegrees = 20

  context.lineWidth = lineWidth
  context.lineCap = 'round'

  const sumValues = partValues.reduce((a, b) => a + b, 0)
  const totalDegrees = 360 - totalParts * gapDegrees

  for (let i = 0; i < totalParts; i++) {
    const adjustedStartAngle = startAngle + Math.PI * 2 * (gapDegrees / 360)
    const endAngle =
      adjustedStartAngle + Math.PI * 2 * (((partValues[i] / sumValues) * totalDegrees) / 360)

    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, partColors[i])
    gradient.addColorStop(1, gradientColors[i])

    context.beginPath()
    context.strokeStyle = gradient
    context.arc(x, y, radius, adjustedStartAngle, endAngle, false)
    // 在 canvas 上畫弧線或圓形
    // x, y：圓心的座標 radius：半徑 
    // sAngle（startAngle）：起始角度（以「弧度」為單位），0 表示最右側（3點鐘方向）
    // eAngle（endAngle）：結束角度（以「弧度」為單位）
    // counterclockwise（可選）：是否逆時針畫弧，預設為 false（順時針）
    context.stroke()

    startAngle = endAngle

 
  
  }

  // 計算百分比
  const sum = partValues.reduce((acc, curr) => acc + curr, 0)
  const percentages = partValues.map((value) => ((value / sum) * 100).toFixed(2) + '%')

  labelList.value = percentages.map((percent, index) => ({
    label: labels[index],
    percent,
    color: partColors[index]
  }))
})
</script>

<style scoped>
/*Pie*/
.Pie span {
  font-size: 1.6rem;
  color: var(--black);
}

.Pie {
  grid-area: pie;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
}

.Pie_Container {
  display: flex;
}

.Pie_Chart {
  width: 180px;
  height: auto;
  position: relative;
}

.LIS_Pie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.pie-chart-bk {
  width: 151px;
  height: 151px;
  border-radius: 151px;
  position: absolute;
  box-shadow:
    4px 4px 10.7px 3px rgba(146, 213, 235, 0.43),
    -2px -4px 4px 0px #efffff;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pie-chart-bk2 {
  width: 60px;
  height: 60px;
  border-radius: 70px;
  position: absolute;
  box-shadow:
    inset 2px 2px 10px 5px rgba(146, 213, 235, 0.73),
    inset -3px -3px 10px 5px #ffffff;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.pie-chart-shadow {
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 70px;
  background-color: rgba(96, 96, 240, 0);
  box-shadow: 4px 4px 10.7px 8px rgba(146, 213, 235, 0.732);
}

.LabelList {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.label {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}

.label span {
  font-size: 1.4rem;
  transition: font-size 0.3s ease;
}

.label:hover span {
  font-size: 1.5rem;
}

.label-dot {
  width: 17px;
  height: 17px;
  border-radius: 17px;
}
</style>
