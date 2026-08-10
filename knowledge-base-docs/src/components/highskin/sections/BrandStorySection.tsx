import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

/**
 * 12. BRAND STORY + FINAL CTA
 * HI-SKIN은 비누 하나에서 시작해 가족의 목욕 시간을 즐거운 경험으로 디자인합니다.
 */
export default function BrandStorySection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-story-closing">
          <p className="hi-section-num" style={{color: 'var(--hi-pink)'}}>
            12 · WHY HI-SKIN
          </p>
          <h2>
            매일 하는 목욕에도
            <br />
            표정이 있습니다.
          </h2>
          <p>
            오늘은 활짝. 내일은 윙크.
            <br />
            걸어두고, 말리고, 여행에도 챙기고, 다 쓰면 다시 채우고.
            <br />
            HI-SKIN은 비누 하나에서 시작해
            <br />
            가족의 목욕 시간을 즐거운 경험으로 디자인합니다.
          </p>

          <div className="hi-story-brand">
            HI-SKIN 하이피부 · Happy Natural Care
          </div>
          <p style={{marginTop: '8px', fontSize: '14px'}}>가족의 일상에 즐거운 목욕 습관.</p>

          <div className="hi-story-cta">
            <Link to="/highskin/find-my-friend" className="hi-btn hi-btn-primary hi-btn-lg">
              ☺ 나의 하이친구 찾기 →
            </Link>
            <Link
              to="/highskin/shop"
              className="hi-btn hi-btn-secondary hi-btn-lg"
              style={{color: 'var(--hi-cream)', borderColor: 'rgba(255,248,239,0.3)'}}>
              바디바 만나보기 →
            </Link>
          </div>

          <div style={{marginTop: '40px'}}>
            <Link
              to="/highskin/story/our-story"
              style={{
                color: 'rgba(255,248,239,0.6)',
                fontSize: '14px',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}>
              브랜드 스토리 더 읽기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
