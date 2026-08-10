import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

const MOODS = [
  {
    id: 'rest',
    label: 'REST',
    name: 'Lavender',
    desc: '하루 끝, 편안하고 촉촉하게',
    emoji: '😴',
  },
  {
    id: 'fresh',
    label: 'FRESH',
    name: 'Citrus',
    desc: '상쾌하게 시작하고 싶은 날',
    emoji: '😆',
  },
  {
    id: 'soft',
    label: 'SOFT',
    name: 'Oat',
    desc: '부드럽고 편안하게',
    emoji: '◡',
  },
  {
    id: 'clean',
    label: 'CLEAN',
    name: 'Herb',
    desc: '산뜻하게 씻고 싶은 날',
    emoji: '🌿',
  },
] as const;

/**
 * 07. CHOOSE YOUR MOOD — 기분별 제품 선택
 * 성분이 아니라 기분과 상황부터 선택하게 합니다.
 */
export default function MoodSelectorSection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">07 · MOOD</p>
          <h2 className="hi-section-title">오늘 필요한 목욕은?</h2>
          <p className="hi-section-subtitle" style={{margin: '16px auto 0'}}>
            성분부터 보기보다, 오늘의 기분부터 골라보세요.
          </p>
        </div>

        <div className="hi-mood-grid">
          {MOODS.map((mood) => (
            <Link
              key={mood.id}
              to={`/highskin/shop/body-bar`}
              className={`hi-mood-card hi-${mood.id}`}>
              <div className="hi-mood-label">{mood.label}</div>
              <h4>{mood.name}</h4>
              <p>{mood.desc}</p>
              <div style={{fontSize: '28px', marginTop: '12px'}}>{mood.emoji}</div>
            </Link>
          ))}
        </div>

        <div className="hi-text-center hi-mt-40">
          <Link to="/highskin/shop" className="hi-btn hi-btn-primary">
            오늘의 바디바 찾기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
