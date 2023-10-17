<script setup lang="ts">
import GlobalHeader from './GlobalHeader.vue';
import GlobalFooter from './GlobalFooter.vue';
</script>

<template>
  <a-layout class="h-full">
    <a-layout-header class="h-14">
      <GlobalHeader></GlobalHeader>
    </a-layout-header>
    <a-layout>
      <a-layout-sider :width="240"> Sider </a-layout-sider>
      <a-layout>
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
.global-content-wrapper {
  background-color: var(--color-fill-3);
  padding: 16px 20px 0;
}
</style>
