<template>
  <vue3-autocounter ref='counter' :startAmount='0' :endAmount='numProp' :duration='1' separator=',' decimalSeparator='.' :decimals='0' :autoinit='true' :class="classProp" />
</template>

<script>
import { defineComponent } from 'vue';
import Vue3autocounter from 'vue3-autocounter';

export default defineComponent({
  name: 'vue3-counter',
  components: {
    'vue3-autocounter': Vue3autocounter
  },
  props: {
    classProp: String,
    numProp : Number
  },
});   

</script>

<style scoped>
.f-32-moonblue{
  font-size: 3.2rem;
  color: var(--moon-blue);
}

.f-32-lakeblue{
  font-size: 3.2rem;
  color: var(--lake-blue);
}

.f-32-g-blue{
    font-size: 3.2rem;
    font-weight: 500;
    background: linear-gradient(311deg, #007183 17.23%, rgba(97, 0, 255, 0.00) 179.83%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>
