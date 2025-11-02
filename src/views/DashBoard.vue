<script setup>
import PieChart from '@/components/PieChart.vue'
import TotalProgressBar from '@/components/TotalProgressBar.vue'
import PeopleCount from '@/components/PeopleCount.vue'
import BarChart from '@/components/BarChart.vue'
import RankList from '@/components/RankList.vue'
import TimeChart from '@/components/TimeChart.vue'
import LineChart from '@/components/LineChart.vue'
import Refresh from '@/components/refresh-btn.vue'
import jsonData1 from '@/assets/json/data1.json'
import jsonData2 from '@/assets/json/data2.json'
import { postLISData } from '@/apis/api_data.js'
import { onMounted, reactive, provide, onUnmounted } from 'vue'

let LISData = reactive({})
const SendData = { uid: 'guest', token: '' }

let useData1 = true  // 切換旗標

function fetchData() {
  if (import.meta.env.VITE_ENV === "development") {
    const dataToUse = useData1 ? jsonData1 : jsonData2
    Object.assign(LISData, dataToUse)
    useData1 = !useData1  // 下次刷新切換另一份
  } else {
    postLISData(SendData)
      .then(res => {
        if (res.data.rc === 'M0000') {
          Object.assign(LISData, res.data.result)
        }
      })
      .catch(err => console.error(err))
  }
}


onMounted(() => {
  fetchData();
  //fetchLocalData();

  const intervalId = setInterval(fetchData, 30000);

  onUnmounted(() => {
    clearInterval(intervalId);
  });
})
provide('LISData', LISData);
</script>

<template>
  <div class="main">
    <section class="grid-container">
      <PieChart :LISData="LISData" />
      <TotalProgressBar :LISData="LISData" />
      <Refresh @Event="fetchData" />
      <PeopleCount />
      <BarChart :LISData="LISData" />
      <RankList :LISData="LISData" />
      <TimeChart :LISData="LISData" />
      <LineChart :LISData="LISData" />
    </section>
  </div>
</template>

<style>
.main {
  width: 100%;
  max-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
