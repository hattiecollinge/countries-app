import type { Player } from '../game/types'

interface PlayerStatusProps {
  player: Player
  isActive: boolean
}

export function PlayerStatus({ player, isActive }: PlayerStatusProps) {
  return (
    <section className={`player-hud ${isActive ? 'player-hud--active' : ''}`}>
      <div className="player-hud__header">
        <span className="player-hud__title">{player.name}</span>
        {isActive && <span className="player-hud__tag">CURRENT TURN</span>}
      </div>
      <div className="player-hud__stats">
        <div>
          <span className="player-hud__icon">💰</span>
          <strong>£{player.money}</strong>
          <p>Balance</p>
        </div>
        <div>
          <span className="player-hud__icon">🌍</span>
          <strong>{player.countries.length}</strong>
          <p>Countries</p>
        </div>
        <div>
          <span className="player-hud__icon">⏭️</span>
          <strong>{player.skips}</strong>
          <p>Skips</p>
        </div>
      </div>
      {player.money === 0 && <div className="player-hud__warning">You are out of money</div>}
    </section>
  )
}
