<template>
  <div class="People InfoCard" ref="People"  >
    <div v-if="elementHeight < 480">
      <DotSwitcher :DotNum = "2" :switchControl ="switchControl_People" @change-switch="changeSwitchValue" :isColumn="false" :marginLeft="'0px'" />
    <div class="people-container" v-if="switchControl_People === 1">
      <div class="numInfo">
        <div><NumCounter classProp="f-32-lakeblue" :numProp="LISData.users_online"/><span>人</span></div>
        <span>目前登入使用者</span>
      </div>
      <div class="hr"></div>
      <div class="numInfo">
        <div><NumCounter classProp="f-32-moonblue" :numProp="LISData.users_todaylogin"/><span>人</span></div>
        <span>今日登入人次</span>
      </div>
    </div>
    <div class="people-container" v-if="switchControl_People === 2">
      <div class="numInfo">
        <div><NumCounter classProp="f-32-lakeblue" :numProp="LISData.users_count"/><span>人</span></div>
        <span>系統註冊人數</span>
      </div>
      <div class="hr"></div>
      <div class="numInfo">
        <div><NumCounter classProp="f-32-moonblue" :numProp="LISData.user_insystime"/><span>分鐘</span></div>
        <span class="text-warp">使用者登入系統平均時間</span>
      </div>
    </div>

    </div>
    <div v-else>
    <div class="people-container">
      <div class="numInfo">
        <div><NumCounter classProp="f-32-lakeblue" :numProp="LISData.users_online"/><span>人</span></div>
        <span>目前登入使用者</span>
      </div>
      <div class="hr"></div>
      <div class="numInfo">
        <div><NumCounter classProp="f-32-moonblue" :numProp="LISData.users_todaylogin"/><span>人</span></div>
        <span>今日登入人次</span>
      </div>
      <div class="hr"></div>
      <div class="numInfo">
        <div><NumCounter classProp="f-32-lakeblue" :numProp="LISData.users_count"/><span>人</span></div>
        <span>系統註冊人數</span>
      </div>
      <div class="hr"></div>
      <div class="numInfo">
        <div><NumCounter classProp="f-32-moonblue" :numProp="LISData.user_insystime"/><span>分鐘</span></div>
        <span class="text-warp">使用者登入系統平均時間</span>
      </div>
    </div>
  </div>
  </div>

</template>
<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import NumCounter from '@/components/num-counter.vue'
import DotSwitcher from '@/components/dot-switcher.vue'
//切換顯示
const switchControl_People = ref(1)

function changeSwitchValue(receivedNum) {
    switchControl_People.value = receivedNum; // 更新父组件的 switchControl 值
}


//取得資料
const LISData = inject('LISData');
//console.log("inject",LISData)
const elementHeight = ref(0);
const People = ref(null);
const updateHeight = () => {
   if (People.value) {
      elementHeight.value = People.value.offsetHeight;
   }
};


onMounted(() => {
      updateHeight();

      // 監聽窗口大小變化以及元素變化
      window.addEventListener('resize', updateHeight);
      const observer = new ResizeObserver(updateHeight);
      observer.observe(People.value);

      // 组件卸载时清除监听器
      onUnmounted(() => {
        window.removeEventListener('resize', updateHeight);
        observer.disconnect();
      });
    });

</script>

<style scope>
.people-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.numInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.People span {
  font-size: 1.6rem;
  color: var(--black);
}

.text-warp {
  width: 120px;
  word-wrap: break-word;
  line-height: 1.1;
  text-align: center;
}


</style>
