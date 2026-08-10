import type {ReactNode} from 'react';

/**
 * 06. FAMILY — 가족 습관
 * 같이 쓰지만, 각자 다르게.
 *
 * ⚠️ 페르소나 제약: "아이에게는 씻는 재미, 엄마·아빠에게는 사용의 편리함"
 *    → "민감피부 당사자에게는 안심과 편리함, 가족에게는 씻는 재미"로 수정
 */
export default function FamilySection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">06 · FAMILY</p>
          <h2 className="hi-section-title">같이 쓰지만, 각자 다르게.</h2>
        </div>

        <div className="hi-family-row">
          <div className="hi-family-member">
            <div className="hi-family-soap hi-lg">😴</div>
            <div className="hi-family-role">민감피부 당사자</div>
            <div className="hi-family-desc">안심하고 편리하게</div>
          </div>
          <div className="hi-family-member">
            <div className="hi-family-soap hi-md">😆</div>
            <div className="hi-family-role">가족</div>
            <div className="hi-family-desc">씻는 재미</div>
          </div>
          <div className="hi-family-member">
            <div className="hi-family-soap hi-sm">☺</div>
            <div className="hi-family-role">함께</div>
            <div className="hi-family-desc">즐거운 목욕 습관</div>
          </div>
        </div>

        <p
          className="hi-text-center hi-mt-40"
          style={{
            fontSize: '16px',
            color: 'var(--hi-brown-60)',
            maxWidth: 560,
            margin: '40px auto 0',
            lineHeight: 1.8,
          }}>
          민감피부 당사자에게는 안심과 편리함을,
          <br />
          가족에게는 씻는 재미를,
          <br />
          모두에게는 함께하는 습관을.
        </p>
      </div>
    </section>
  );
}
