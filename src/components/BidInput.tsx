import { useEffect, useState } from 'react'

interface BidInputProps {
  maxAmount: number
  onSubmit: (amount: number) => void
  onSkip: () => void
  canSkip: boolean
  error: string | null
  activePlayerId: string
}

const quickBids = [0, 5, 10, 15]

export function BidInput({ maxAmount, onSubmit, onSkip, canSkip, error, activePlayerId }: BidInputProps) {
  const [value, setValue] = useState('0')

  useEffect(() => {
    setValue('0')
  }, [activePlayerId])

  const handleQuickBid = (amount: number) => {
    setValue(String(amount))
  }

  const handleAllIn = () => {
    setValue(String(maxAmount))
  }

  return (
    <div className="bid-input bid-input--tactical">
      <div className="bid-input__header">
        <span>Enter your secret bid</span>
        <span className="bid-input__balance">£{maxAmount} available</span>
      </div>

      <div className="bid-input__buttons">
        {quickBids.map((amount) => (
          <button
            key={amount}
            type="button"
            className="button button--secondary bid-input__quick"
            onClick={() => handleQuickBid(amount)}
          >
            £{amount}
          </button>
        ))}
        <button type="button" className="button button--gold bid-input__quick" onClick={handleAllIn}>
          ALL IN
        </button>
      </div>

      <div className="bid-input__field">
        <input
          id="bidAmount"
          type="number"
          inputMode="numeric"
          min="0"
          max={maxAmount}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <span className="bid-input__coin">💰</span>
      </div>

      {error && <div className="bid-input__error">{error}</div>}

      <div className="bid-input__actions">
        <button type="button" className="button button--primary button--large" onClick={() => onSubmit(Number(value))}>
          Commit bid
        </button>
        <button type="button" className="button button--secondary button--large" onClick={onSkip} disabled={!canSkip}>
          Use skip
        </button>
      </div>
    </div>
  )
}
