import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

const STEPS = [
  {num: '01', label: 'CHOOSE', desc: '표정 선택'},
  {num: '02', label: 'CUSTOM', desc: '눈·입 조합'},
  {num: '03', label: 'PREVIEW', desc: '비누 미리보기'},
  {num: '04', label: 'MAKE', desc: '음각 제작'},
];

/**
 * 04. CUSTOM FACE — 브랜드 경험
 * 내 비누에 어떤 표정을 새길까요?
 */
export default function CustomFaceSection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">04 · CUSTOM FACE</p>
          <h2 className="hi-section-title">내 비누에는 어떤 표정을 새길까요?</h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            maxWidth: 800,
            margin: '0 auto',
          }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{position: 'relative'}}>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 'var(--hi-radius-md)',
                  padding: '28px 16px',
                  textAlign: 'center',
                  boxShadow: 'var(--hi-shadow-sm)',
                  position: 'relative',
                }}>
                <div
                  style={{
                    fontFamily: 'var(--hi-font-serif)',
                    fontSize: '32px',
                    color: 'var(--hi-pink)',
                    marginBottom: '8px',
                    fontStyle: 'italic',
                  }}>
                  {step.num}
                </div>
                <div style={{fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em'}}>
                  {step.label}
                </div>
                <div style={{fontSize: '13px', color: 'var(--hi-brown-60)', marginTop: '4px'}}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hi-text-center hi-mt-40">
          <p style={{fontSize: '15px', color: 'var(--hi-brown-60)', marginBottom: '20px'}}>
            Smile · Wink · Sleepy · Love · Happy · Calm
            <br />
            <span style={{fontSize: '13px'}}>향후 이름 · 기념일 · 가족 얼굴 · 짧은 메시지 확장 예정</span>
          </p>
          <Link to="/highskin/custom-face" className="hi-btn hi-btn-primary">
            나만의 표정 만들기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
