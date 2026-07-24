import { allCountries } from './countries'
import type { GameState, Player, RoundResult } from './types'

const STARTING_MONEY = 20
const STARTING_SKIPS = 2

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

function clonePlayers(players: Player[]) {
  return players.map((player) => ({ ...player, countries: [...player.countries] }))
}

export function startGame(category: GameState['category']): GameState {
  return {
    category,
    players: [
      { id: 'player1', name: 'Player 1', money: STARTING_MONEY, countries: [], skips: STARTING_SKIPS, active: true },
      { id: 'player2', name: 'Player 2', money: STARTING_MONEY, countries: [], skips: STARTING_SKIPS, active: false },
    ],
    remainingCountries: shuffle(allCountries),
    currentCountry: undefined,
    roundNumber: 0,
    status: 'playing',
    pendingBids: {},
  }
}

export function drawCountry(state: GameState): GameState {
  if (state.status === 'finished' || state.remainingCountries.length === 0) {
    return { ...state, currentCountry: undefined, status: 'finished' }
  }

  const [nextCountry, ...rest] = state.remainingCountries
  return {
    ...state,
    currentCountry: nextCountry,
    remainingCountries: rest,
    roundNumber: state.roundNumber + 1,
    pendingBids: {},
  }
}

export function submitBid(state: GameState, playerId: string, amount: number): GameState {
  const player = state.players.find((entry) => entry.id === playerId)
  if (!player) {
    throw new Error('Player not found')
  }

  if (amount < 0 || amount > player.money) {
    throw new Error('Bid must be between £0 and available money')
  }

  return {
    ...state,
    pendingBids: {
      ...(state.pendingBids ?? {}),
      [playerId]: amount,
    },
  }
}

export function resolveBids(state: GameState): { state: GameState; result: RoundResult } {
  if (!state.currentCountry) {
    throw new Error('No country selected')
  }

  const bids = state.pendingBids ?? {}
  const player1Bid = bids['player1'] ?? 0
  const player2Bid = bids['player2'] ?? 0

  let nextPlayers = clonePlayers(state.players).map((player) => ({ ...player, active: player.id === 'player1' }))
  let nextState: GameState = {
    ...state,
    players: nextPlayers,
    pendingBids: {},
    currentCountry: undefined,
  }

  if (player1Bid === player2Bid) {
    const result: RoundResult = {
      country: state.currentCountry,
      tie: true,
      message: `Tie — nobody wins ${state.currentCountry.name}`,
    }
    return {
      state: { ...nextState, status: checkGameEnd(nextState) ? 'finished' : 'playing' },
      result,
    }
  }

  const winnerId = player1Bid > player2Bid ? 'player1' : 'player2'
  nextPlayers = nextPlayers.map((player) => {
    if (player.id !== winnerId) {
      return player
    }
    return {
      ...player,
      money: player.money - bids[winnerId],
      countries: [...player.countries, state.currentCountry!],
    }
  })

  const nextStateWithWinner: GameState = {
    ...nextState,
    players: nextPlayers,
    status: checkGameEnd({ ...nextState, players: nextPlayers }) ? 'finished' : 'playing',
  }

  const result: RoundResult = {
    country: state.currentCountry,
    winnerId,
    tie: false,
    message: `${nextPlayers.find((player) => player.id === winnerId)!.name} won ${state.currentCountry.name}`,
  }

  return { state: nextStateWithWinner, result }
}

export function skipCountry(state: GameState, playerId: string): GameState {
  if (!state.currentCountry) {
    throw new Error('No country selected')
  }

  const player = state.players.find((entry) => entry.id === playerId)
  if (!player) {
    throw new Error('Player not found')
  }

  if (player.skips <= 0) {
    throw new Error('No skips remaining')
  }

  const nextPlayers = state.players.map((entry) => {
    if (entry.id !== playerId) {
      return { ...entry, active: false }
    }
    return {
      ...entry,
      skips: entry.skips - 1,
      active: false,
    }
  })

  const nextState: GameState = {
    ...state,
    players: nextPlayers.map((player, index) => ({
      ...player,
      active: index === 0,
    })),
    currentCountry: undefined,
    pendingBids: {},
  }

  return nextState
}

export function checkGameEnd(state: GameState) {
  const [player1, player2] = state.players
  const bothHaveFourCountries = player1.countries.length === 4 && player2.countries.length === 4
  const bothOutOfMoney = player1.money === 0 && player2.money === 0
  const noCountriesLeft = state.currentCountry === undefined && state.remainingCountries.length === 0

  return bothHaveFourCountries || bothOutOfMoney || noCountriesLeft
}
