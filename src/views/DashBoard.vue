<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'

import PieChart from '@/components/PieChart.vue'
import TotalProgressBar from '@/components/TotalProgressBar.vue'
import PeopleCount from '@/components/PeopleCount.vue'
import BarChart from '@/components/BarChart.vue'
import RankList from '@/components/RankList.vue'
import TimeChart from '@/components/TimeChart.vue'
import LineChart from '@/components/LineChart.vue'
import Refresh from '@/components/refresh-btn.vue'

const dataStore = useDataStore()

const LISData = computed(() => dataStore.filteredData)

function fetchData() {
  dataStore.fetchData()
}

onMounted(() => {
  fetchData()
  const intervalId = setInterval(fetchData, 30000)
  onUnmounted(() => clearInterval(intervalId))
})
</script>

<template>
  <div class="main">
    <section class="grid-container">
      <PieChart :LISData="LISData" />
      <TotalProgressBar :LISData="LISData" />
      <Refresh @Event="fetchData" />
      <PeopleCount :LISData="LISData" />
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
