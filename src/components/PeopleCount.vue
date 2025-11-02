<template>
  <div class="InfoCard People" ref="People">
    <!-- 小螢幕 DotSwitcher -->
    <DotSwitcher v-if="elementHeight < 480" :DotNum="2" :switchControl="switchControl_People"
      @change-switch="changeSwitchValue" :isColumn="false" :marginLeft="'0px'" />

    <div class="people-container">
      <div v-for="section in visibleSections" :key="section.title" class="numInfo">
        <div>
          <NumCounter :classProp="section.colorClass" :numProp="section.value" />
          <span class="f-16-black">{{ section.unit }}</span>
        </div>
        <span class="f-16-black" :class="section.textWarp ? 'text-warp' : ''">{{ section.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import NumCounter from '@/components/num-counter.vue'
import DotSwitcher from '@/components/dot-switcher.vue'
import type { BoardData } from '@/types/BoardData'


// DotSwitcher 狀態
const switchControl_People = ref(1)
function changeSwitchValue(receivedNum: number) {
  switchControl_People.value = receivedNum
}

// 取得資料
const props = defineProps<{ LISData: BoardData }>()

// 監控元素高度
const elementHeight = ref(0)
const People = ref<HTMLElement | null>(null)
let observer: ResizeObserver | null = null

const updateHeight = () => {
  if (People.value) elementHeight.value = People.value.offsetHeight
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)

  observer = new ResizeObserver(updateHeight)
  if (People.value) observer.observe(People.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  observer?.disconnect()
})


interface Section {
  title: string
  value: number
  unit: string
  colorClass: string
  textWarp?: boolean
  switchNum: number
}

const sections = computed<Section[]>(() => [
  {
    title: '目前登入使用者',
    value: props.LISData.users_online ?? 0,
    unit: '人',
    colorClass: 'f-32-lakeblue',
    switchNum: 1
  },
  {
    title: '今日登入人次',
    value: props.LISData.users_todaylogin ?? 0,
    unit: '人',
    colorClass: 'f-32-moonblue',
    switchNum: 1
  },
  {
    title: '系統註冊人數',
    value: props.LISData.users_count ?? 0,
    unit: '人',
    colorClass: 'f-32-lakeblue',
    switchNum: 2
  },
  {
    title: '使用者登入系統平均時間',
    value: props.LISData.user_insystime ?? 0,
    unit: '分鐘',
    colorClass: 'f-32-moonblue',
    textWarp: true,
    switchNum: 2
  }
])

// 根據螢幕大小與切換值過濾
const visibleSections = computed(() =>
  elementHeight.value < 480
    ? sections.value.filter(s => s.switchNum === switchControl_People.value)
    : sections.value
)
</script>

<style scoped>
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

.f-16-black {
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
