import { useEffect, useState } from 'react'
import type { RoundResult } from '../game/types'

interface RevealResultProps {
  result: RoundResult
  onContinue: () => void
}

export function RevealResult({ result, onContinue }: RevealResultProps) {
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setFlipped(true), 360)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="reveal-result">
      <div className={`reveal-card ${flipped ? 'reveal-card--flipped' : ''}`}>
        <div className="reveal-card__inner">
          <div className="reveal-card__face reveal-card__back">
            <div className="reveal-card__globe">🌎</div>
            <div className="reveal-card__back-label">World reveal</div>
          </div>

          <div className="reveal-card__face reveal-card__front">
            <div className="reveal-card__flag">
              <img
                src={`https://flagcdn.com/w320/${result.country.flag}.png`}
                alt={`${result.country.name} flag`}
                loading="lazy"
              />
            </div>
            <div className="reveal-card__info">
              <div className="reveal-card__label">Country</div>
              <div className="reveal-card__name">{result.country.name}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal-result__celebration">🎉</div>
      <div className="reveal-result__message">{result.message}</div>
      <p className="reveal-result__detail">Card flipped. That country now joins the battle.</p>
      <button type="button" className="button button--primary button--large" onClick={onContinue}>
        Continue battle
      </button>
    </div>
  )
}
