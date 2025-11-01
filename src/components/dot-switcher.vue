<template>
  <div class="switch" :class="{ column: props.isColumn }" :style="{ marginLeft: props.marginLeft }">
    <div v-for="num in props.DotNum" :key="num">
      <div
        class="dot"
        :class="{ active: props.switchControl === num }"
        @click="handleSwitch(num)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch, onMounted, onBeforeUnmount } from 'vue'

// ===== Props 型別定義 =====
interface Props {
  DotNum: number
  switchControl: number
  isColumn?: boolean
  marginLeft?: string
}

const props = defineProps<Props>()

// ===== Emit 型別定義 =====
const emit = defineEmits<(e: 'change-switch', value: number) => void>()

// ===== 點擊時觸發切換事件 =====
function handleSwitch(num: number) {
  switchTempt.value = num         // 更新暫存值
  emit('change-switch', num)      // 發射事件給父組件
  startAutoSwitch()               // 重置自動計時器
}

// ===== 計時器與暫存值 =====
const switchTempt = ref(1)
let timer: number | undefined

// ===== 自動切換函式 =====
function startAutoSwitch() {
  if (timer) clearInterval(timer) // 清除舊計時器
  timer = setInterval(() => {
    if (switchTempt.value < props.DotNum) {
      switchTempt.value += 1
    } else {
      switchTempt.value = 1
    }
    emit('change-switch', switchTempt.value)
  }, 15000)
}

// ===== 監聽 DotNum 改變，自動更新計時器 =====
watch(() => props.DotNum, () => {
  switchTempt.value = 1
  startAutoSwitch()
})

// ===== 元件掛載時啟動計時器 =====
onMounted(() => {
  startAutoSwitch()
})

// ===== 元件卸載時清除計時器 =====
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.switch {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: rgb(167, 214, 222);
  cursor: pointer;
}
.active {
  background-color: rgb(52, 147, 163);
}
.column {
  flex-direction: column;
}
</style>
