<template>
  <div class="switch" :class="{'column' : props.isColumn}" :style="{marginLeft:props.marginLeft}">
    <div v-for="num in props.DotNum" :key="num">
      <div :class="{ 'active': props.switchControl === num }" class="dot" @click="handleSwitch(num)"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits , onMounted, onBeforeUnmount} from 'vue'

const emit = defineEmits(['change-switch'])

const props = defineProps({
    DotNum: Number,
    switchControl : Number,
    isColumn : Boolean,
    marginLeft : String
})

function handleSwitch(sendNum) {
  emit('change-switch', sendNum)
}

let switchTempt = 1
//每隔30秒切換
onMounted(() => {

  const timer = setInterval(() => {

    if(switchTempt < props.DotNum){
     switchTempt = switchTempt + 1
    }else{
      switchTempt = 1
    }
    // 15秒
    emit('change-switch', switchTempt)
  }, 15000)

  onBeforeUnmount(() => {
    clearInterval(timer) // 组件銷毀時清除定時器，避免内存泄漏
  })
})

</script>

<style scoped>

.switch {
    width: auto;
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
.column{
  flex-direction: column;
}
</style>
