<script setup lang="ts">
const props = defineProps<{
  gameState: {
    score: number
  }
  leaderboard: {
    attempt: number
    score: number
  }[]
  clearLeaderboard: () => void
  resetGame: () => void
}>()
</script>

<template>
  <div class="game-over">
    <h2>Game Over!</h2>
    <p class="final-score">
      Final Score: {{ gameState.score }} correct answers
    </p>

    <div class="leaderboard">
      <div class="leaderboard__header">
        <h3>Leaderboard</h3>
        <button @click="clearLeaderboard" class="clear-button">
          Clear Leaderboard
        </button>
      </div>

      <div class="leaderboard__items">
        <div
          v-for="entry in leaderboard"
          :key="entry.attempt"
          class="leaderboard__item"
        >
          Attempt {{ entry.attempt }} - {{ entry.score }} answers
        </div>
      </div>
    </div>

    <button @click="resetGame" class="play-again">Play Again</button>
  </div>
</template>

<style scoped>
.game-over {
  text-align: center;
}

.final-score {
  font-size: 1.5em;
  font-weight: bold;
  margin: 20px 0;
}

.leaderboard {
  margin: 20px auto;
  max-width: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.leaderboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.leaderboard__items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.leaderboard__item {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.clear-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background: #f44336;
  color: white;
  cursor: pointer;
  font-size: 0.9em;
}

.clear-button:hover {
  background: #d32f2f;
}

.play-again {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #2196f3;
  color: white;
  cursor: pointer;
  margin-top: 20px;
}
</style>
