import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {getProductsByCategory, CATEGORY_LABELS} from '@site/src/data/highskin/products';

const TOOL_FLOW = [
  {step: 'HANG', desc: '걸어두기'},
  {step: 'DRY', desc: '건조하기'},
  {step: 'FIT', desc: '맞춤 사용'},
  {step: 'USE', desc: '사용하기'},
];

export default function BathToolsPage(): ReactNode {
  const category = 'bath-tools';
  const products = getProductsByCategory(category).filter((p) => !p.id.startsWith('refill'));
  const label = CATEGORY_LABELS[category];

  return (
    <HiLayout
      title={label.label}
      description="HI-SKIN BATH TOOLS — 비누를 더 편하게 사용하는 방법. 걸고, 말리고, 끼워 쓰는 배스 도구."
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

          {/* 사용 흐름 인트로 */}
          <div
            style={{
              background: 'var(--hi-milk-pink)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '40px',
            }}>
            <h2 style={{fontSize: '22px', marginBottom: '12px'}}>비누를 더 편하게 사용하는 방법.</h2>
            <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
              도구가 비누를 오래, 편하게, 위생적으로 사용하도록 돕습니다.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
              }}>
              {TOOL_FLOW.map((t, i) => (
                <span
                  key={t.step}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: '6px',
                    fontSize: '13px',
                  }}>
                  <span
                    className="hi-tab"
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      background: 'var(--hi-cream)',
                    }}>
                    <strong>{t.step}</strong>
                    <span style={{color: 'var(--hi-brown-60)', marginLeft: '6px'}}>{t.desc}</span>
                  </span>
                  {i < TOOL_FLOW.length - 1 && (
                    <span style={{color: 'var(--hi-brown-60)'}}>→</span>
                  )}
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
