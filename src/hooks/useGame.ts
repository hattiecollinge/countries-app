import { useState } from 'react'
import { drawCountry, resolveBids, skipCountry, startGame, submitBid, checkGameEnd } from '../game/gameEngine'
import type { Category, GameState, RoundResult } from '../game/types'

type ScreenState = 'start' | 'select' | 'play' | 'reveal' | 'results'

interface UseGameResult {
  screen: ScreenState
  gameState: GameState | null
  activePlayerId: string
  roundResult: RoundResult | null
  error: string | null
  startNewGame: (category: Category) => void
  selectPlayerTurn: (playerId: string) => void
  submitPlayerBid: (amount: number) => void
  skipCurrentCountry: () => void
  continueAfterReveal: () => void
  restartGame: () => void
}

export default function useGame(): UseGameResult {
  const [screen, setScreen] = useState<ScreenState>('start')
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [activePlayerId, setActivePlayerId] = useState('player1')
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function startNewGame(category: Category) {
    const state = drawCountry(startGame(category))
    setGameState(state)
    setActivePlayerId('player1')
    setRoundResult(null)
    setError(null)
    setScreen('select')
  }

  function submitPlayerBid(amount: number) {
    if (!gameState) {
      return
    }

    try {
      const nextState = submitBid(gameState, activePlayerId, amount)
      setError(null)

      const pendingCount = nextState.pendingBids ? Object.keys(nextState.pendingBids).length : 0
      if (pendingCount < 2) {
        const nextPlayer = activePlayerId === 'player1' ? 'player2' : 'player1'
        setGameState(nextState)
        setActivePlayerId(nextPlayer)
        setScreen('select')
        return
      }

      const resolved = resolveBids(nextState)
      setGameState(resolved.state)
      setRoundResult(resolved.result)
      setActivePlayerId('player1')
      setScreen('reveal')
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Invalid bid')
    }
  }

  function skipCurrentCountry() {
    if (!gameState) {
      return
    }

    try {
      const nextState = skipCountry(gameState, activePlayerId)
      setGameState(nextState)
      setRoundResult({
        country: gameState.currentCountry!,
        tie: false,
        skippedById: activePlayerId,
        message: `${nextState.players.find((player) => player.id === activePlayerId)!.name} skipped ${gameState.currentCountry!.name}`,
      })
      setActivePlayerId('player1')
      setError(null)
      setScreen(checkGameEnd(nextState) ? 'results' : 'reveal')
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to skip')
    }
  }

  function continueAfterReveal() {
    if (!gameState) {
      return
    }

    if (gameState.status === 'finished' || checkGameEnd(gameState)) {
      setScreen('results')
      return
    }

    const nextState = drawCountry(gameState)
    setGameState(nextState)
    setActivePlayerId('player1')
    setRoundResult(null)
    setError(null)
    setScreen('select')
  }

  function restartGame() {
    setGameState(null)
    setActivePlayerId('player1')
    setRoundResult(null)
    setError(null)
    setScreen('start')
  }

  function selectPlayerTurn(playerId: string) {
    setActivePlayerId(playerId)
    setError(null)
    setScreen('play')
  }

  return {
    screen,
    gameState,
    activePlayerId,
    roundResult,
    error,
    startNewGame,
    selectPlayerTurn,
    submitPlayerBid,
    skipCurrentCountry,
    continueAfterReveal,
    restartGame,
  }
}
