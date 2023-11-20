import { Message } from '@arco-design/web-vue';
import { Pagination } from '@/types/global';
import { filterObj } from '@/utils/tools';

export default function usePageTable({
  filterFieldsRef,
  disabledMounted = false,
  listAction,
}: {
  filterFieldsRef: Ref;
  disabledMounted?: boolean;
  listAction: (_params?: object) => Promise<any>;
}) {
  const initFilterFields = JSON.parse(
    JSON.stringify(toRaw(filterFieldsRef.value)),
  );

  const loading = ref(false);
  const tableData = ref([]);
  const pagination = ref<Pagination>({
    current: 1,
    pageSize: 10,
    total: 0,
    showPageSize: true,
    showJumper: true,
    hideOnSinglePage: false,
    showTotal: true,
    size: 'small',
  });

  // 获取分页参数以及过滤参数
  const getQueryParams = () => {
    const param = {
      ...filterFieldsRef.value,
      pageNo: pagination.value.current,
      pageSize: pagination.value.pageSize,
    };
    return filterObj(param);
  };

  // 分页查询
  const getList = (pageNo?: number) => {
    if (pageNo) {
      pagination.value.current = pageNo;
    }
    const params = getQueryParams();

    loading.value = true;
    listAction(params)
      .then(({ success, message, result }) => {
        if (success) {
          tableData.value = result.records;
          pagination.value.total = result.total;
          return;
        }
        Message.warning(message);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  // 查询
  const onSearchQuery = () => {
    getList(1);
  };
  // 清空过滤条件后查询
  const onResetQuery = () => {
    Object.assign(filterFieldsRef.value, { ...initFilterFields });
    getList(1);
  };

  const onPageNoChange = (pageNo: number) => {
    pagination.value.current = pageNo;
    getList();
  };
  const onPageSizeChange = (pageSize: number) => {
    pagination.value.pageSize = pageSize;
    for (let index = pagination.value.current; index >= 1; index -= 1) {
      if (
        (index - 1) * pagination.value.pageSize <
        (pagination.value.total || 0)
      ) {
        pagination.value.current = index;
        break;
      }
    }
    getList();
  };

  onMounted(() => {
    if (!disabledMounted) {
      getList();
    }
  });

  return {
    loading,
    tableData,
    filterFieldsRef,
    pagination,
    onSearchQuery,
    onResetQuery,
    onPageNoChange,
    onPageSizeChange,
    getList,
  };
}
