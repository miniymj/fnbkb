import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {getProductsByCategory, CATEGORY_LABELS} from '@site/src/data/highskin/products';

const MINI_SITUATIONS = ['TRAVEL', 'SWIM', 'GYM', 'CAMP'];

export default function MiniBarPage(): ReactNode {
  const category = 'mini-bar';
  const products = getProductsByCategory(category).filter((p) => !p.id.startsWith('refill'));
  const label = CATEGORY_LABELS[category];

  return (
    <HiLayout
      title={label.label}
      description="HI-SKIN MINI BAR — 작게 챙기고, 기분대로 골라요. Travel Bath Care 카테고리."
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
            <h2 style={{fontSize: '22px', marginBottom: '12px'}}>작게 챙기고, 기분대로 골라요.</h2>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
              미니바는 단순히 본품의 작은 사이즈가 아니라 Travel Bath Care 카테고리입니다.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
              {MINI_SITUATIONS.map((s) => (
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
