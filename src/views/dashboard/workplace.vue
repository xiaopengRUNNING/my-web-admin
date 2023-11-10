<script setup lang="ts">
import { socket } from './socket.ts';

onBeforeMount(() => {
  socket.connect();
});

onMounted(() => {
  socket.on('onMessage', (e) => {
    console.log('🚀 ~ file: workplace.vue:15 ~ socket.on ~ e:', e);
  });
});

onUnmounted(() => {
  socket.disconnect();
});

const handleClick = () => {
  socket.emit('newMessage', { test: '111' }, (e: any) => {
    console.log(e);
  });
};
</script>

<template>
  <div>
    workplace

    <a-button @click="handleClick">test</a-button>
  </div>
</template>

<style scoped></style>
