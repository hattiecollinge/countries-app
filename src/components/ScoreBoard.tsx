import { formatValue, calculateScores, getWinner } from '../game/scoring'
import type { GameState } from '../game/types'

interface ScoreBoardProps {
  state: GameState
  onRestart: () => void
}

export function ScoreBoard({ state, onRestart }: ScoreBoardProps) {
  const scores = calculateScores(state)
  const result = getWinner(state)

  return (
    <div className="score-board">
      <div className="score-board__header">
        <h2>Final Ranking</h2>
        {result.tie ? <p>It's a tie!</p> : <p>Winner: {result.winner?.name} dominates</p>}
      </div>
      <div className="score-board__players">
        {scores.map(({ player, total }, index) => (
          <div key={player.id} className="score-board__player">
            <div className="score-board__top">
              <h3>{player.name}</h3>
              <span className="score-board__place">#{index + 1}</span>
            </div>
            <p className="score-board__total">{formatValue(total, state.category)}</p>
            <ul className="score-board__country-list">
              {player.countries.map((country) => (
                <li key={country.id}>
                  <span className="score-board__flag">{country.flag}</span>
                  {country.name} — {formatValue(country.stats[state.category], state.category)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button type="button" className="button button--primary button--large" onClick={onRestart}>
        Play again
      </button>
    </div>
  )
}
