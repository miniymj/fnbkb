import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';
import {QUIZ_STEPS, computeResult, type QuizAnswers, type QuizResult} from '@site/src/data/highskin/quiz';
import {formatPrice} from '@site/src/data/highskin/products';

/**
 * FIND MY FRIEND — 4-Step 퀴즈 인터랙션
 *
 * Q1 누구와? → Q2 기분? → Q3 어디서? → Q4 표정?
 * 결과: 추천 메인 제품 + 보조 제품 + CTA
 */
export default function FindMyFriendPage(): ReactNode {
  const [step, setStep] = useState(0); // 0-3 (4 steps), 4 = result
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentStep = QUIZ_STEPS[step];
  const isResult = step >= QUIZ_STEPS.length;

  function handleSelect(stepData: (typeof QUIZ_STEPS)[number], value: string) {
    const newAnswers = {...answers, [stepData.affects]: value};
    setAnswers(newAnswers);

    // 다음 스텝 또는 결과 계산
    setTimeout(() => {
      if (step < QUIZ_STEPS.length - 1) {
        setStep(step + 1);
      } else {
        // mood와 face는 타입 변환 필요
        const finalAnswers: QuizAnswers = {
          ...newAnswers,
          mood: newAnswers.mood as QuizAnswers['mood'],
        };
        setResult(computeResult(finalAnswers));
        setStep(step + 1);
      }
    }, 200);
  }

  function handleRestart() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  const progress = Math.min(((step + 1) / (QUIZ_STEPS.length + 1)) * 100, 100);

  return (
    <HiLayout
      title="나의 하이친구 찾기"
      description="4가지 질문으로 나에게 맞는 HI-SKIN 바디바를 찾아보세요. 누구와, 어떤 기분으로, 어디서, 어떤 표정으로 씻을까요?"
      jsonLd={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'HI-SKIN 나의 하이친구 찾기',
        applicationCategory: 'ShoppingApplication',
        operatingSystem: 'Web',
        offers: {'@type': 'Offer', price: '0', priceCurrency: 'KRW'},
      }}>
      <section className="hi-page-header">
        <div className="hi-container">
          <p className="hi-eyebrow">FIND MY FRIEND</p>
          <h1>나의 하이친구 찾기</h1>
          <p>4가지 질문으로 오늘의 하이친구를 찾아드려요.</p>
        </div>
      </section>

      <section className="hi-section">
        <div className="hi-container">
          {/* 진행 바 */}
          {!isResult && (
            <div style={{maxWidth: 600, margin: '0 auto 40px'}}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px',
                  color: 'var(--hi-brown-60)',
                }}>
                <span>
                  Q{step + 1} / {QUIZ_STEPS.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div
                style={{
                  height: '6px',
                  background: 'var(--hi-milk-pink)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--hi-pink)',
                    borderRadius: '999px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* 퀴즈 스텝 */}
          {!isResult && currentStep && (
            <div style={{maxWidth: 640, margin: '0 auto'}}>
              <div className="hi-section-header">
                <p className="hi-section-num">Q{currentStep.id}</p>
                <h2 className="hi-section-title">{currentStep.question}</h2>
                {currentStep.subtitle && (
                  <p className="hi-section-subtitle" style={{margin: '12px auto 0'}}>
                    {currentStep.subtitle}
                  </p>
                )}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: currentStep.options.length > 4 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                  gap: '16px',
                }}
                className="hi-quiz-options">
                {currentStep.options.map((opt) => {
                  const isSelected =
                    answers[currentStep.affects as keyof QuizAnswers] === opt.value;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`hi-face-card ${isSelected ? 'hi-selected' : ''}`}
                      onClick={() => handleSelect(currentStep, opt.value)}
                      style={{padding: '32px 16px'}}>
                      {opt.emoji && (
                        <span className="hi-face-emoji" style={{fontSize: '36px'}}>
                          {opt.emoji}
                        </span>
                      )}
                      <div className="hi-face-name" style={{fontSize: '16px'}}>
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 이전 버튼 */}
              {step > 0 && (
                <div className="hi-text-center hi-mt-40">
                  <button
                    type="button"
                    className="hi-btn hi-btn-secondary"
                    onClick={() => setStep(step - 1)}>
                    ← 이전 질문
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 결과 화면 */}
          {isResult && result && (
            <div style={{maxWidth: 720, margin: '0 auto'}} className="hi-quiz-result">
              <div className="hi-section-header">
                <p className="hi-section-num">RESULT</p>
                <h2 className="hi-section-title" style={{fontSize: '32px'}}>
                  {result.headline}
                </h2>
                <p style={{fontSize: '15px', color: 'var(--hi-brown-60)', marginTop: '12px'}}>
                  당신에게 어울리는 하이친구를 찾았어요.
                </p>
              </div>

              {/* 추천 메인 제품 */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: 'var(--hi-radius-lg)',
                  padding: '32px',
                  boxShadow: 'var(--hi-shadow-md)',
                  marginBottom: '20px',
                }}>
                <div style={{display: 'flex', gap: '24px', alignItems: 'center'}} className="hi-result-main">
                  <div
                    className={`hi-product-img hi-${result.mood}`}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: 'var(--hi-radius-md)',
                      fontSize: '56px',
                      flexShrink: 0,
                    }}>
                    {result.mainProduct.emoji}
                  </div>
                  <div style={{flex: 1}}>
                    <p className="hi-eyebrow" style={{marginBottom: '4px'}}>
                      추천 제품
                    </p>
                    <h3 style={{fontSize: '22px', marginBottom: '6px'}}>{result.mainProduct.name}</h3>
                    <p style={{fontSize: '14px', color: 'var(--hi-brown-60)', marginBottom: '12px'}}>
                      {result.mainProduct.shortDesc}
                    </p>
                    <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                      <span style={{fontSize: '20px', fontWeight: 700}}>
                        ₩{formatPrice(result.mainProduct.price)}
                      </span>
                      <span style={{fontSize: '24px'}}>{result.face.emoji}</span>
                      <span style={{fontSize: '14px', color: 'var(--hi-brown-60)'}}>
                        {result.face.kr} 표정
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 보조 추천 */}
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px'}}
                className="hi-result-accessories">
                {result.accessory && (
                  <div
                    style={{
                      background: 'var(--hi-milk-pink)',
                      borderRadius: 'var(--hi-radius-md)',
                      padding: '20px',
                    }}>
                    <p style={{fontSize: '12px', color: 'var(--hi-pink)', letterSpacing: '0.1em', marginBottom: '4px'}}>
                      추천 액세서리
                    </p>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <span style={{fontSize: '28px'}}>{result.accessory.emoji}</span>
                      <div>
                        <div style={{fontWeight: 600}}>{result.accessory.name}</div>
                        <div style={{fontSize: '13px', color: 'var(--hi-brown-60)'}}>
                          ₩{formatPrice(result.accessory.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {result.travelItem && (
                  <div
                    style={{
                      background: 'rgba(244, 178, 125, 0.18)',
                      borderRadius: 'var(--hi-radius-md)',
                      padding: '20px',
                    }}>
                    <p style={{fontSize: '12px', color: '#d88443', letterSpacing: '0.1em', marginBottom: '4px'}}>
                      추천 휴대용품
                    </p>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <span style={{fontSize: '28px'}}>{result.travelItem.emoji}</span>
                      <div>
                        <div style={{fontWeight: 600}}>{result.travelItem.name}</div>
                        <div style={{fontSize: '13px', color: 'var(--hi-brown-60)'}}>
                          ₩{formatPrice(result.travelItem.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="hi-text-center" style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Link
                  to={`/highskin/shop/${result.mainProduct.slug}`}
                  className="hi-btn hi-btn-primary hi-btn-lg">
                  이 제품 보러가기 →
                </Link>
                <button type="button" className="hi-btn hi-btn-secondary hi-btn-lg" onClick={handleRestart}>
                  ↺ 다시 해보기
                </button>
              </div>
            </div>
          )}

          <style>{`
            @media (max-width: 600px) {
              .hi-quiz-options {
                grid-template-columns: 1fr 1fr !important;
              }
              .hi-result-main {
                flex-direction: column !important;
                text-align: center;
              }
              .hi-result-accessories {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </section>
    </HiLayout>
  );
}
