export const categories = [
  'GDP',
  'population',
  'foodRank',
  'landArea',
  'tourism',
  'militaryPower',
  'lifeExpectancy',
  'olympicMedals',
  'exports',
  'naturalResources',
  'happiness',
  'techLevel',
] as const

export type Category = (typeof categories)[number]
export type GameStatus = 'playing' | 'finished'

export interface Country {
  id: string
  name: string
  flag: string
  stats: Record<Category, number>
}

export interface Player {
  id: string
  name: string
  money: number
  countries: Country[]
  skips: number
  active: boolean
}

export interface RoundResult {
  country: Country
  winnerId?: string
  tie: boolean
  skippedById?: string
  message: string
}

export interface GameState {
  category: Category
  players: Player[]
  remainingCountries: Country[]
  currentCountry?: Country
  roundNumber: number
  status: GameStatus
  pendingBids?: Record<string, number>
}
