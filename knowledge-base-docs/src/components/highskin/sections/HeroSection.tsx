import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

/**
 * 01. HERO — 첫 3초
 * 브랜드 훅: "오늘, 어떤 표정으로 씻을래?"
 */
export default function HeroSection(): ReactNode {
  return (
    <section className="hi-hero">
      <div className="hi-container">
        <p className="hi-hero-eyebrow">HI-SKIN · Family Bath Care</p>
        <h1 className="hi-hero-title">오늘, 어떤 표정으로 씻을래?</h1>
        <p className="hi-hero-subtitle">
          표정을 고르는 즐거움부터,
          <br />
          사용하는 편리함까지.
        </p>
        <p className="hi-hero-brand">Happy Natural Care</p>

        <div className="hi-hero-cta">
          <Link to="/highskin/find-my-friend" className="hi-btn hi-btn-primary hi-btn-lg">
            ☺ 나의 하이친구 찾기
          </Link>
          <Link to="/highskin/shop" className="hi-btn hi-btn-secondary hi-btn-lg">
            바디바 만나보기 →
          </Link>
        </div>

        {/* 표정 비누 일러스트 */}
        <div className="hi-soap-row">
          <div className="hi-soap" title="Smile">☺</div>
          <div className="hi-soap" title="Wink">😉</div>
          <div className="hi-soap" title="Sleepy">😴</div>
          <div className="hi-soap" title="Happy">😆</div>
        </div>
      </div>
    </section>
  );
}
