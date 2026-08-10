import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {PRODUCTS, CATEGORY_LABELS, MOOD_LABELS, type ProductCategory, type Mood} from '@site/src/data/highskin/products';

/**
 * SHOP 메인 — 카테고리 + 4가지 검색 경로 (상품/상황/기분/경험)
 */
type SearchMode = 'product' | 'situation' | 'mood' | 'experience';

const SEARCH_TABS: {id: SearchMode; label: string; emoji: string}[] = [
  {id: 'product', label: '상품으로 찾기', emoji: '🧴'},
  {id: 'situation', label: '상황으로 찾기', emoji: '🏠'},
  {id: 'mood', label: '기분으로 찾기', emoji: '☺'},
  {id: 'experience', label: '경험으로 찾기', emoji: '✦'},
];

const SITUATIONS = [
  {id: 'home', label: '우리집 목욕', emoji: '🏠'},
  {id: 'family', label: '가족과 함께', emoji: '👨‍👩‍👧'},
  {id: 'travel', label: '여행', emoji: '✈️'},
  {id: 'swim', label: '수영장', emoji: '🏊'},
  {id: 'gym', label: '운동 후', emoji: '🏃'},
  {id: 'gift', label: '선물', emoji: '🎁'},
];

const EXPERIENCES = [
  {id: 'face-picker', label: '표정 고르기', emoji: '☺', to: '/highskin/custom-face'},
  {id: 'custom', label: '나만의 표정 만들기', emoji: '✦', to: '/highskin/custom-face'},
  {id: 'bath-system', label: 'Bath System', emoji: '🪢', to: '/highskin/bath-system'},
  {id: 'refill', label: 'Refill', emoji: '🔄', to: '/highskin/refill'},
];

export default function ShopIndex(): ReactNode {
  const [mode, setMode] = useState<SearchMode>('product');
  const [situation, setSituation] = useState<string>('home');
  const [mood, setMood] = useState<Mood>('rest');

  const categories = Object.keys(CATEGORY_LABELS) as ProductCategory[];

  let displayedProducts = PRODUCTS;
  if (mode === 'situation') {
    displayedProducts = PRODUCTS.filter((p) => p.situations?.includes(situation));
  } else if (mode === 'mood') {
    displayedProducts = PRODUCTS.filter((p) => p.mood === mood);
  }

  return (
    <HiLayout
      title="SHOP"
      description="HI-SKIN 하이피부 SHOP — 상품·상황·기분·경험으로 찾는 바디바. Body Bar, Mini Bar, Bath Tools, Travel & Swim, Set & Gift."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'HI-SKIN 하이피부 SHOP',
        description: '표정을 고르는 바디바와 리필·휴대 시스템. Family Bath Care.',
      }}>
      {/* 페이지 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <p className="hi-eyebrow">HI-SKIN SHOP</p>
          <h1>무엇을 찾아드릴까요?</h1>
          <p>
            상품명으로, 상황으로, 기분으로, 경험으로.
            <br />
            당신에게 맞는 방법으로 쇼핑하세요.
          </p>
        </div>
      </section>

      {/* 4가지 검색 경로 탭 */}
      <section className="hi-section" style={{paddingBottom: '40px'}}>
        <div className="hi-container">
          <div className="hi-shopby-tabs">
            {SEARCH_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`hi-tab ${mode === tab.id ? 'hi-active' : ''}`}
                onClick={() => setMode(tab.id)}>
                <span style={{marginRight: '6px'}}>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* 상품으로 찾기 */}
          {mode === 'product' && (
            <div>
              {categories.map((cat) => {
                const catProducts = PRODUCTS.filter(
                  (p) => p.category === cat && !p.id.startsWith('refill'),
                );
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat} style={{marginBottom: '56px'}}>
                    <div style={{display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px'}}>
                      <h2 style={{fontSize: '24px'}}>{CATEGORY_LABELS[cat].label}</h2>
                      <span style={{fontSize: '14px', color: 'var(--hi-brown-60)'}}>
                        {CATEGORY_LABELS[cat].desc}
                      </span>
                    </div>
                    <div className="hi-product-grid">
                      {catProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 상황으로 찾기 */}
          {mode === 'situation' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '40px',
                }}>
                {SITUATIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`hi-tab ${situation === s.id ? 'hi-active' : ''}`}
                    onClick={() => setSituation(s.id)}>
                    <span style={{marginRight: '6px'}}>{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="hi-product-grid">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((p) => <ProductCard key={p.id} product={p} />)
                ) : (
                  <p style={{color: 'var(--hi-brown-60)'}}>해당 상황의 제품이 없습니다.</p>
                )}
              </div>
            </div>
          )}

          {/* 기분으로 찾기 */}
          {mode === 'mood' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  justifyContent: 'center',
                  marginBottom: '40px',
                }}>
                {(Object.keys(MOOD_LABELS) as Mood[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`hi-tab ${mood === m ? 'hi-active' : ''}`}
                    onClick={() => setMood(m)}>
                    {MOOD_LABELS[m].label} · {MOOD_LABELS[m].kr}
                  </button>
                ))}
              </div>
              <div className="hi-product-grid">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((p) => <ProductCard key={p.id} product={p} />)
                ) : (
                  <p style={{color: 'var(--hi-brown-60)'}}>해당 기분의 제품이 없습니다.</p>
                )}
              </div>
            </div>
          )}

          {/* 경험으로 찾기 */}
          {mode === 'experience' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                maxWidth: 800,
                margin: '0 auto',
              }}>
              {EXPERIENCES.map((exp) => (
                <Link
                  key={exp.id}
                  to={exp.to}
                  className="hi-mood-card"
                  style={{background: 'var(--hi-milk-pink)'}}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>{exp.emoji}</div>
                  <h4 style={{fontSize: '18px'}}>{exp.label}</h4>
                  <p style={{fontSize: '13px', color: 'var(--hi-brown-60)'}}>브랜드 경험으로 이동 →</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </HiLayout>
  );
}
