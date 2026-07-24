import { CountryCard } from '../components/CountryCard'
import { PlayerStatus } from '../components/PlayerStatus'
import { BidInput } from '../components/BidInput'
import type { GameState } from '../game/types'

interface GameScreenProps {
  gameState: GameState
  activePlayerId: string
  error: string | null
  onSubmitBid: (amount: number) => void
  onSkip: () => void
}

export function GameScreen({ gameState, activePlayerId, error, onSubmitBid, onSkip }: GameScreenProps) {
  const activePlayer = gameState.players.find((player) => player.id === activePlayerId)!
  const nextCountry = gameState.currentCountry!

  return (
    <main className="screen screen--game">
      <div className="game-header">
        <div>
          <p className="game-header__label">Round {gameState.roundNumber}</p>
          <h2>{activePlayer.name} - tactical choice</h2>
        </div>
        <div className="game-header__status">Category: {gameState.category}</div>
      </div>

      <div className="game-panel">
        <PlayerStatus player={activePlayer} isActive />
        <CountryCard country={nextCountry} />
        <BidInput
          key={activePlayerId}
          maxAmount={activePlayer.money}
          onSubmit={onSubmitBid}
          onSkip={onSkip}
          canSkip={activePlayer.skips > 0}
          error={error}
          activePlayerId={activePlayerId}
        />
      </div>
    </main>
  )
}
