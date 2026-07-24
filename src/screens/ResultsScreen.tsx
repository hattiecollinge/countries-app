import { ScoreBoard } from '../components/ScoreBoard'
import type { GameState } from '../game/types'

interface ResultsScreenProps {
  state: GameState
  onRestart: () => void
}

export function ResultsScreen({ state, onRestart }: ResultsScreenProps) {
  return (
    <main className="screen screen--results">
      <div className="results-header">
        <span className="results-header__badge">🏆 Tournament</span>
        <h1>Battle complete</h1>
        <p>Final standings for the {state.category} challenge.</p>
      </div>
      <ScoreBoard state={state} onRestart={onRestart} />
      <button type="button" className="button button--secondary button--large" onClick={onRestart}>
        Restart campaign
      </button>
    </main>
  )
}
