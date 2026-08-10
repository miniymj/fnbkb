import type {ReactNode} from 'react';
import {useState} from 'react';
import HiLayout from '@site/src/components/highskin/HiLayout';
import {FAQ_CATEGORIES, buildFaqJsonLd} from '@site/src/data/highskin/faq';

/**
 * HI-SKIN FAQ 페이지
 *
 * 상품명보다 고객 상황 중심으로 구성한 아코디언 FAQ.
 * FAQPage 구조화 데이터(JSON-LD)로 SEO 강화.
 */
export default function FaqPage(): ReactNode {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <HiLayout
      title="FAQ"
      description="상품명보다 고객 상황 중심으로 구성한 하이피부 FAQ. 가족 사용, 바디바, 여행, 수영장, 리필, 커스텀, 성분."
      jsonLd={buildFaqJsonLd()}>
      {/* 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <h1>FAQ</h1>
          <p>상품명보다 고객 상황 중심으로 구성했습니다.</p>
        </div>
      </section>

      {/* FAQ 아코디언 */}
      <section className="hi-section">
        <div className="hi-container">
          {FAQ_CATEGORIES.map((category) => (
            <div className="hi-faq-category" key={category.id}>
              <h3>
                {category.emoji} {category.label}
              </h3>
              {category.items.map((item, index) => {
                const itemId = `${category.id}-${index}`;
                const isOpen = openId === itemId;
                return (
                  <div
                    key={itemId}
                    className={`hi-faq-item ${isOpen ? 'hi-open' : ''}`}>
                    <button
                      type="button"
                      className="hi-faq-q"
                      onClick={() => setOpenId(isOpen ? null : itemId)}
                      aria-expanded={isOpen}>
                      <span>{item.q}</span>
                      <span className="hi-faq-icon">+</span>
                    </button>
                    <div className="hi-faq-a">
                      <p style={{margin: 0}}>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </HiLayout>
  );
}
