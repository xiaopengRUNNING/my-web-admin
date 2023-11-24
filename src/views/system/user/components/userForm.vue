<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { userAdd } from '@/api/modules/user';

const emits = defineEmits(['submit']);

const visible = ref(false);
const formRef = ref<FormInstance>();
const form = reactive({
  username: '',
  name: '',
  password: '',
});

const onShow = () => {
  visible.value = true;
};
const handleBeforeOk = async () => {
  // visible.value = false;
  const error = await formRef.value?.validate();
  if (error) {
    return false;
  }

  const { success, message } = await userAdd(toRaw(form));

  if (!success) {
    Message.warning(message);
    return false;
  }

  emits('submit');
  return true;
};

defineExpose({ onShow });
</script>

<template>
  <a-modal v-model:visible="visible" :on-before-ok="handleBeforeOk">
    <template #title> 新增 </template>
    <div>
      <a-form ref="formRef" :model="form" auto-label-width>
        <a-form-item
          field="username"
          label="账号"
          :rules="[{ required: true, message: '请填写账号！' }]"
        >
          <a-input v-model="form.username" placeholder="请输入..." />
        </a-form-item>
        <a-form-item
          field="name"
          label="姓名"
          :rules="[{ required: true, message: '请填写姓名！' }]"
        >
          <a-input v-model="form.name" placeholder="请输入..." />
        </a-form-item>
        <a-form-item
          field="password"
          label="密码"
          :rules="[{ required: true, message: '请填写密码！' }]"
        >
          <a-input v-model="form.password" placeholder="请输入..."> </a-input>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<style scoped lang="less"></style>
