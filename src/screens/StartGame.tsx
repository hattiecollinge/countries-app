import type { Category } from '../game/types'
import { categories } from '../game/types'
import { useState } from 'react'

interface StartGameProps {
  onStart: (category: Category) => void
}

const categoryMeta: Record<Category, { label: string; icon: string; subtitle: string }> = {
  GDP: { label: 'GDP Challenge', icon: '💰', subtitle: 'Economic power' },
  population: { label: 'Population Challenge', icon: '👥', subtitle: 'Global influence' },
  foodRank: { label: 'Food Challenge', icon: '🍜', subtitle: 'Culinary dominance' },
  landArea: { label: 'Land Challenge', icon: '🏔️', subtitle: 'Territorial strength' },
  tourism: { label: 'Tourism Challenge', icon: '✈️', subtitle: 'Visitor appeal' },
  militaryPower: { label: 'Military Challenge', icon: '⚔️', subtitle: 'Strategic might' },
  lifeExpectancy: { label: 'Legacy Challenge', icon: '🕰️', subtitle: 'Longevity' },
  olympicMedals: { label: 'Medal Challenge', icon: '🏅', subtitle: 'Sporting prestige' },
  exports: { label: 'Trade Challenge', icon: '🚢', subtitle: 'Export dominance' },
  naturalResources: { label: 'Resource Challenge', icon: '⛏️', subtitle: 'Natural wealth' },
  happiness: { label: 'Harmony Challenge', icon: '😊', subtitle: 'Social spirit' },
  techLevel: { label: 'Tech Challenge', icon: '🧠', subtitle: 'Innovation edge' },
}

export function StartGame({ onStart }: StartGameProps) {
  const [category, setCategory] = useState<Category>('GDP')

  return (
    <main className="screen screen--start">
      <section className="start-hero">
        <div className="start-hero__badge">🌎 Country Clash</div>
        <h1>Bid. Conquer. Dominate.</h1>
        <p>Choose your arena and launch the ultimate battle for global supremacy.</p>
      </section>

      <section className="category-grid">
        {categories.map((option) => {
          const meta = categoryMeta[option]
          return (
            <button
              key={option}
              type="button"
              className={`category-card ${option === category ? 'category-card--active' : ''}`}
              onClick={() => setCategory(option)}
            >
              <div className="category-card__icon">{meta.icon}</div>
              <div className="category-card__label">{meta.label}</div>
              <div className="category-card__text">{meta.subtitle}</div>
            </button>
          )
        })}
      </section>

      <button type="button" className="button button--primary button--large" onClick={() => onStart(category)}>
        Start the conquest
      </button>
    </main>
  )
}
