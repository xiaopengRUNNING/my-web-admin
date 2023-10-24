<script setup lang="ts">
const router = useRouter();
const test = () => {
  router.push('/login');
};
</script>

<template>
  <div class="test">
    home
    <a-button @click="test">test</a-button>
  </div>
</template>

<style scoped lang="less">
.test {
  background-color: var(--color-bg-2);
}
</style>
