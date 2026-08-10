import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

const STEPS = ['사용', '소진', '리필', '결합', '다시 사용'];

/**
 * 09. REFILL — 지속가능성
 * 버리는 대신, 다시 채우는 습관.
 */
export default function RefillSection(): ReactNode {
  return (
    <section className="hi-section" style={{background: 'rgba(111, 148, 112, 0.08)'}}>
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">09 · REFILL</p>
          <h2 className="hi-section-title">버리는 대신, 다시 채워요.</h2>
        </div>

        <div className="hi-refill-flow">
          {STEPS.map((step, i) => (
            <div key={step} style={{display: 'flex', alignItems: 'center'}}>
              <div className="hi-refill-step">{step}</div>
              {i < STEPS.length - 1 && <span className="hi-refill-arrow">→</span>}
            </div>
          ))}
        </div>

        <p
          className="hi-text-center"
          style={{
            fontSize: '16px',
            color: 'var(--hi-brown-60)',
            maxWidth: 560,
            margin: '32px auto',
            lineHeight: 1.8,
          }}>
          홀더와 케이스는 오래 사용하고,
          <br />
          필요한 바디바만 다시 채웁니다.
          <br />
          <strong style={{color: 'var(--hi-green)'}}>
            친환경을 무겁게 말하기보다, 작지만 계속할 수 있는 습관.
          </strong>
        </p>

        <div className="hi-text-center">
          <Link to="/highskin/refill" className="hi-btn hi-btn-green">
            리필 시작하기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
