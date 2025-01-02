<script setup lang="ts">
const props = defineProps<{
  isGameStarted: boolean
  timeRemaining: number
  score: number
}>()
</script>

<template>
  <div class="header">
    <h1>Guess the Cards</h1>
    <div v-if="isGameStarted" class="header__stats">
      <p>Time: {{ timeRemaining }}s</p>
      <p>Score: {{ score }}</p>
    </div>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}

.header__stats {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
</style>
