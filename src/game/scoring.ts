import type { Category, GameState, Player } from './types'

export function getCategoryValue(country: Player['countries'][number], category: Category) {
  return country.stats[category]
}

export function calculatePlayerScore(player: Player, category: Category) {
  return player.countries.reduce((total, country) => total + getCategoryValue(country, category), 0)
}

export function calculateScores(state: GameState) {
  return state.players.map((player) => ({
    player,
    total: calculatePlayerScore(player, state.category),
  }))
}

export function getWinner(state: GameState) {
  const scores = calculateScores(state)
  const sorted = [...scores].sort((a, b) => b.total - a.total)

  if (sorted[0].total === sorted[1].total) {
    return {
      winner: null,
      tie: true,
      rankings: sorted,
    }
  }

  return {
    winner: sorted[0].player,
    tie: false,
    rankings: sorted,
  }
}

export function formatValue(value: number, category: Category) {
  if (category === 'GDP' || category === 'exports') {
    const isLarge = value > 999999999999
    if (isLarge) {
      return `£${(value / 1_000_000_000_000).toFixed(1)}T`
    }
    return `£${(value / 1_000_000_000).toFixed(1)}B`
  }

  if (category === 'population') {
    return `${Math.round(value).toLocaleString()} people`
  }

  if (category === 'landArea') {
    return `${Math.round(value).toLocaleString()} km²`
  }

  if (category === 'happiness' || category === 'lifeExpectancy' || category === 'techLevel') {
    return value.toFixed(1)
  }

  return value.toString()
}
