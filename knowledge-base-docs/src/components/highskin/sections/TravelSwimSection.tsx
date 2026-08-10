import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';

const TABS = [
  {
    id: 'travel',
    label: 'TRAVEL · 여행',
    items: [
      {icon: '🧼', name: 'Mini Bar'},
      {icon: '🫧', name: '거품망'},
      {icon: '🧴', name: '배수 케이스'},
      {icon: '🪮', name: '헤어브러시'},
      {icon: '👛', name: '여행 파우치'},
    ],
  },
  {
    id: 'swim',
    label: 'SWIM · 수영장',
    items: [
      {icon: '🧴', name: '배수 비누케이스'},
      {icon: '👜', name: '통풍 목욕가방'},
      {icon: '🧼', name: '미니바'},
      {icon: '🫧', name: '거품망'},
      {icon: '💆', name: '헤어브러시'},
    ],
  },
  {
    id: 'camp',
    label: 'CAMP · 캠핑',
    items: [
      {icon: '🧼', name: '미니바'},
      {icon: '🫧', name: '거품망'},
      {icon: '🧴', name: '배수 케이스'},
      {icon: '👛', name: '여행 파우치'},
    ],
  },
  {
    id: 'gym',
    label: 'GYM · 운동',
    items: [
      {icon: '🧼', name: '미니바'},
      {icon: '🫧', name: '거품망'},
      {icon: '🧴', name: '배수 케이스'},
      {icon: '👜', name: '목욕가방'},
    ],
  },
] as const;

/**
 * 08. TRAVEL & SWIM — 상황 확장
 * 욕실에서 여행까지.
 */
export default function TravelSwimSection(): ReactNode {
  const [active, setActive] = useState<string>('travel');
  const current = TABS.find((t) => t.id === active)!;

  return (
    <section className="hi-section" style={{background: 'var(--hi-milk-pink)'}}>
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">08 · TRAVEL & SWIM</p>
          <h2 className="hi-section-title">욕실에서 여행까지.</h2>
          <p className="hi-section-subtitle" style={{margin: '16px auto 0'}}>
            좋은 목욕 습관은 집 밖에서도 이어질 수 있으니까.
          </p>
        </div>

        <div className="hi-tab-row">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`hi-tab ${active === tab.id ? 'hi-active' : ''}`}
              onClick={() => setActive(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hi-tab-panel hi-active">
          <ul className="hi-product-list">
            {current.items.map((item) => (
              <li key={item.name}>
                <span className="hi-icon">{item.icon}</span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="hi-text-center hi-mt-40">
          <Link to="/highskin/shop/travel-swim" className="hi-btn hi-btn-primary">
            여행 세트 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
