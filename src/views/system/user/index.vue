<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { userList } from '@/api/modules/user';
import { filterObj } from '@/utils/tools';
import { Pagination } from '@/types/global';

interface QueryUser {
  name: string;
}

const loading = ref(false);
const tableData = ref([]);
const filterFields = { name: '' };
const form = reactive<QueryUser>({ ...filterFields });
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
  showPageSize: true,
  showJumper: true,
  hideOnSinglePage: false,
  showTotal: true,
  size: 'small',
});

const getQueryParams = () => {
  const param = {
    ...toRaw(form),
    pageNo: pagination.current,
    pageSize: pagination.pageSize,
  };
  return filterObj(param);
};
const getList = (pageNo?: number) => {
  if (pageNo) {
    pagination.current = pageNo;
  }
  const params = getQueryParams();

  loading.value = true;
  userList(params)
    .then(({ success, message, result }) => {
      if (success) {
        tableData.value = result.records;
        pagination.total = result.total;
        return;
      }
      Message.warning(message);
    })
    .finally(() => {
      loading.value = false;
    });
};
const onSearchQuery = () => {
  getList();
};
const onResetQuery = () => {
  Object.assign(form, { ...filterFields });
  getList(1);
};
const onPageNoChange = (pageNo: number) => {
  pagination.current = pageNo;
  getList();
};
const onPageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize;
  for (let index = pagination.current; index >= 1; index -= 1) {
    if ((index - 1) * pagination.pageSize < (pagination.total || 0)) {
      pagination.current = index;
      break;
    }
  }
  getList();
};
onMounted(() => {
  getList();
});
</script>

<template>
  <div class="page-wrapper">
    <TableFilter
      :form="form"
      :onSearchQuery="onSearchQuery"
      :onResetQuery="onResetQuery"
    >
      <template v-slot:item1>
        <a-form-item field="name" label="用户姓名">
          <a-input v-model="form.name" />
        </a-form-item>
      </template>
    </TableFilter>
    <a-divider style="margin-top: 0px" />
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
</template>

<style scoped lang="less">
@import '@/assets/css/common.less';
</style>
