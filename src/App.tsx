import './App.css'
import useGame from './hooks/useGame'
import { StartGame } from './screens/StartGame'
import { PlayerSelect } from './screens/PlayerSelect'
import { GameScreen } from './screens/GameScreen'
import { RevealResult } from './components/RevealResult'
import { ResultsScreen } from './screens/ResultsScreen'

function App() {
  const {
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
  } = useGame()

  const activePlayerName = gameState?.players.find((player) => player.id === activePlayerId)?.name ?? 'Player'

  return (
    <div className="app-shell">
      {screen === 'start' && <StartGame onStart={startNewGame} />}

      {screen === 'select' && gameState && (
        <PlayerSelect playerName={activePlayerName} onSelect={() => selectPlayerTurn(activePlayerId)} />
      )}

      {screen === 'play' && gameState && (
        <GameScreen
          gameState={gameState}
          activePlayerId={activePlayerId}
          error={error}
          onSubmitBid={submitPlayerBid}
          onSkip={skipCurrentCountry}
        />
      )}

      {screen === 'reveal' && roundResult && (
        <RevealResult result={roundResult} onContinue={continueAfterReveal} />
      )}

      {screen === 'results' && gameState && (
        <ResultsScreen state={gameState} onRestart={restartGame} />
      )}
    </div>
  )
}

export default App
