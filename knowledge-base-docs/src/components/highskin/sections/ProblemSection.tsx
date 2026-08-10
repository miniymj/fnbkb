import type {ReactNode} from 'react';

const PROBLEMS = [
  {icon: '🚿', title: '매일 하는 목욕', desc: '조금 더 즐거울 수 없을까요?'},
  {icon: '🧒', title: '씻기 싫어하는 아이', desc: '목욕이 전쟁 같은 우리 집'},
  {icon: '🧼', title: '젖고 물러지는 비누', desc: '욕실에서 끈적이는 고체비누'},
  {icon: '🧳', title: '늘어나는 샴푸', desc: '여행마다 챙기는 액체들'},
];

/**
 * 02. EVERYDAY PROBLEM — 고객 공감
 */
export default function ProblemSection(): ReactNode {
  return (
    <section className="hi-section">
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">02 · EVERYDAY PROBLEM</p>
          <h2 className="hi-section-title">매일 하는 목욕, 조금 더 즐거울 수 없을까요?</h2>
        </div>

        <div className="hi-problem-grid">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="hi-problem-card">
              <div className="hi-problem-icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <p className="hi-problem-closing">
          하이피부는 씻는 순간부터
          <br />
          보관하고 이동하는 순간까지 다시 생각했습니다.
        </p>
      </div>
    </section>
  );
}
