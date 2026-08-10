import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {
  getProductsByCategory,
  CATEGORY_LABELS,
  MOOD_LABELS,
  type Mood,
} from '@site/src/data/highskin/products';

const BODY_BAR_MOODS: Mood[] = ['rest', 'fresh', 'soft', 'clean'];

export default function BodyBarPage(): ReactNode {
  const category = 'body-bar';
  const products = getProductsByCategory(category).filter((p) => !p.id.startsWith('refill'));
  const label = CATEGORY_LABELS[category];

  return (
    <HiLayout
      title={label.label}
      description="HI-SKIN BODY BAR — 오늘의 기분을 골라 씻어요. 성분이 아니라 기분을 먼저 고르는 바디바."
    >
      {/* 페이지 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <p className="hi-eyebrow">SHOP · {label.label}</p>
          <h1>{label.kr}</h1>
          <p>{label.desc}</p>
        </div>
      </section>

      <section className="hi-section">
        <div className="hi-container">
          {/* breadcrumb */}
          <div
            style={{
              fontSize: '13px',
              color: 'var(--hi-brown-60)',
              marginBottom: '32px',
            }}>
            <Link to="/highskin" style={{color: 'inherit'}}>
              HOME
            </Link>
            {' / '}
            <Link to="/highskin/shop" style={{color: 'inherit'}}>
              SHOP
            </Link>
            {' / '}
            <span style={{color: 'var(--hi-brown)'}}>{label.label}</span>
          </div>

          {/* 기분 인트로 */}
          <div
            style={{
              background: 'var(--hi-milk-pink)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '40px',
            }}>
            <h2 style={{fontSize: '22px', marginBottom: '12px'}}>오늘의 기분을 골라 씻어요.</h2>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
              성분이 아니라 기분 → 제품 → 성분 순서로 보여줍니다.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
              {BODY_BAR_MOODS.map((m) => (
                <span
                  key={m}
                  className={`hi-tab hi-${m}`}
                  style={{padding: '6px 14px', borderRadius: '999px', fontSize: '13px'}}>
                  {MOOD_LABELS[m].label} · {MOOD_LABELS[m].kr}
                </span>
              ))}
            </div>
          </div>

          {/* 상품 그리드 */}
          <div className="hi-product-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </HiLayout>
  );
}
