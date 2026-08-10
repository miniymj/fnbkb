import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import ProductCard from '@site/src/components/highskin/ProductCard';
import {PRODUCTS} from '@site/src/data/highskin/products';

/**
 * HI-SKIN REFILL 페이지
 *
 * "버리는 대신, 다시 채워요."
 * 홀더는 오래, 바디바는 필요한 만큼. 작지만 계속할 수 있는 리필 습관.
 */
export default function RefillPage(): ReactNode {
  const refillProducts = PRODUCTS.filter((p) => p.id.startsWith('refill'));

  const steps = ['사용', '소진', '리필', '결합', '다시 사용'];

  const plans = [
    {
      name: '1개월',
      target: '개인 사용',
      desc: '혼자 매일 사용하는 분에게 맞는 주기.',
      mood: 'fresh',
    },
    {
      name: '2개월',
      target: '가족 2-3인',
      desc: '가족이 함께 사용하는 분들에게 맞는 주기.',
      mood: 'soft',
    },
    {
      name: '가족주기',
      target: '맞춤',
      desc: '예민 가족 3-4인 각자의 표정과 향을 맞춤 배송.',
      mood: 'rest',
    },
  ];

  return (
    <HiLayout
      title="REFILL"
      description="버리는 대신, 다시 채워요. 홀더는 오래, 바디바는 필요한 만큼 — 하이피부의 리필 습관.">
      {/* 페이지 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <p className="hi-eyebrow">REFILL</p>
          <h1>다시 채우는 습관</h1>
          <p>버리는 대신, 다시 채워요.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hi-section">
        <div className="hi-container">
          <div className="hi-section-header hi-text-center" style={{marginBottom: '40px'}}>
            <p className="hi-eyebrow">HOW IT WORKS</p>
            <h2 className="hi-section-title">5단계 리필 플로우</h2>
          </div>

          <div className="hi-refill-flow">
            {steps.map((step, i) => (
              <div key={step} style={{display: 'contents'}}>
                <div className="hi-refill-step">{step}</div>
                {i < steps.length - 1 && (
                  <span className="hi-refill-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="hi-text-center" style={{color: 'var(--hi-brown-60)', fontSize: '15px'}}>
            홀더와 케이스는 그대로 두고, 바디바만 다시 채우면 다시 사용할 수 있어요.
          </p>
        </div>
      </section>

      {/* WHY REFILL */}
      <section
        className="hi-section"
        style={{background: 'rgba(111, 148, 112, 0.08)'}}>
        <div className="hi-container">
          <div className="hi-text-center" style={{maxWidth: '560px', margin: '0 auto'}}>
            <p className="hi-eyebrow">WHY REFILL</p>
            <h2 className="hi-section-title" style={{marginBottom: '20px'}}>
              홀더는 오래, 바디바는 필요한 만큼.
            </h2>
            <p style={{fontSize: '16px', lineHeight: 1.8, color: 'var(--hi-brown-60)'}}>
              친환경을 무겁게 말하기보다, 작지만 계속할 수 있는 습관으로 표현합니다.
              <br />
              다 쓴 바디바를 통째로 버리지 않고, 홀더와 케이스는 오래 사용하며
              바디바만 다시 채우는 작은 실천.
            </p>
          </div>
        </div>
      </section>

      {/* REFILL PRODUCTS */}
      <section className="hi-section">
        <div className="hi-container">
          <div className="hi-section-header hi-text-center" style={{marginBottom: '40px'}}>
            <p className="hi-eyebrow">REFILL PRODUCTS</p>
            <h2 className="hi-section-title">리필 제품</h2>
            <p className="hi-section-subtitle">기분별 향으로 다시 채워요.</p>
          </div>

          <div className="hi-product-grid">
            {refillProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION (향후) */}
      <section
        className="hi-section"
        style={{background: 'var(--hi-cream)'}}>
        <div className="hi-container">
          <div className="hi-section-header hi-text-center" style={{marginBottom: '40px'}}>
            <p className="hi-eyebrow">SUBSCRIPTION</p>
            <h2 className="hi-section-title">구독 (향후 오픈)</h2>
            <p className="hi-section-subtitle">사용 주기에 맞춰 정기 배송으로 리필해요.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}>
            {plans.map((plan) => (
              <div key={plan.name} className={`hi-mood-card hi-${plan.mood}`}>
                <div className="hi-mood-label">{plan.target.toUpperCase()}</div>
                <h4>
                  {plan.name} · {plan.target}
                </h4>
                <p>{plan.desc}</p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    background: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--hi-brown-60)',
                    letterSpacing: '0.1em',
                  }}>
                  준비 중
                </span>
              </div>
            ))}
          </div>

          <p
            className="hi-text-center"
            style={{marginTop: '40px', color: 'var(--hi-brown-60)', fontSize: '14px'}}>
            구독은 순차적으로 오픈됩니다.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="hi-section">
        <div className="hi-container hi-text-center">
          <h2 className="hi-section-title" style={{marginBottom: '20px'}}>
            리필이 처음이세요?
          </h2>
          <p style={{color: 'var(--hi-brown-60)', marginBottom: '32px'}}>
            Bath System에서 홀더와 케이스를 먼저 만나보세요.
          </p>
          <Link to="/highskin/bath-system" className="hi-btn hi-btn-green">
            BATH SYSTEM 보기 →
          </Link>
        </div>
      </section>
    </HiLayout>
  );
}
