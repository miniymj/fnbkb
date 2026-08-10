import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {getProductsByCategory, CATEGORY_LABELS} from '@site/src/data/highskin/products';

const TRAVEL_SITUATIONS = ['TRAVEL', 'SWIM', 'CAMP', 'GYM'];

export default function TravelSwimPage(): ReactNode {
  const category = 'travel-swim';
  const products = getProductsByCategory(category).filter((p) => !p.id.startsWith('refill'));
  const label = CATEGORY_LABELS[category];

  return (
    <HiLayout
      title={label.label}
      description="HI-SKIN TRAVEL & SWIM — 욕실에서 여행까지, 좋은 목욕 습관 그대로. 휴대용 배스케어."
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

          {/* 상황 인트로 */}
          <div
            style={{
              background: 'var(--hi-milk-pink)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '40px',
            }}>
            <h2 style={{fontSize: '22px', marginBottom: '12px'}}>
              욕실에서 여행까지, 좋은 목욕 습관 그대로.
            </h2>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
              집에서의 목욕 습관을 어디서든 그대로. 상황에 맞춰 챙기세요.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {TRAVEL_SITUATIONS.map((s) => (
                <span
                  key={s}
                  className="hi-tab"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    background: 'var(--hi-cream)',
                  }}>
                  {s}
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
