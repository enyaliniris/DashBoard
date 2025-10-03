<script setup>
import Pie from '@/components/LIS-Pie.vue'
import Total from '@/components/LIS-Total.vue'
import People from '@/components/LIS-People.vue'
import Business from '@/components/LIS-Business.vue'
import Rank from '@/components/LIS-Rank.vue'
import LifeCycle from '@/components/LIS-LifeCycle.vue'
import LineChart from '@/components/Line-Chart.vue'
import Refresh from '@/components/refresh-btn.vue'
import jsonData from '@/assets/json/data.json';
import { postLISData } from '@/apis/api_data.js'
import { tip } from '@/apis/utils.js'
import { onMounted, reactive, provide, onUnmounted  } from 'vue'

let LISData = reactive({})
const SendData = { uid: 'guest', token: '' }

let fetchData
if(import.meta.env.VITE_ENV === "development"){
   fetchData = () => {
      Object.assign(LISData, jsonData);
    };
}else{
  fetchData = () => {
      postLISData(SendData)
        .then((response) => {
          if (response.data.rc === 'M0000') {
            Object.assign(LISData, response.data.result);
          }
        })
        .catch((error) => {
          if (error.message === 'Network Error') {
            tip('網路連接錯誤，請更新頁面');
          } else {
            console.error('發生錯誤:', error);
          }
        });
    };
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
    <Pie :LISData="LISData"/>
    <Total :LISData="LISData"/>
    <Refresh @Event="fetchData" />
    <People />
    <Business :LISData="LISData" />
    <Rank :LISData="LISData" />
    <LifeCycle :LISData="LISData" />
    <LineChart :LISData="LISData" />
  </section>
  </div>
</template>

<style>
.main{
  width: 100%;
  max-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
