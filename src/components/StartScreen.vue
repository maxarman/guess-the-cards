<script setup lang="ts">
const props = defineProps<{
  startGame: () => void
}>()
</script>

<template>
  <div class="start-screen">
    <h2>Welcome to Guess the Cards!</h2>
    <p>Test your poker hand recognition skills.</p>
    <button @click="startGame" class="start-button">Start Game</button>
  </div>
</template>

<style scoped>
.start-screen {
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
}

.start-button {
  padding: 15px 30px;
  font-size: 1.2em;
  border: none;
  border-radius: 4px;
  background: #2196f3;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
}

.start-button:hover {
  background: #1976d2;
}
</style>
