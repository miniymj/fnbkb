import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';

/**
 * HI-SKIN STORY 랜딩 페이지
 *
 * STORY 하위 페이지(Our Story · Ingredient & Material · How To Use)로 연결되는 3개 카드.
 */
export default function StoryIndexPage(): ReactNode {
  return (
    <HiLayout
      title="STORY"
      description="매일 하는 목욕에도 표정이 있습니다. 하이피부의 이야기 — Our Story, Ingredient & Material, How To Use.">
      {/* 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <h1>STORY</h1>
          <p>매일 하는 목욕에도 표정이 있습니다.</p>
        </div>
      </section>

      {/* 스토리 카드 */}
      <section className="hi-section">
        <div className="hi-container">
          <div className="hi-mood-grid">
            <Link to="/highskin/story/our-story" className="hi-mood-card hi-soft">
              <span className="hi-mood-label">OUR STORY</span>
              <span style={{fontSize: '40px', display: 'block', margin: '12px 0'}}>
                🌿
              </span>
              <h4>Our Story</h4>
              <p>표정을 가진 비누가 만들어진 이야기</p>
            </Link>

            <Link to="/highskin/story/ingredients" className="hi-mood-card hi-rest">
              <span className="hi-mood-label">INGREDIENT & MATERIAL</span>
              <span style={{fontSize: '40px', display: 'block', margin: '12px 0'}}>
                🌾
              </span>
              <h4>Ingredient & Material</h4>
              <p>피부에 닿는 것부터, 손에 닿는 것까지</p>
            </Link>

            <Link to="/highskin/story/how-to-use" className="hi-mood-card hi-clean">
              <span className="hi-mood-label">HOW TO USE</span>
              <span style={{fontSize: '40px', display: 'block', margin: '12px 0'}}>
                🪢
              </span>
              <h4>How To Use</h4>
              <p>비누를 더 편리하게 사용하는 작은 방법</p>
            </Link>
          </div>
        </div>
      </section>
    </HiLayout>
  );
}
