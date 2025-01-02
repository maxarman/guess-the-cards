interface GameState {
  timeRemaining: number
  score: number
  isGameOver: boolean
  currentHand: string[]
  options: string[]
  correctAnswer: string
  funnyMessage: string
}

interface LeaderboardEntry {
  attempt: number
  score: number
}

export type { GameState, LeaderboardEntry }
