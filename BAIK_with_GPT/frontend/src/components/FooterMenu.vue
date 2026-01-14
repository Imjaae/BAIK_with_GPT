<script setup lang="ts">
const menuList = [
  { code: 'home', label: '홈' },
  { code: 'guide', label: '길안내' },
  { code: 'bus', label: '버스찾기' },
  { code: 'around', label: '주변정보' },
  { code: 'news', label: '안양시 소식' },
  { code: 'traffic', label: '교통정보' }
];
</script>

<template>
  <footer class="footer-menu">
    <button
      v-for="menu in menuList"
      :key="menu.code"
      class="footer-menu__button"
      type="button"
    >
      {{ menu.label }}
    </button>
  </footer>
</template>

<style scoped>
.footer-menu {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  padding: 12px 20px;
  background-color: rgba(0, 0, 0, 0.45);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-menu__button {
  height: 72px;
  border: none;
  border-radius: 16px;
  font-size: 20px;
  color: #fff;
  background: linear-gradient(180deg, #1f8cff 0%, #0c5dd8 100%);
  cursor: pointer;
}
</style>
