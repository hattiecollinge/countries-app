interface PlayerSelectProps {
  playerName: string
  onSelect: () => void
}

export function PlayerSelect({ playerName, onSelect }: PlayerSelectProps) {
  return (
    <main className="screen screen--select game-screen--dark">
      <div className="pass-screen">
        <span className="pass-screen__tag">PASS THE PHONE</span>
        <h1>{playerName}</h1>
        <p>Ready your strategy. This turn is secret — no peeking.</p>
        <button type="button" className="button button--primary button--large" onClick={onSelect}>
          Begin {playerName}'s turn
        </button>
      </div>
    </main>
  )
}
