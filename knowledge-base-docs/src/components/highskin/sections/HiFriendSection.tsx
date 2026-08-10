import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

const QUESTIONS = [
  {num: 'Q1', text: '누구와 사용하나요?', options: ['나', '아이와 함께', '온가족']},
  {num: 'Q2', text: '오늘 기분은?', options: ['편안하게', '상쾌하게', '부드럽게', '산뜻하게']},
  {num: 'Q3', text: '어디에서 사용하나요?', options: ['집', '여행', '수영장', '운동 후']},
  {num: 'Q4', text: '오늘 표정은?', options: ['☺', '😉', '😴', '♡', '😆']},
];

/**
 * 11. FIND MY HI-FRIEND — 나의 하이친구 찾기
 * 홈페이지의 대표 브랜드 경험.
 */
export default function HiFriendSection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-quiz-inline">
          <p className="hi-section-num">11 · FIND MY FRIEND</p>
          <h2 className="hi-section-title">오늘의 하이친구 찾기</h2>
          <p
            className="hi-section-subtitle"
            style={{margin: '16px auto 0', color: 'var(--hi-brown-60)'}}>
            4가지 질문으로 나에게 맞는 바디바를 찾아드려요.
          </p>

          <div className="hi-quiz-preview">
            {QUESTIONS.map((q) => (
              <div key={q.num} className="hi-quiz-q">
                <div className="hi-quiz-q-num">{q.num}</div>
                <div className="hi-quiz-q-text">{q.text}</div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--hi-brown-60)',
                    marginTop: '8px',
                    lineHeight: 1.6,
                  }}>
                  {q.options.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '15px',
              color: 'var(--hi-brown)',
              marginBottom: '24px',
            }}>
            결과 예시: <strong>오늘의 하이친구는 Lavender Sleepy :)</strong>
          </p>

          <Link to="/highskin/find-my-friend" className="hi-btn hi-btn-primary hi-btn-lg">
            ☺ 나의 하이친구 찾기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
