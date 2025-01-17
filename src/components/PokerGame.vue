<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted, computed } from 'vue'
import { Hand } from 'pokersolver'
import type { GameState, LeaderboardEntry } from '../types/types'
import Header from './Header.vue'
import StartScreen from './StartScreen.vue'
import GamePlay from './GamePlay.vue'
import GameOver from './GameOver.vue'

const API_KEY = import.meta.env.VITE_APP_API_KEY
const INITIAL_TIME = 100
const TIME_BONUS = 5
const CARDS_PER_HAND = 5

const gameState = reactive<GameState>({
  timeRemaining: INITIAL_TIME,
  score: 0,
  isGameOver: false,
  currentHand: [],
  options: [],
  correctAnswer: '',
  funnyMessage: '',
})

const isGameStarted = ref(false)
const timer = ref<number | null>(null)
const leaderboard = ref<LeaderboardEntry[]>([])

const possibleRankings = [
  'Royal Flush',
  'Straight Flush',
  'Four of a Kind',
  'Full House',
  'Flush',
  'Straight',
  'Three of a Kind',
  'Two Pair',
  'Pair',
  'High Card',
]

// Generate a deck of cards
const deck = computed(() => {
  const suits = ['H', 'D', 'C', 'S']
  const values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
  ]
  const cards: string[] = []

  suits.forEach((suit) => {
    values.forEach((value) => {
      cards.push(value + suit)
    })
  })

  return cards
})

// Load the leaderboard from localStorage
const loadLeaderboard = () => {
  const stored = localStorage.getItem('pokerGameLeaderboard')
  if (stored) {
    leaderboard.value = JSON.parse(stored)
  }
}

// Save the score to the leaderboard using localStorage
const saveScore = (score: number) => {
  const newEntry: LeaderboardEntry = {
    attempt: leaderboard.value.length + 1,
    score: score,
  }
  leaderboard.value.push(newEntry)
  localStorage.setItem(
    'pokerGameLeaderboard',
    JSON.stringify(leaderboard.value)
  )
}

const clearLeaderboard = () => {
  leaderboard.value = []
  localStorage.removeItem('pokerGameLeaderboard')
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const dealHand = () => {
  const shuffledDeck = shuffleArray([...deck.value])
  return shuffledDeck.slice(0, CARDS_PER_HAND)
}

const getHandRanking = (hand: string[]) => {
  const solvedHand = Hand.solve(hand)
  return solvedHand.name
}

const generateOptions = (correctAnswer: string) => {
  const options = [correctAnswer]
  while (options.length < 3) {
    const randomRanking =
      possibleRankings[Math.floor(Math.random() * possibleRankings.length)]
    if (!options.includes(randomRanking)) {
      options.push(randomRanking)
    }
  }
  return shuffleArray(options)
}

const getFunnyMessage = async () => {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/randomword', {
      headers: {
        'X-Api-Key': API_KEY,
      },
    })
    const data = await response.json()
    gameState.funnyMessage = `Your ${data.word} play style is impressive!`
  } catch (error) {
    console.error('Error fetching random word:', error)
    gameState.funnyMessage = 'Your play style is fascinating!'
  }
}

const startNewRound = () => {
  const newHand = dealHand()
  const correctAnswer = getHandRanking(newHand)

  gameState.currentHand = newHand
  gameState.correctAnswer = correctAnswer
  gameState.options = generateOptions(correctAnswer)

  getFunnyMessage()
}

const isCorrect = ref<boolean | null>(null)
const message = ref<string>('')

const checkAnswer = (selectedAnswer: string) => {
  if (gameState.isGameOver) return

  isCorrect.value = selectedAnswer === gameState.correctAnswer

  if (isCorrect.value) {
    gameState.score++
    gameState.timeRemaining += TIME_BONUS
    message.value = 'Correct answer, you got 5 seconds'
  } else {
    gameState.timeRemaining -= TIME_BONUS
    message.value = 'Wrong answer, you lost 5 seconds'
  }

  startMessageTimer()
  startNewRound()
}

const startTimer = () => {
  timer.value = setInterval(() => {
    if (gameState.timeRemaining <= 0) {
      endGame()
      return
    }
    gameState.timeRemaining--
  }, 1000)
}

const startMessageTimer = () => {
  setTimeout(() => {
    message.value = ''
  }, 2000)
}

const endGame = () => {
  gameState.isGameOver = true
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
  saveScore(gameState.score)
}

const startGame = () => {
  isGameStarted.value = true
  gameState.timeRemaining = INITIAL_TIME
  gameState.score = 0
  gameState.isGameOver = false
  gameState.currentHand = []
  gameState.options = []
  gameState.correctAnswer = ''
  gameState.funnyMessage = ''

  startNewRound()
  startTimer()
}

const resetGame = () => {
  isGameStarted.value = false
  gameState.isGameOver = false
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

onMounted(() => {
  loadLeaderboard()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <div class="container">
    <Header
      :isGameStarted="isGameStarted"
      :timeRemaining="gameState.timeRemaining"
      :score="gameState.score"
    />

    <StartScreen
      v-if="!isGameStarted && !gameState.isGameOver"
      :startGame="startGame"
    />
    <GamePlay
      v-else-if="!gameState.isGameOver"
      :gameState="gameState"
      :message="message"
      :checkAnswer="checkAnswer"
    />

    <GameOver
      v-else
      :gameState="gameState"
      :leaderboard="leaderboard"
      :clearLeaderboard="clearLeaderboard"
      :resetGame="resetGame"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
