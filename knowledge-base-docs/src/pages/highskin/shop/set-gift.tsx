import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {getProductsByCategory, CATEGORY_LABELS} from '@site/src/data/highskin/products';

const GIFT_RECIPIENTS = ['FAMILY', 'TRAVEL', 'KIDS', 'CUSTOM', 'SEASON'];

export default function SetGiftPage(): ReactNode {
  const category = 'set-gift';
  const products = getProductsByCategory(category).filter((p) => !p.id.startsWith('refill'));
  const label = CATEGORY_LABELS[category];

  return (
    <HiLayout
      title={label.label}
      description="HI-SKIN SET & GIFT — 좋은 목욕 시간을 선물하세요. 받는 사람을 위한 바디바 세트."
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

          {/* 받는 사람 인트로 */}
          <div
            style={{
              background: 'var(--hi-milk-pink)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '40px',
            }}>
            <h2 style={{fontSize: '22px', marginBottom: '12px'}}>좋은 목욕 시간을 선물하세요.</h2>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
              누구에게, 어떤 자리에 선물할지 고민하세요.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {GIFT_RECIPIENTS.map((r) => (
                <span
                  key={r}
                  className="hi-tab"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    background: 'var(--hi-cream)',
                  }}>
                  {r}
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
