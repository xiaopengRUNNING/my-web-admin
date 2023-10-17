<script setup lang="ts">
import { useAppState } from '@/store';

const appState = useAppState();
const theme = computed(() => {
  return appState.theme;
});
const isDark = useDark({
  selector: 'html',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'theme',
  onChanged(dark) {
    appState.toggleTheme(dark);
  },
});
const toggleTheme = useToggle(isDark);

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
</script>

<template>
  <div
    class="global-header-wrapper flex justify-center items-center h-full px-5"
  >
    <h1 class="header-system-name leading-none">{{ appState.systemName }}</h1>
    <div class="flex-1"></div>
    <ul class="flex justify-center items-center">
      <li>
        <a-tooltip
          :content="`点击切换为${theme === 'light' ? '暗黑' : '亮色'}模式`"
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleTheme()"
          >
            <template #icon>
              <icon-sun-fill v-if="theme === 'dark'" />
              <icon-moon-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li class="ml-4">
        <a-tooltip :content="`点击${isFullscreen ? '退出' : '进入'}全屏模式`">
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li class="ml-4">
        <a-avatar :style="{ backgroundColor: '#3370ff' }">
          <IconUser />
        </a-avatar>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.global-header-wrapper {
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);

  .header-system-name {
    color: var(--color-text-1);
  }
}
.nav-btn {
  border-color: rgb(var(--gray-2));
  color: rgb(var(--gray-8));
  font-size: 16px;
}
</style>
