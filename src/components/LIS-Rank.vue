<template>
  <div class="InfoCard Rank">
    <div class="RankList">
      <div class="f-title">業績排行榜</div>
      <div v-for="(item,index) in RankList" :key="index">
        <div class="list">
          <div class="dept">{{item.department}}</div>
            <div class="rank">
              <div class="left">
                <div class="award">1</div>
                <div class="rank-name">{{item.bankname}}</div>
              </div>
            <div class="rank-num">{{item.case_count}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, watchEffect} from 'vue'
const props = defineProps({
    LISData: Object,
})
let RankList = ref([]) 
watchEffect (() =>  {
  if(props.LISData){

    let top10 = props.LISData.casetype1_thisyear_top10_10//消金
    let top20 = props.LISData.casetype1_thisyear_top10_20//理貸
    let top30 = props.LISData.casetype1_thisyear_top10_30//理貸
    let top40 = props.LISData.casetype1_thisyear_top10_40//企金
    let top41 = props.LISData.casetype1_thisyear_top10_41//票金
    const department = ["消金", "理貸", "車貸", "企金", "票金"];


    if (top10 && top20 && top30 && top40 && top41) {
    RankList.value = [top10[0],top20[0],top30[0],top40[0],top41[0]]
    RankList.value =RankList.value.map((item, index) => {
      return {
        ...item,
        department: department[index] // 使用 index 對應 department 的值
      };
    });
   // RankList.value.sort((a, b) => parseInt(b.case_count) - parseInt(a.case_count));
    }

 
    console.log("RankList", RankList)

  }
})

</script>
<style scope>

.Rank{
    grid-area: rank;
    display: flex;
    justify-content: center;
    align-items: center;

}

.RankList{
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 20%;
  margin-bottom: 20%;
}

.list{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  gap: 10px;
 
}

.dept{
  background-color:#A7D4EB;
  color:  #0a4b73;
  width: 49px;
  height: 49px;
  border-radius: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(4px 4px 10.699999809265137px rgba(146, 213, 235, 0.43)) drop-shadow(-2px -4px 4px #EFFFFF);
}
.rank{
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

.award{
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
.rank-name{
    color: #2573A3;
    font-size: 1.6rem;
    font-weight: 500;
}

.rank-num{
    color: #2573A3;
    font-size: 1.5rem;
    font-weight: 500;
}
.left{
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>