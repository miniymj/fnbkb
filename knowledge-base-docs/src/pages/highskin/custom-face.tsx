import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import {
  EYES_OPTIONS,
  NOSE_OPTIONS,
  MOUTH_OPTIONS,
  FACES,
  type FaceParts,
} from '@site/src/data/highskin/faces';
import {MOOD_LABELS, type Mood} from '@site/src/data/highskin/products';

/**
 * CUSTOM FACE — 나만의 표정 만들기
 *
 * 4-Step:
 *   01 CHOOSE (기본 표정 선택)
 *   02 CUSTOM (눈·코·입 조합)
 *   03 PREVIEW (비누에서 미리보기)
 *   04 MAKE (커스텀 바디바 주문)
 *
 * 눈(4) × 코(3) × 입(4) = 48조합
 */
type CustomStep = 0 | 1 | 2 | 3;

export default function CustomFacePage(): ReactNode {
  const [step, setStep] = useState<CustomStep>(0);
  const [baseFace, setBaseFace] = useState<string>('smile');
  const [parts, setParts] = useState<FaceParts>({
    eyes: EYES_OPTIONS[0].id,
    nose: NOSE_OPTIONS[0].id,
    mouth: MOUTH_OPTIONS[0].id,
  });
  const [mood, setMood] = useState<Mood>('soft');

  const stepLabels = ['CHOOSE', 'CUSTOM', 'PREVIEW', 'MAKE'];
  const stepNums = ['01', '02', '03', '04'];

  function handlePartChange(part: keyof FaceParts, value: string) {
    setParts({...parts, [part]: value});
  }

  const selectedEyes = EYES_OPTIONS.find((e) => e.id === parts.eyes);
  const selectedNose = NOSE_OPTIONS.find((n) => n.id === parts.nose);
  const selectedMouth = MOUTH_OPTIONS.find((m) => m.id === parts.mouth);
  const selectedFace = FACES.find((f) => f.id === baseFace);

  return (
    <HiLayout
      title="나만의 표정 만들기"
      description="원하는 표정을 직접 골라 비누에 음각으로 새기는 커스텀 바디바. 눈·코·입을 조합해 세상에 하나뿐인 나만의 표정을 만들어보세요."
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Custom Face Bar',
        description: '내가 고른 표정을 비누에 새겨요. 48가지 조합의 커스텀 바디바.',
        offers: {'@type': 'Offer', price: '16800', priceCurrency: 'KRW'},
      }}>
      <section className="hi-page-header">
        <div className="hi-container">
          <p className="hi-eyebrow">CUSTOM FACE</p>
          <h1>나만의 표정 만들기</h1>
          <p>내 비누에는 어떤 표정을 새길까요?</p>
        </div>
      </section>

      <section className="hi-section">
        <div className="hi-container">
          {/* 스텝 인디케이터 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '48px',
              flexWrap: 'wrap',
            }}>
            {stepLabels.map((label, i) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: i <= step ? 'var(--hi-pink)' : 'transparent',
                  color: i <= step ? 'var(--hi-cream)' : 'var(--hi-brown-60)',
                  border: i <= step ? 'none' : '1.5px solid var(--hi-brown-20)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s',
                }}>
                <span style={{fontFamily: 'var(--hi-font-serif)', fontStyle: 'italic'}}>
                  {stepNums[i]}
                </span>
                {label}
              </div>
            ))}
          </div>

          <div style={{maxWidth: 720, margin: '0 auto'}}>
            {/* STEP 0: CHOOSE */}
            {step === 0 && (
              <div>
                <div className="hi-section-header">
                  <p className="hi-section-num">01 · CHOOSE</p>
                  <h2 className="hi-section-title">기본 표정 선택</h2>
                  <p className="hi-section-subtitle" style={{margin: '12px auto 0'}}>
                    베이스가 될 표정을 골라주세요.
                  </p>
                </div>

                <div className="hi-face-grid">
                  {FACES.map((face) => (
                    <button
                      key={face.id}
                      type="button"
                      className={`hi-face-card ${baseFace === face.id ? 'hi-selected' : ''}`}
                      onClick={() => setBaseFace(face.id)}>
                      <span className="hi-face-emoji">{face.emoji}</span>
                      <div className="hi-face-name">{face.kr}</div>
                      <div className="hi-face-desc">{face.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="hi-text-center hi-mt-40">
                  <button
                    type="button"
                    className="hi-btn hi-btn-primary hi-btn-lg"
                    onClick={() => setStep(1)}>
                    다음: 커스텀하기 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 1: CUSTOM */}
            {step === 1 && (
              <div>
                <div className="hi-section-header">
                  <p className="hi-section-num">02 · CUSTOM</p>
                  <h2 className="hi-section-title">눈·코·입 조합</h2>
                  <p className="hi-section-subtitle" style={{margin: '12px auto 0'}}>
                    4 × 3 × 4 = 48가지 조합
                  </p>
                </div>

                {/* 눈 */}
                <div style={{marginBottom: '32px'}}>
                  <h4 style={{fontSize: '14px', color: 'var(--hi-pink)', letterSpacing: '0.1em', marginBottom: '12px'}}>
                    EYES · 눈
                  </h4>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px'}}>
                    {EYES_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`hi-face-card ${parts.eyes === opt.id ? 'hi-selected' : ''}`}
                        onClick={() => handlePartChange('eyes', opt.id)}
                        style={{padding: '20px 8px'}}>
                        <div style={{fontSize: '20px', marginBottom: '6px', fontFamily: 'monospace'}}>
                          {opt.char}
                        </div>
                        <div className="hi-face-desc">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 코 */}
                <div style={{marginBottom: '32px'}}>
                  <h4 style={{fontSize: '14px', color: 'var(--hi-pink)', letterSpacing: '0.1em', marginBottom: '12px'}}>
                    NOSE · 코
                  </h4>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
                    {NOSE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`hi-face-card ${parts.nose === opt.id ? 'hi-selected' : ''}`}
                        onClick={() => handlePartChange('nose', opt.id)}
                        style={{padding: '20px 8px'}}>
                        <div style={{fontSize: '20px', marginBottom: '6px', fontFamily: 'monospace'}}>
                          {opt.char || '—'}
                        </div>
                        <div className="hi-face-desc">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 입 */}
                <div style={{marginBottom: '32px'}}>
                  <h4 style={{fontSize: '14px', color: 'var(--hi-pink)', letterSpacing: '0.1em', marginBottom: '12px'}}>
                    MOUTH · 입
                  </h4>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px'}}>
                    {MOUTH_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`hi-face-card ${parts.mouth === opt.id ? 'hi-selected' : ''}`}
                        onClick={() => handlePartChange('mouth', opt.id)}
                        style={{padding: '20px 8px'}}>
                        <div style={{fontSize: '20px', marginBottom: '6px'}}>{opt.char}</div>
                        <div className="hi-face-desc">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{display: 'flex', gap: '12px', justifyContent: 'center'}}>
                  <button type="button" className="hi-btn hi-btn-secondary" onClick={() => setStep(0)}>
                    ← 이전
                  </button>
                  <button
                    type="button"
                    className="hi-btn hi-btn-primary"
                    onClick={() => setStep(2)}>
                    미리보기 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PREVIEW */}
            {step === 2 && (
              <div>
                <div className="hi-section-header">
                  <p className="hi-section-num">03 · PREVIEW</p>
                  <h2 className="hi-section-title">비누에서 미리보기</h2>
                </div>

                {/* 비누 미리보기 */}
                <div className="hi-text-center" style={{marginBottom: '32px'}}>
                  <div
                    style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #FFF8EF 0%, #FCE8EC 100%)',
                      borderRadius: '24px',
                      padding: '48px 56px',
                      boxShadow: 'var(--hi-shadow-lg)',
                      position: 'relative',
                    }}>
                    <div style={{marginBottom: '8px', fontSize: '24px', fontFamily: 'monospace', letterSpacing: '0.3em'}}>
                      {selectedEyes?.char}
                    </div>
                    <div style={{fontSize: '20px', fontFamily: 'monospace', marginBottom: '8px'}}>
                      {selectedNose?.char || ' '}
                    </div>
                    <div style={{fontSize: '28px'}}>{selectedMouth?.char}</div>
                  </div>
                  <p style={{marginTop: '16px', color: 'var(--hi-brown-60)', fontSize: '14px'}}>
                    베이스: {selectedFace?.kr} · {selectedFace?.desc}
                  </p>
                </div>

                {/* 향 선택 */}
                <div style={{marginBottom: '32px'}}>
                  <h4 style={{fontSize: '14px', color: 'var(--hi-pink)', letterSpacing: '0.1em', marginBottom: '12px', textAlign: 'center'}}>
                    향 선택
                  </h4>
                  <div style={{display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {(Object.keys(MOOD_LABELS) as Mood[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`hi-tab ${mood === m ? 'hi-active' : ''}`}
                        onClick={() => setMood(m)}>
                        {MOOD_LABELS[m].label} · {MOOD_LABELS[m].kr}
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`hi-tab ${mood === undefined ? 'hi-active' : ''}`}
                      onClick={() => setMood('soft')}>
                      Unscented · 무향
                    </button>
                  </div>
                </div>

                <div style={{display: 'flex', gap: '12px', justifyContent: 'center'}}>
                  <button type="button" className="hi-btn hi-btn-secondary" onClick={() => setStep(1)}>
                    ← 이전
                  </button>
                  <button type="button" className="hi-btn hi-btn-primary" onClick={() => setStep(3)}>
                    주문하기 →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MAKE */}
            {step === 3 && (
              <div className="hi-text-center">
                <p className="hi-section-num">04 · MAKE</p>
                <h2 className="hi-section-title">나만의 커스텀 바디바</h2>

                <div
                  style={{
                    background: '#fff',
                    borderRadius: 'var(--hi-radius-lg)',
                    padding: '40px',
                    boxShadow: 'var(--hi-shadow-md)',
                    maxWidth: 480,
                    margin: '32px auto',
                  }}>
                  <div style={{marginBottom: '24px'}}>
                    <div style={{fontSize: '48px', marginBottom: '16px'}}>
                      {selectedEyes?.char} {selectedMouth?.char}
                    </div>
                    <h3 style={{fontSize: '20px', marginBottom: '8px'}}>Custom Face Bar</h3>
                    <p style={{fontSize: '14px', color: 'var(--hi-brown-60)'}}>
                      {selectedFace?.kr} · {MOOD_LABELS[mood]?.label ?? 'Unscented'} · 음각 제작
                    </p>
                  </div>

                  <div style={{borderTop: '1px solid var(--hi-brown-10)', paddingTop: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                      <span style={{color: 'var(--hi-brown-60)'}}>가격</span>
                      <span style={{fontWeight: 700, fontSize: '20px'}}>₩16,800</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                      <span style={{color: 'var(--hi-brown-60)'}}>제작 기간</span>
                      <span>평일 기준 3-5일</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <span style={{color: 'var(--hi-brown-60)'}}>향후 확장</span>
                      <span style={{fontSize: '13px'}}>이름 · 기념일 · 메시지</span>
                    </div>
                  </div>
                </div>

                <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '24px'}}>
                  ※ 커스텀 바디바는 주문 제작으로 평일 기준 3-5일이 소요됩니다.
                </p>

                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <button type="button" className="hi-btn hi-btn-primary hi-btn-lg">
                    장바구니 담기 · ₩16,800
                  </button>
                  <button type="button" className="hi-btn hi-btn-secondary hi-btn-lg" onClick={() => setStep(0)}>
                    ↺ 처음부터 다시
                  </button>
                </div>

                <div style={{marginTop: '32px'}}>
                  <Link to="/highskin/shop" style={{color: 'var(--hi-brown-60)', fontSize: '14px'}}>
                    SHOP 더 둘러보기 →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </HiLayout>
  );
}
