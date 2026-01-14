<script setup lang="ts">
import FooterMenu from '@/components/FooterMenu.vue';
</script>

<template>
  <div class="app-shell">
    <main class="app-main">
      <RouterView />
    </main>
    <FooterMenu />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #0b1d2d;
  color: #fff;
  font-family: 'Noto Sans KR', 'Pretendard', sans-serif;
}
</style>
  flex: 1;
  padding: 24px 0 0;
  overflow-y: auto;
}
