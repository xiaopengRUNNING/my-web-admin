<script setup lang="ts">
import GlobalHeader from './GlobalHeader.vue';
import GlobalFooter from './GlobalFooter.vue';
import Menu from '../menu/index.vue';
import { useAppState } from '@/store';

const appState = useAppState();
</script>

<template>
  <a-layout class="h-full">
    <a-layout-header class="h-14 fixed top-0 w-full z-10">
      <GlobalHeader></GlobalHeader>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        :width="appState.menuCollapse ? 48 : 220"
        class="global-side-wrapper"
      >
        <Menu />
      </a-layout-sider>
      <a-layout
        :style="{
          'padding-top': '56px',
          'padding-left': appState.menuCollapse ? '48px' : '220px',
          transition: 'padding 200ms cubic-bezier(0.34, 0.69, 0.1, 1) 0ms',
        }"
      >
        <a-layout-content class="global-content-wrapper">
          <router-view />
        </a-layout-content>
        <a-layout-footer class="h-10">
          <GlobalFooter></GlobalFooter>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.global-side-wrapper {
  position: fixed;
  padding-top: 3.5rem;
  left: 0px;
  height: 100%;
}
.global-content-wrapper {
  background-color: var(--color-fill-3);
  padding: 12px 12px 0;
}
</style>
