import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

const STEPS = [
  {
    label: 'HANG',
    icon: '🪢',
    title: '걸기',
    desc: '실리콘 루프로 욕실에 걸어두세요.',
  },
  {
    label: 'DRY',
    icon: '💨',
    title: '말리기',
    desc: '배수·통풍 구조로 물기를 빼줍니다.',
  },
  {
    label: 'FIT',
    icon: '🪮',
    title: '끼우기',
    desc: '샴푸브러시·홀더와 결합해 편하게.',
  },
  {
    label: 'CARRY',
    icon: '🧳',
    title: '휴대하기',
    desc: '여행·수영장에도 가볍게 챙겨요.',
  },
  {
    label: 'REFILL',
    icon: '🔄',
    title: '리필하기',
    desc: '다 쓰면 바디바만 교체하세요.',
  },
];

/**
 * 05. EASY BATH SYSTEM — SYSTEM
 * 비누의 불편함도 바꿨습니다.
 */
export default function BathSystemSection(): ReactNode {
  return (
    <section className="hi-section" style={{background: 'var(--hi-sage-soft)'}}>
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">05 · SYSTEM</p>
          <h2 className="hi-section-title">비누의 불편함도 바꿨습니다.</h2>
          <p className="hi-section-subtitle" style={{margin: '16px auto 0'}}>
            걸고 → 말리고 → 끼우고 → 챙기고 → 다시 채우고
          </p>
        </div>

        <div className="hi-system-flow">
          {STEPS.map((step, i) => (
            <div className="hi-system-step" key={step.label}>
              <div className="hi-system-step-icon">{step.icon}</div>
              <div className="hi-system-step-label">{step.label}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: '-12px',
                    top: '40%',
                    color: 'var(--hi-brown-20)',
                    fontSize: '20px',
                  }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hi-text-center hi-mt-40">
          <p
            style={{
              fontSize: '15px',
              color: 'var(--hi-brown-60)',
              maxWidth: 560,
              margin: '0 auto 20px',
            }}>
            이 영역이 하이피부를 일반 수제비누 브랜드와 구분하는 핵심입니다.
          </p>
          <Link to="/highskin/bath-system" className="hi-btn hi-btn-secondary">
            Bath System 자세히 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
