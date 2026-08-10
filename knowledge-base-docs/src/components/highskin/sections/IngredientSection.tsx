import type {ReactNode} from 'react';

const INGREDIENTS = [
  'Lavender',
  'Oat',
  'Citrus',
  'Plant Oil',
  'Botanical Ingredients',
];

const MATERIALS = [
  'Bamboo',
  'Silicone',
  'Cotton',
  'Kraft Paper',
  'Recycled Material',
  'Ceramic',
];

/**
 * 10. INGREDIENT & MATERIAL
 * 피부에 닿는 것부터, 손에 닿는 것까지.
 */
export default function IngredientSection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">10 · INGREDIENT & MATERIAL</p>
          <h2 className="hi-section-title">피부에 닿는 것부터, 손에 닿는 것까지.</h2>
        </div>

        <div className="hi-ingredient-grid">
          <div className="hi-ingredient-col">
            <p className="hi-eyebrow">INGREDIENT</p>
            <h3>피부에 닿는 것</h3>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginTop: '8px'}}>
              무엇인가 → 왜 사용했는가 → 어떤 사용감을 주는가
            </p>
            <div className="hi-tag-list">
              {INGREDIENTS.map((ing) => (
                <span key={ing} className="hi-tag">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="hi-ingredient-col">
            <p className="hi-eyebrow" style={{color: 'var(--hi-pink)'}}>
              MATERIAL
            </p>
            <h3>손에 닿는 소재</h3>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginTop: '8px'}}>
              편안한 소재로 오래 사용할 수 있도록
            </p>
            <div className="hi-tag-list">
              {MATERIALS.map((mat) => (
                <span key={mat} className="hi-tag hi-material">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p
          className="hi-text-center hi-mt-40"
          style={{
            fontSize: '13px',
            color: 'var(--hi-brown-40)',
            maxWidth: 560,
            margin: '32px auto 0',
          }}>
          ※ 성분의 효능 표현은 실제 판매 시 확정 처방과 법적 기준에 맞춰 안내드립니다.
        </p>
      </div>
    </section>
  );
}
