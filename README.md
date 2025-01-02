# Guess the Cards - An Interactive Card Game Prototype

## Project setup

```
npm install
```

## Configuration note

```
An .env file should be added to the root of the project with the following content:

VITE_APP_API_KEY='YOUR-API-KEY-GOES-HERE'
```

## Goal of the Game:

Answer correctly as many times as possible.

## Gameplay:

- Player starts with 100 seconds (time acts as life).
- Each round, 5 cards are dealt, and the time starts ticking down.
- Player is presented with 3 possible hand rankings (e.g., Straight Flush).
- Player must choose the correct hand ranking.
- A correct answer adds 5 seconds to the playerʼs time.
- A wrong answer removes 5 seconds to the playerʼs time.
- The game ends when time runs out (reaches 0).
- At the end of the game, a summary screen displays:
  - Total correct answers.
  - Previous attempts.

### Bonus Points:

- After each round, call the Random Word API (https://api-
  ninjas.com/api/randomword).
- Display a funny message based on the API response.

### Resources & Tech Stack:

- Frontend framework: React / Vue3 + TypeScript + Vite Component library: anything or without
- Poker hand ranking: PokerSolver to determine hand rankings
