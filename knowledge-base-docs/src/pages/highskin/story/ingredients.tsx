import type {ReactNode} from 'react';
import HiLayout from '@site/src/components/highskin/HiLayout';

/**
 * HI-SKIN INGREDIENT & MATERIAL 페이지
 *
 * 피부에 닿는 성분(INGREDIENT)과 손에 닿는 소재(MATERIAL)를 두 칼럼으로 안내.
 */
export default function IngredientsPage(): ReactNode {
  return (
    <HiLayout
      title="INGREDIENT & MATERIAL"
      description="피부에 닿는 것부터, 손에 닿는 것까지. 하이피부가 사용하는 성분과 소재.">
      {/* 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <h1>INGREDIENT & MATERIAL</h1>
          <p>피부에 닿는 것부터, 손에 닿는 것까지.</p>
        </div>
      </section>

      {/* 성분 & 소재 */}
      <section className="hi-section">
        <div className="hi-container">
          <div className="hi-ingredient-grid">
            {/* INGREDIENT 칼럼 */}
            <div className="hi-ingredient-col">
              <div className="hi-eyebrow">INGREDIENT</div>
              <h3>피부에 닿는 것</h3>
              <p className="hi-section-subtitle" style={{maxWidth: 'none'}}>
                식물 유래 성분과 보태니컬을 중심으로, 순하고 기분 좋은 향을
                만듭니다.
              </p>
              <div className="hi-tag-list">
                <span className="hi-tag">Lavender</span>
                <span className="hi-tag">Oat</span>
                <span className="hi-tag">Citrus</span>
                <span className="hi-tag">Plant Oil</span>
                <span className="hi-tag">Botanical Ingredients</span>
              </div>
            </div>

            {/* MATERIAL 칼럼 */}
            <div className="hi-ingredient-col">
              <div className="hi-eyebrow">MATERIAL</div>
              <h3>손에 닿는 것</h3>
              <p className="hi-section-subtitle" style={{maxWidth: 'none'}}>
                오래 쓰고 다시 채우는 방식에 맞춰, 닿는 질감까지 설계합니다.
              </p>
              <div className="hi-tag-list">
                <span className="hi-tag hi-material">Bamboo</span>
                <span className="hi-tag hi-material">Silicone</span>
                <span className="hi-tag hi-material">Cotton</span>
                <span className="hi-tag hi-material">Kraft Paper</span>
                <span className="hi-tag hi-material">Recycled Material</span>
                <span className="hi-tag hi-material">Ceramic</span>
              </div>
            </div>
          </div>

          <p className="hi-problem-closing" style={{fontSize: '15px', marginTop: '56px'}}>
            성분의 효능 표현은 실제 판매 시 확정 처방과 법적 기준에 맞춰
            안내드립니다.
          </p>
        </div>
      </section>
    </HiLayout>
  );
}
