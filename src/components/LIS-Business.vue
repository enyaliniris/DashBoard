<template>
  <div class="InfoCard Business">
    <div class="f-title">近三年累計案件數</div>
    <canvas ref="LIS_Bar" width="400" height="200"></canvas>
  </div>
</template>
<script setup>
import { ref , defineProps, watchEffect } from 'vue'
import Chart from 'chart.js/auto' // 引入 Chart.js

const props = defineProps({
    LISData: Object,
})

//時間
// 取得當前日期的年份
let currentYear = new Date().getFullYear();

// 去年的年份
let lastYear = currentYear - 1;

// 前年的年份
let twoYearsAgo = currentYear - 2;

let myChart = null;//避免因非同步資料重複建置表單，要每次先將表單銷毀，再建置

let LIS_Bar = ref(null) // 使用 ref 創建 canvas 的引用
watchEffect(() => {
if(props.LISData){
 if (LIS_Bar.value) {
  
    const ctx = LIS_Bar.value.getContext('2d')

    if (myChart) {
        myChart.destroy();
      }
   
    const gradient_lakeblue = ctx.createLinearGradient(0, 0, 0, 300)

    

    //漸層色
    gradient_lakeblue.addColorStop(0, '#A3EFFF')
    gradient_lakeblue.addColorStop(1, '#01859A')

    const gradient_cyan = ctx.createLinearGradient(0, 0, 0, 300)
    gradient_cyan.addColorStop(0, '#F8D060')
    gradient_cyan.addColorStop(1, '#30E0D0')

    const gradient_purple = ctx.createLinearGradient(0, 0, 0, 200)
    gradient_purple.addColorStop(0, '#F86060')
    gradient_purple.addColorStop(1, '#6060F0')

    const data = {
      labels: ['消金', '理貸', '車貸', '企金', '票金'],
      datasets: [
        {
          label: currentYear + '年',
          backgroundColor: gradient_purple,
          borderWidth: 1,
          borderRadius: 20,
          data: [props.LISData.casetype1_thisyear10_count, props.LISData.casetype1_thisyear20_count, props.LISData.casetype1_thisyear30_count, props.LISData.casetype1_thisyear40_count, props.LISData.casetype1_thisyear41_count]// 每部室今年的業績
          //data:[100,100,100,100,100]
        },
        {
          label: lastYear + '年',
          backgroundColor: gradient_cyan,
          borderWidth: 1,
          borderRadius: 20,
          data: [props.LISData.casetype1_lastyear10_count, props.LISData.casetype1_lastyear20_count, props.LISData.casetype1_lastyear30_count, props.LISData.casetype1_lastyear40_count, props.LISData.casetype1_lastyear41_count] // 每部室去年的業績
          //data:[100,100,100,100,100]
        },
         {
          label: twoYearsAgo + '年',
          backgroundColor: gradient_lakeblue,
          borderWidth: 1,
          borderRadius: 20,
          data: [props.LISData.casetype1_lastestyear10_count, props.LISData.casetype1_lastestyear20_count, props.LISData.casetype1_lastestyear30_count, props.LISData.casetype1_lastestyear40_count, props.LISData.casetype1_lastestyear41_count] // 每部室去年的業績
          //data:[100,100,100,100,100]
        }, 
        
      ]
    }

    // 配置圖表
    const options = {
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

    // 創建BAR
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    })
  }
  }
 
})
</script>
