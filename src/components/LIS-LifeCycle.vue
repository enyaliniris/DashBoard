<template>
  <div class="InfoCard LifeCycle">
    <div class="lifecycle-title">
      <div class="clockIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="59"
          height="65"
          viewBox="0 0 59 65"
          fill="none"
          class="svg-element"
        >
          <g filter="url(#filter0_ddi_181_59)">
            <circle cx="30.5" cy="32.5" r="24.5" fill="#E4EBF5" />
          </g>
          <circle cx="30.5" cy="32.5" r="23.5" stroke="#E4EBF5" stroke-width="2" />
          <path d="M30 23L30 32" stroke="#4BB2E4" stroke-width="4" stroke-linecap="round" />
          <path
            d="M41.9633 38.6792L31 34.0001"
            stroke="#4BB2E4"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cx="30.5" cy="33.5" r="3.5" fill="#4BB2E4" />
          <defs>
            <filter
              id="filter0_ddi_181_59"
              x="0"
              y="0"
              width="59"
              height="65"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="-2" dy="-4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.9375 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_181_59" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_181_59"
                result="effect2_dropShadow_181_59"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_181_59"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="0.95" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.787587 0 0 0 0 0.857187 0 0 0 0 0.879167 0 0 0 0.43 0"
              />
              <feBlend mode="normal" in2="shape" result="effect3_innerShadow_181_59" />
            </filter>
          </defs>
        </svg>
      </div>
      <div class="f-title">平均處理時間</div>
    </div>

    <div class="lifecycle-container">
      <div v-for="(item, index) in LIS_LifeCycle" :key="index">
      <div v-if="item.type === 'hour' && switchControl_LifeCycle === 1">
        <div class="lifecycle-time">
            <span class="bar-title">{{item.title}}</span>
            <div class="bar" :style="{ background:item.colors, width:item.width }"></div>
            <span class="bar-time">{{item.lifecycle}}</span>
        </div>
      </div>
      <div v-else-if="item.type === 'min'  && switchControl_LifeCycle === 2">
        <div class="lifecycle-time">
            <span class="bar-title">{{item.title}}</span>
            <div class="bar" :style="{ background:item.colors, width:item.width }"></div>
            <span class="bar-time">{{item.lifecycle}}</span>
        </div>
      </div>
      </div>
    </div>

     <DotSwitcher :DotNum = "2" :switchControl ="switchControl_LifeCycle" @change-switch="changeSwitchValue" :isColumn="true" :marginLeft="'60px'" />
   
  </div>
</template>
<script setup>
import { ref, defineProps, watchEffect} from 'vue'
import DotSwitcher from '@/components/dot-switcher.vue'

const props = defineProps({
    LISData: Object,
})
let LIS_LifeCycle = ref([])

let switchControl_LifeCycle = ref(1)

function changeSwitchValue(receivedNum) {
    switchControl_LifeCycle.value = receivedNum; // 更新父组件的 switchControl 值
}

function convertToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours + "小時" + remainingMinutes + "分鐘";
}
watchEffect (() =>  {
  if(props.LISData){
  let lifeCycle = [{title:"消金",
                    lifecycle :props.LISData.casetype1_lifecycle_10,
                    colors:"linear-gradient(127deg, #66D4E5 5.97%, #01859A 102.98%)"},
                    {title:"理貸",
                    lifecycle :props.LISData.casetype1_lifecycle_20,
                    colors:"linear-gradient(127deg, #6060F0 5.97%, #01859A 102.98%)"},
                    {title:"車貸",
                    lifecycle :props.LISData.casetype1_lifecycle_30,
                    colors:"linear-gradient(127deg, #6060F0 5.97%, #01859A 102.98%)"},
                    {title:"企金",
                    lifecycle :props.LISData.casetype1_lifecycle_40,
                    colors:"linear-gradient(90deg, #F8D060 -18.98%, #FF7D61 113.88%)"},
                    {title:"票金",
                    lifecycle :props.LISData.casetype1_lifecycle_41,
                    colors:"linear-gradient(90deg, #30E0D0 -18.98%, #00AD9D 113.88%)"},
                    {title:"鑑估報告",
                    lifecycle :props.LISData.casetype2_lifecycle,
                    colors:"linear-gradient(90deg, #7D82D6 -4.86%, #E16464 107.03%)"},
                    {title:"預估報告案",
                    lifecycle :props.LISData.casetype3_lifecycle,
                    colors:"linear-gradient(90deg, #F9C260 -4.86%, #30E0D0 107.03%)"},
                    {title:"預估報告案",
                    lifecycle :props.LISData.casetype4_lifecycle,
                    colors:"linear-gradient(90deg, #6060F0 -4.86%, #A3EFFF 107.03%)"},]
  console.log("lifeCycle",lifeCycle)

  const hoursGroup = lifeCycle.filter(num => num.lifecycle > 60);
  const minGroup = lifeCycle.filter(num => num.lifecycle <= 60);

  let hoursTotal = hoursGroup.reduce((a, b) => a + b.lifecycle, 0)
  let minTotal = minGroup.reduce((a, b) => a + b.lifecycle, 0)




  //小時組 的寬度
 hoursGroup.forEach((item)=>{
    const percentage = (item.lifecycle / hoursTotal) * 100;
    let decimalPercentage = percentage.toFixed(2);
 
    const baseValue = 700; // 基準值 500px
    const calculatedWidth = (baseValue * decimalPercentage) / 100;
    item.width = calculatedWidth + "px"
    item.type = "hour"
    item.lifecycle = convertToHoursAndMinutes(item.lifecycle)
 })
  console.log("hoursGroup", hoursGroup)

  
  //分鐘組 的寬度
  minGroup.forEach((item)=>{
     const percentage = (item.lifecycle / minTotal) * 100;
    let decimalPercentage = percentage.toFixed(2);
 
    const baseValue = 700; // 基準值 500px
    const calculatedWidth = (baseValue * decimalPercentage) / 100;
    item.width = calculatedWidth + "px"
    item.type = "min"
    item.lifecycle = item.lifecycle + "分鐘"
  })
    console.log("minGroup", minGroup)


   LIS_LifeCycle.value = hoursGroup.concat(minGroup)

   console.log("LIS_LifeCycle",  LIS_LifeCycle.value)

  }
})



</script>
<style scope>
/*LifeCycle*/

.svg-element {
    transform: scale(0.8); /* 以 2 倍比例放大 */
  }

.lifecycle-container{
  min-width: 700px;
  display: flex;

}
.lifecycle-title{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0px;
    margin-right: 20px;
}

.lifecycle-time{
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:5px;
    flex-direction: column;
    font-size: 1.5rem;
    position: relative;
}
.clockIcon{
    width: 59px;
    height: 65px;
}


.bar{
    /*width: 200px;*/
    height: 13px;
    border-radius: 30px;
    /*background: linear-gradient(127deg, #66D4E5 5.97%, #01859A 102.98%);*/
}

.bar-title{
    width: 100px;
    position: absolute;
    bottom: 20px;
    text-align: center;
}

.bar-time{
    width: 50px;
    position: absolute;
    top: 15px;
    text-align: center;
    font-size: 1rem;
}

</style>
