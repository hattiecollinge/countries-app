import type { Country } from '../game/types'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="country-card country-card--reveal">
      <div className="country-card__glow" />
      <div className="country-card__content">
        <div className="country-card__flag">
          <img
            src={`https://flagcdn.com/w320/${country.flag}.png`}
            alt={`${country.name} flag`}
            loading="lazy"
          />
        </div>
        <div className="country-card__info">
          <div className="country-card__label">Country</div>
          <div className="country-card__name">{country.name}</div>
          <div className="country-card__subtitle">World Stage</div>
        </div>
      </div>
    </div>
  )
}
