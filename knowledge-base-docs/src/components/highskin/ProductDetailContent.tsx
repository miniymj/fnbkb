import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import {
  PRODUCTS,
  getProductBySlug,
  formatPrice,
  MOOD_LABELS,
  CATEGORY_LABELS,
} from '@site/src/data/highskin/products';

/**
 * 제품 상세페이지 콘텐츠
 *
 * 개별 제품 페이지 파일(lavender-body-bar.tsx 등)에서 slug를 넘겨받아 렌더링.
 * Docusaurus 3의 동적 라우트 미지원을 우회하기 위한 컴포넌트.
 */
export default function ProductDetailContent({slug}: {slug: string}): ReactNode {
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <HiLayout title="제품을 찾을 수 없습니다">
        <section className="hi-section">
          <div className="hi-container hi-text-center">
            <h1>제품을 찾을 수 없습니다.</h1>
            <p style={{margin: '16px 0'}}>
              요청하신 제품이 존재하지 않거나 삭제되었을 수 있습니다.
            </p>
            <Link to="/highskin/shop" className="hi-btn hi-btn-primary">
              SHOP으로 돌아가기 →
            </Link>
          </div>
        </section>
      </HiLayout>
    );
  }

  const moodClass = product.mood ? `hi-${product.mood}` : '';
  const moodLabel = product.mood ? MOOD_LABELS[product.mood] : null;
  const catLabel = CATEGORY_LABELS[product.category];

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id && !p.id.startsWith('refill'),
  ).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: catLabel.label,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <HiLayout title={product.name} description={product.shortDesc} jsonLd={jsonLd}>
      {/* 브레드크럼 */}
      <div style={{background: 'var(--hi-cream)', padding: '20px 0 0'}}>
        <div className="hi-container" style={{fontSize: '13px', color: 'var(--hi-brown-60)'}}>
          <Link to="/highskin" style={{color: 'inherit'}}>HOME</Link>
          {' / '}
          <Link to="/highskin/shop" style={{color: 'inherit'}}>SHOP</Link>
          {' / '}
          <Link to={`/highskin/shop/${product.category}`} style={{color: 'inherit'}}>
            {catLabel.label}
          </Link>
          {' / '}
          <span style={{color: 'var(--hi-brown)'}}>{product.name}</span>
        </div>
      </div>

      {/* 제품 상단 */}
      <section className="hi-section" style={{paddingTop: '32px'}}>
        <div className="hi-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              alignItems: 'start',
            }}
            className="hi-product-detail-top">
            {/* 이미지 */}
            <div
              className={`hi-product-img ${moodClass}`}
              style={{
                aspectRatio: '1 / 1',
                borderRadius: 'var(--hi-radius-lg)',
                fontSize: '120px',
                position: 'sticky',
                top: '80px',
              }}>
              {product.emoji}
            </div>

            {/* 정보 */}
            <div>
              {moodLabel && (
                <p className="hi-eyebrow">{moodLabel.label} · {moodLabel.kr}</p>
              )}
              <h1 style={{fontSize: '32px', marginBottom: '8px'}}>{product.name}</h1>
              <p style={{fontSize: '16px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
                {product.shortDesc}
              </p>
              <div style={{fontSize: '28px', fontWeight: 700, marginBottom: '28px'}}>
                <span style={{fontSize: '18px', fontWeight: 500}}>₩</span>
                {formatPrice(product.price)}
              </div>

              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px'}}>
                <button type="button" className="hi-btn hi-btn-primary hi-btn-lg">
                  장바구니 담기
                </button>
                <button type="button" className="hi-btn hi-btn-secondary hi-btn-lg">
                  ♡ 위시리스트
                </button>
              </div>

              <div style={{display: 'grid', gap: '20px'}}>
                {product.description && (
                  <div>
                    <h4 className="hi-detail-label">제품 소개</h4>
                    <p className="hi-detail-text">{product.description}</p>
                  </div>
                )}
                {product.scent && (
                  <div>
                    <h4 className="hi-detail-label">향</h4>
                    <p className="hi-detail-text">{product.scent}</p>
                  </div>
                )}
                {product.skinFeel && (
                  <div>
                    <h4 className="hi-detail-label">사용감</h4>
                    <p className="hi-detail-text">{product.skinFeel}</p>
                  </div>
                )}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div>
                    <h4 className="hi-detail-label">주요 성분</h4>
                    <div className="hi-tag-list">
                      {product.ingredients.map((ing) => (
                        <span key={ing} className="hi-tag">{ing}</span>
                      ))}
                    </div>
                  </div>
                )}
                {product.faces && product.faces.length > 0 && (
                  <div>
                    <h4 className="hi-detail-label">선택 가능한 표정</h4>
                    <p className="hi-detail-text">{product.faces.join(' · ')}</p>
                  </div>
                )}
                {product.target && (
                  <div>
                    <h4 className="hi-detail-label">추천 대상</h4>
                    <p className="hi-detail-text">{product.target}</p>
                  </div>
                )}
                {product.howToUse && (
                  <div>
                    <h4 className="hi-detail-label">사용 방법</h4>
                    <p className="hi-detail-text">{product.howToUse}</p>
                  </div>
                )}
                {product.storage && (
                  <div>
                    <h4 className="hi-detail-label">보관 방법</h4>
                    <p className="hi-detail-text">{product.storage}</p>
                  </div>
                )}
                {product.refillable && (
                  <div className="hi-refillable-badge">
                    <p>🔄 리필 가능 — 홀더/케이스는 그대로, 바디바만 다시 채우세요.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 관련 제품 */}
      {related.length > 0 && (
        <section className="hi-section" style={{background: 'var(--hi-milk-pink)', paddingTop: '48px'}}>
          <div className="hi-container">
            <div className="hi-section-header">
              <h2 className="hi-section-title" style={{fontSize: '28px'}}>
                함께 보면 좋은 제품
              </h2>
            </div>
            <div className="hi-product-grid">
              {related.map((p) => (
                <Link key={p.id} to={`/highskin/shop/${p.slug}`} className="hi-product-card">
                  <div className={`hi-product-img ${p.mood ? `hi-${p.mood}` : ''}`}>{p.emoji}</div>
                  <div className="hi-product-info">
                    <div className="hi-product-name">{p.name}</div>
                    <div className="hi-product-desc">{p.shortDesc}</div>
                    <div className="hi-product-price">
                      <span className="hi-currency">₩</span>
                      {formatPrice(p.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .hi-detail-label {
          font-size: 14px;
          color: var(--hi-pink);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .hi-detail-text {
          font-size: 15px;
          line-height: 1.8;
          color: var(--hi-brown);
        }
        .hi-refillable-badge {
          background: rgba(111, 148, 112, 0.1);
          padding: 16px 20px;
          border-radius: var(--hi-radius-md);
        }
        .hi-refillable-badge p {
          font-size: 14px;
          color: var(--hi-green);
          font-weight: 600;
          margin: 0;
        }
        @media (max-width: 768px) {
          .hi-product-detail-top {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </HiLayout>
  );
}
