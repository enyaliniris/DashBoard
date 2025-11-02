<template>
  <div class="InfoCard LineChart">
    <div class="f-title">各年度案件量累計</div>
    <canvas ref="LIS_LineChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from 'vue'
import Chart from 'chart.js/auto'                 // 只導入默認 Chart
import type { ChartData, ChartOptions } from 'chart.js' // 型別用 import type
import 'chartjs-plugin-zoom'
import { useGlobalStore } from '@/stores/global'
import { useAuthStore } from '@/stores/auth'

import type { CountByBusinessType } from '@/types/BoardData'

const globalStore = useGlobalStore()
const auth = useAuthStore()

const labels = globalStore.departmentLabels
const colors = ['#01859A', '#6060F0', '#30E0D0', '#F8D060', '#F86060']


interface LISDataType {
  casetype1_CountbyBusinesstype?: CountByBusinessType[]
}

const props = defineProps<{ LISData: LISDataType | null }>()

// ===== Canvas 與 Chart refs =====
const LIS_LineChart = ref<HTMLCanvasElement | null>(null)
let LineChart_tempt: Chart<'line'> | null = null


watchEffect(() => {
  if (!props.LISData?.casetype1_CountbyBusinesstype || !LIS_LineChart.value) return;
  const ctx = LIS_LineChart.value.getContext('2d');
  if (!ctx) return;
  if (LineChart_tempt) LineChart_tempt.destroy();

  // 過濾角色：guest 不顯示 count41
  const isGuest = auth.user?.roles.includes('guest');
  const allKeys = Object.keys(props.LISData.casetype1_CountbyBusinesstype[0] || {}).filter(k => k !== 'year');
  const datasetKeysFiltered = isGuest ? allKeys.filter(k => !k.includes('41')) : allKeys;

  // 對應 labels & colors
  const datasetsConfigFiltered = datasetKeysFiltered.map((key, index) => ({
    key,
    label: labels[index] || key,       // fallback label
    color: colors[index] || '#000'     // fallback color
  }));

  // 生成 result
  const result = props.LISData.casetype1_CountbyBusinesstype.reduce<Record<string, number[]>>((acc, obj) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (key !== 'year' && datasetKeysFiltered.includes(key)) {
        if (!acc[key]) acc[key] = [];
        acc[key].push(val as number);
      }
    });
    return acc;
  }, {});

  const years = props.LISData.casetype1_CountbyBusinesstype.map(item => item.year);

  const data: ChartData<'line'> = {
    labels: years,
    datasets: datasetsConfigFiltered.map(d => ({
      label: d.label,
      borderColor: d.color,
      borderWidth: 3,
      fill: false,
      data: result[d.key] ?? []
    }))
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      zoom: {
        zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'xy' },
        pan: { enabled: true, mode: 'xy' }
      }
    },
    scales: {
      x: { display: true, title: { display: true, text: '年份' } },
      y: { display: true, title: { display: true } }
    },
    elements: { point: { radius: 0 }, line: { tension: 0.5 } }
  };

  LineChart_tempt = new Chart(ctx, { type: 'line', data, options });
});
</script>
