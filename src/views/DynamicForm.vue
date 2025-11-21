<template>
  <div class="dynamicform">
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <template v-for="item in formSchema" :key="item.field">
        <a-form-item :label="item.label">

          <!-- input -->
          <a-input v-if="item.type === 'input'" v-model:value="formState[item.field]" />

          <!-- switch -->
          <a-switch v-else-if="item.type === 'switch'" v-model:checked="formState[item.field]" />

          <!-- checkbox -->
          <a-checkbox-group v-else-if="item.type === 'checkbox'" v-model:value="formState[item.field]">
            <a-checkbox v-for="opt in item.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-checkbox>
          </a-checkbox-group>

          <!-- radio -->
          <a-radio-group v-else-if="item.type === 'radio'" v-model:value="formState[item.field]">
            <a-radio v-for="opt in item.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-radio>
          </a-radio-group>

          <!-- textarea -->
          <a-textarea v-else-if="item.type === 'textarea'" v-model:value="formState[item.field]" />
        </a-form-item>
      </template>

      <!-- Submit -->
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.dynamicform{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>
<script lang="ts" setup>
import { reactive, toRaw } from 'vue';
import { formSchema } from '@/schema/formSchema';

// 自動生成 formState
const formState = reactive(
  formSchema.reduce((acc, cur) => {
    acc[cur.field] = cur.default;
    return acc;
  }, {} as Record<string, any>)
);

const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
</script>
