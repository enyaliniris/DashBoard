<template>
  <div class="InfoCard Total">
    <div v-for="(item, index) in totalList" :key="index">
      <div v-if="switchControl_Total === index + 1" class="total-container">
          <div><NumCounter classProp="f-32-g-blue" :numProp="item.value"/><span class="f-16">件</span></div>
          <div class="progress-container">
            <div class="progress-bar" :style="{width:item.initpercent + '%', transition: 'width ' + animationDuration}"></div>
            <div class="progress-bottom"></div>
            <div class="star" :style="{left:item.starWidth + '%', transition: 'left ' + animationDuration}">
              <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <g filter="url(#filter0_d_176_27)">
            <path
              d="M13.998 1.80789L11.6669 6.06689C11.2227 6.8784 10.429 7.43959 9.5158 7.58777L4.95545 8.32775C2.50919 8.7247 1.57194 11.7485 3.36484 13.4594L6.68319 16.626C7.39231 17.3027 7.72613 18.2831 7.57728 19.2519L6.84537 24.0156C6.46844 26.469 9.06399 28.2927 11.2443 27.1064L15.313 24.8928C16.1419 24.4418 17.1347 24.4072 17.9931 24.7992L22.5195 26.8667C24.7656 27.8926 27.22 25.9173 26.6982 23.5038L25.7684 19.2042C25.565 18.2632 25.8255 17.2817 26.4688 16.5654L29.4092 13.2918C30.9782 11.545 30.023 8.75423 27.7127 8.33524L23.7051 7.60844C22.814 7.44684 22.0437 6.89137 21.6088 6.09698L19.2612 1.80789C18.123 -0.271586 15.1362 -0.271586 13.998 1.80789Z"
              fill="url(#paint0_linear_176_27)"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_176_27"
              x="0.732922"
              y="0.248291"
              width="31.1473"
              height="30.9296"
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
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="0.85" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.66 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_176_27" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_176_27"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_176_27"
              x1="5.4151"
              y1="2.17647"
              x2="37.1198"
              y2="33.6093"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FBFF4E" />
              <stop offset="1" stop-color="#E89E5B" />
            </linearGradient>
          </defs>
              </svg>
            </div>
          </div>
        <div class="f-title">{{item.title}}</div>
      </div>
    </div>
    <DotSwitcher :DotNum = "4" :switchControl ="switchControl_Total" @change-switch="changeSwitchValue" :isColumn="true"  :marginLeft="'20px'"/>
  </div>
</template>
<script setup>
import { ref, defineProps, watchEffect,} from 'vue'
import NumCounter from '@/components/num-counter.vue'
import DotSwitcher from '@/components/dot-switcher.vue'

//API數據
const props = defineProps({
    LISData: Object,
})

let casetype1 = ref(0) //近一年授信累積案件數
let casetype2 = ref(0) //近一年累積鑑估案件數
let casetype3 = ref(0) //近一年累積預估案件數
let casetype4 = ref(0) //近一年累積新預估案件數
let totalList = ref([])

//切換顯示
const switchControl_Total = ref(1)

function changeSwitchValue(receivedNum) {
    switchControl_Total.value = receivedNum; // 更新父组件的 switchControl 值
    animateProgressBar(totalList.value[receivedNum - 1]);
}

//progressBar數值
const totalnum = 50000
const animationDuration = '2s';

watchEffect (() =>  {
if(props.LISData){
  casetype1.value = props.LISData.casetype1_last1year_count
  casetype2.value = props.LISData.casetype2_last1year_count
  casetype3.value = props.LISData.casetype3_last1year_count
  casetype4.value = props.LISData.casetype4_last1year_count

  const casetypes = [casetype1.value, casetype2.value , casetype3.value, casetype4.value]; // 這裡放入所有的 casetypes
  const caseName = ["授信累積案件數", "累積鑑估案件數" , "累積預估案件數" , "累積新預估案件數"]

  let percentages = []
  for (let i = 0; i < casetypes.length; i++) {
  const percentage = (casetypes[i] / totalnum) * 100;
  const integerPercentage = Math.round(percentage);
  percentages.push(integerPercentage + "%");
}


totalList.value = percentages.map((percent, index)=>({
  title : caseName[index],
  initpercent:0,
  starWidth:-5,
  percent,
  value : casetypes[index],
}))


totalList.value.forEach(obj => {
    let currentPercent = parseFloat(obj.percent);
    let percentMinus5 = (currentPercent - 10).toFixed(0) + '%';
    obj['percentMinus5'] = percentMinus5;
});


console.log("percentageList", totalList.value)

animateProgressBar(totalList.value[0]);


}
})


function animateProgressBar(item) {

    //初始化
    item.initpercent = 0
    item.starWidth  = -10

    const percentage = parseFloat(item.percent);
    const starPercent = parseFloat(item.percentMinus5);

    const interval = setInterval(() => {
      if (item.initpercent < percentage) {
        item.initpercent = item.initpercent + 1
      }
      if(item.starWidth < starPercent){
        item.starWidth = item.starWidth + 1
      }
     
    }, 15)

    return () => clearInterval(interval)
  
}

</script>
<style scope>

.total-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress-container{
    width: 250px;
    max-width: calc(100% - 20px);
    height: 13px;
    position: relative;
    margin-bottom: 10px;
}
.progress-bottom{
    position: absolute;
    z-index: 0;
    width: 250px;
    height: 13px;
    border-radius: 30px;
    background: linear-gradient(180deg, #ABB4BF 0%, rgba(195, 209, 228, 0.87) 19.79%, rgba(207, 219, 236, 0.48) 56.25%, rgba(140, 149, 163, 0.00) 100%);
}
.progress-bar{
    position: absolute;
    height: 13px;
    z-index: 1;
    border-radius: 30px;
    background: linear-gradient(127deg, #66D4E5 5.97%, #01859A 102.98%);
    box-shadow: 0px -3px 4px 0px rgba(255, 255, 255, 0.25);
}


.star{
    z-index: 1;
    position: absolute;
    bottom:-10px;
    width: 34px;
    height: 33px;
    fill: linear-gradient(134deg, #FBFF4E 17.31%, #E89E5B 111.54%);
    filter: drop-shadow(0px 2px 1.7000000476837158px rgba(255, 168, 0, 0.25));
}


</style>
