<template>
  <div class="InfoCard LineChart">
    <div class="f-title">各年度案件量累計</div>
    <div class="label-container">
      <div v-for="(item, index) in LineChartLabels" :key="index" class="label">
        <span class="labeltitle">{{item.title}}</span>
        <div class="labelrect" :style="{backgroundColor: item.color}"></div>
      </div>
    </div>
    <canvas ref="LIS_LineChart" width="400" height="200"></canvas>
  </div>
</template>
<script setup>
import { watchEffect, ref, defineProps } from 'vue'
import Chart from 'chart.js/auto'
import 'chartjs-plugin-zoom'; 
import { useGlobalStore } from '@/stores/global';
const globalStore = useGlobalStore();
const labels = globalStore.departmentLabels;
const colors = ['#01859A', '#6060F0', '#30E0D0', '#F8D060', '#F86060']
let LineChart_tempt = null;//避免因非同步資料重複建置表單，要每次先將表單銷毀，再建置
const props = defineProps({
    LISData: Object,
})
const LIS_LineChart = ref(null)
const LineChartLabels = labels.map((label, index) => ({
  title: label,
  color: colors[index]
}))

watchEffect(() => {

if(props.LISData){
 
 //處理資料
let finalLineResult
if(props.LISData.casetype1_CountbyBusinesstype){
  const result = props.LISData.casetype1_CountbyBusinesstype.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      acc[key] = acc[key] || [];
      acc[key].push(obj[key]);
  });
  return acc;
}, {});
finalLineResult = Object.values(result);
console.log(finalLineResult);
}



 if (LIS_LineChart.value && finalLineResult) {
  if (LineChart_tempt) {
        LineChart_tempt.destroy();
      }

  const ctx = LIS_LineChart.value.getContext('2d')

  const data = {
    labels: finalLineResult[0], // 年份標籤
    datasets: [
      {
        label: '消金',
        borderColor: '#01859A',
        borderWidth: 3,
        fill: false, // 不填充區域，顯示折線圖
        data: finalLineResult[1] //
      },
      {
        label: '理貸',
        borderColor: '#6060F0',
        borderWidth: 3,
        fill: false,
        data: finalLineResult[2] 
      },
      {
        label: '車貸',
        borderColor: '#30E0D0',
        borderWidth: 3,
        fill: false,
        data: finalLineResult[3] 
      },
      {
        label: '企金',
        borderColor: '#F8D060',
        borderWidth: 3,
        fill: false,
        data: finalLineResult[5] 
      },
      {
        label: '票金',
        borderColor: '#F86060',
        borderWidth: 3,
        fill: false,
        data: finalLineResult[4]
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
          wheel: {
            enabled: true, 
          },
          pinch: {
            enabled: true, 
          },
          mode: 'xy',
        },
        pan: {
          enabled: true, 
         mode: 'xy', 
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '年份'
        }
      },
      y: {
        display: true,
        title: {
          display: true
        }
      }
    },
    radius: 0,
    tension: 0.5,
  }

  // 創建折線圖
  LineChart_tempt = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })


 }}
 
})
</script>
<style scope>

.label-container{
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: center;
}
.label{
  display:flex;
  gap: 10px;
}
.labelrect{
  width: 20px;
  height: 10px;
}
.labeltitle{
  font-size: 12px;
}
</style>