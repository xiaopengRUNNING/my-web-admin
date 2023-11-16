<script setup lang="ts">
const props = defineProps({
  form: { type: Object, required: true },
  onSearchQuery: { type: Function, default: () => {} },
  onResetQuery: { type: Function, default: () => {} },
});
const slots = useSlots();
const slotsName = computed(() => Object.keys(toRaw(slots)));
const collapsed = ref(false);

const responsiveMap: Record<string, string> = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};
const screens = reactive<Record<string, boolean>>({
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  xxl: true,
});
const colArr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const col: Record<string, number> = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 2,
  xl: 3,
  xxl: 4,
};

const resultCol = computed(() => {
  let res = 1;
  for (let i = 0; i < colArr.length; i += 1) {
    const breakpoint = colArr[i];
    if (screens[breakpoint] || breakpoint === 'xs') {
      res = col[breakpoint];
      break;
    }
  }
  return res;
});
const resultRow = computed(() => {
  if (collapsed.value || slotsName.value.length <= resultCol.value) {
    return 1;
  }
  return Math.ceil(slotsName.value.length / resultCol.value);
});

interface MatchHandler {
  mql: MediaQueryList;
  listener: (_args: { matches: boolean }) => void;
}
const matchHandlers: Record<string, MatchHandler> = {};
onMounted(() => {
  Object.keys(responsiveMap).forEach((screen) => {
    const matchMediaQuery = responsiveMap[screen];

    if (!matchMediaQuery) return;
    const listener = ({ matches }: { matches: boolean }) => {
      screens[screen] = matches;
    };

    const mql = window.matchMedia(matchMediaQuery);

    if (mql.addEventListener) {
      mql.addEventListener('change', listener);
    } else {
      mql.addListener(listener);
    }
    matchHandlers[matchMediaQuery] = {
      mql,
      listener,
    };
    listener(mql);
  });
});
onUnmounted(() => {
  // 移除监听器
  Object.keys(responsiveMap).forEach((screen) => {
    const matchMediaQuery = responsiveMap[screen];
    if (!matchMediaQuery) return;
    const handler = matchHandlers[matchMediaQuery];
    if (handler && handler.mql && handler.listener) {
      if (handler.mql.removeEventListener) {
        handler.mql.removeEventListener('change', handler.listener);
      } else {
        handler.mql.removeListener(handler.listener);
      }
    }
  });
});
</script>

<template>
  <div class="overflow-hidden relative">
    <a-row>
      <a-col :flex="1">
        <a-form auto-label-width :model="props.form">
          <a-grid
            :collapsed-rows="1"
            :cols="col"
            :col-gap="16"
            :row-gap="0"
            :collapsed="collapsed"
          >
            <a-grid-item v-for="item in slotsName" :key="item">
              <slot :name="item"></slot>
            </a-grid-item>
            <a-grid-item
              v-if="resultCol > slotsName.length"
              style="display: flex"
            >
              <a-divider
                style="height: 32px; margin-left: -4px"
                direction="vertical"
              />
              <div style="flex: 1; display: flex">
                <a-button
                  type="primary"
                  style="margin-right: 12px"
                  @click="onSearchQuery"
                >
                  <template #icon>
                    <icon-search />
                  </template>
                  查询
                </a-button>
                <a-button @click="onResetQuery">
                  <template #icon>
                    <icon-refresh />
                  </template>
                  重置
                </a-button>
              </div>
            </a-grid-item>
          </a-grid>
        </a-form>
      </a-col>
      <a-col
        v-if="resultCol <= slotsName.length"
        :flex="resultRow > 1 ? '108px' : '198px'"
        style="display: flex"
      >
        <a-divider
          :style="{ height: resultRow > 1 ? '84px' : '32px' }"
          direction="vertical"
        />
        <div
          style="
            flex: 1;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          "
        >
          <a-button
            type="primary"
            :style="{
              marginBottom: resultRow > 1 ? '20px' : '0px',
            }"
            @click="onSearchQuery"
          >
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
          <a-button @click="onResetQuery">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">
.collapsed-action {
  cursor: pointer;
  margin-bottom: 12px;
  color: rgb(var(--primary-6));

  &.normal {
    float: right;
    margin-top: -8px;
  }
  &.position {
    position: absolute;
    right: 0px;
    top: 92px;
  }
  &:hover {
    color: rgb(var(--primary-5));
  }
}
</style>
