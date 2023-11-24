<script setup lang="ts">
import { userList } from '@/api/modules/user';
import usePageTable from '@/hooks/usePageTable';
import UserForm from './components/userForm.vue';

type UserFormCtx = InstanceType<typeof UserForm>;

const filterFieldsRef = ref({ name: '' });
const formRef = ref<null | UserFormCtx>(null);

const {
  loading,
  tableData,
  pagination,
  onSearchQuery,
  onResetQuery,
  onPageNoChange,
  onPageSizeChange,
  getList,
} = usePageTable({
  filterFieldsRef,
  listAction: userList,
});

const onAdd = () => {
  formRef.value?.onShow();
};
</script>

<template>
  <div class="page-wrapper">
    <TableFilter
      :form="filterFieldsRef"
      :onSearchQuery="onSearchQuery"
      :onResetQuery="onResetQuery"
    >
      <template v-slot:item1>
        <a-form-item field="name" label="用户姓名">
          <a-input v-model="filterFieldsRef.name" />
        </a-form-item>
      </template>
    </TableFilter>
    <a-divider style="margin-top: 0px" />
    <div class="page-table-operator">
      <a-button @click="onAdd">
        <template #icon>
          <icon-plus />
        </template>
        新增
      </a-button>
    </div>
    <a-table
      row-key="_id"
      :bordered="false"
      :data="tableData"
      :loading="loading"
      :pagination="pagination"
      @pageChange="onPageNoChange"
      @pageSizeChange="onPageSizeChange"
    >
      <template #columns>
        <a-table-column title="序号" :width="60">
          <template #cell="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="账号" data-index="username"></a-table-column>
        <a-table-column title="用户姓名" data-index="name"></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column title="操作" align="center"> </a-table-column>
      </template>
    </a-table>
  </div>

  <UserForm ref="formRef" @submit="getList"></UserForm>
</template>

<style scoped lang="less">
@import '@/assets/css/common.less';
</style>
