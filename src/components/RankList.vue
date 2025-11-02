<template>
  <div class="InfoCard Rank">
    <div class="RankList">
      <div class="f-title">業績排行榜</div>
      <div v-for="(item, index) in RankList" :key="index">
        <div class="list">
          <div class="dept">{{ item.department }}</div>
          <div class="rank">
            <div class="left">
              <div class="award">1</div>
              <div class="rank-name">{{ item.unitname }}</div>
            </div>
            <div class="rank-num">{{ item.case_count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import type { BoardData } from '@/types/BoardData'
import { useGlobalStore } from '@/stores/global'
const globalStore = useGlobalStore()

// 定義 props
const props = defineProps<{
  LISData?: BoardData
}>()

// 定義單筆排行榜資料的型別
interface RankItem {
  unitname: string
  case_count: string | number
  department?: string
}
//  排行榜陣列
const RankList = ref<RankItem[]>([])

//部門名稱
const deptTitles = globalStore.departmentLabels

watchEffect(() => {
  if (!props.LISData) return;

  const LISData = props.LISData as unknown as Record<string, RankItem[]>;


  // 找出所有 top 欄位
  const rankKeys = Object.keys(props.LISData)
    .filter(k => /^casetype1_thisyear_top\d+/.test(k)) // 動態匹配 top 欄位

  console.log("rankKeys", rankKeys)

  // 遍歷每個 top 陣列，取第一筆資料，組成 RankItem
  const ranks: RankItem[] = rankKeys.map((key, index) => {
    const arr = LISData[key];
    console.log("arr", arr)
    if (!arr || !arr.length) return null;
    return {
      ...arr[0],
      department: deptTitles[index]
    };
  }).filter(Boolean) as RankItem[];

  // 排序（可選）
  //ranks.sort((a, b) => Number(b.case_count) - Number(a.case_count));

  RankList.value = ranks;
});
</script>

<style scope>
.Rank {
  grid-area: rank;
  display: flex;
  justify-content: center;
  align-items: center;

}

.RankList {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20%;
  margin-bottom: 20%;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  gap: 10px;

}

.dept {
  background-color: #A7D4EB;
  color: #0a4b73;
  width: 49px;
  height: 49px;
  border-radius: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(4px 4px 10.699999809265137px rgba(146, 213, 235, 0.43)) drop-shadow(-2px -4px 4px #EFFFFF);
}

.rank {
  min-width: 200px;
  height: 49px;
  border-radius: 30px;
  background: linear-gradient(92deg, #FFE9AB 10.39%, rgba(33, 206, 217, 0.55) 93.65%);
  box-shadow: 0px 4px 4px 0px rgba(174, 103, 103, 0.25) inset;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.award {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  color: #ffffff;
  background-image: linear-gradient(151deg, #F6E551 0.98%, #EEC056 95.25%);
  filter: drop-shadow(0px 4px 4px rgba(206, 148, 0, 0.25));
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.rank-name {
  color: #2573A3;
  font-size: 1.6rem;
  font-weight: 500;
}

.rank-num {
  color: #2573A3;
  font-size: 1.5rem;
  font-weight: 500;
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>