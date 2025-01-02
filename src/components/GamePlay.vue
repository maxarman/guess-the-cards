<script setup lang="ts">
import Card from './Card.vue'

const props = defineProps<{
  gameState: {
    isGameOver: boolean
    currentHand: string[]
    options: string[]
    funnyMessage: string
  }
  message: string
  checkAnswer: (option: string) => void
}>()
</script>

<template>
  <div v-if="!gameState.isGameOver">
    <div class="message-container">
      <transition name="fade">
        <p v-if="message" class="message">{{ message }}</p>
      </transition>
    </div>

    <div class="current-hand">
      <Card v-for="card in gameState.currentHand" :key="card" :card="card" />
    </div>

    <div class="options">
      <button
        v-for="option in gameState.options"
        :key="option"
        @click="checkAnswer(option)"
        class="options__button"
      >
        {{ option }}
      </button>
    </div>

    <p class="funny-message">{{ gameState.funnyMessage }}</p>
  </div>
</template>

<style scoped>
.message-container {
  min-height: 34px;
  text-align: center;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  font-weight: bold;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0;
}

.current-hand {
  min-height: 214px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.options__button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #4caf50;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.options__button:hover {
  background: #45a049;
}

.funny-message {
  min-height: 44px;
  text-align: center;
  font-style: italic;
  margin: 10px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
