import type {ReactNode} from 'react';
import {useState} from 'react';
import Link from '@docusaurus/Link';
import {FACES} from '@site/src/data/highskin/faces';

/**
 * 03. CHOOSE YOUR FACE — PLAY
 * 내 기분대로 고르는 비누. 클릭 시 표정이 선택됨.
 */
export default function FacePickerSection(): ReactNode {
  const [selected, setSelected] = useState<string | null>('smile');
  const selectedFace = FACES.find((f) => f.id === selected);

  return (
    <section className="hi-section" style={{background: 'var(--hi-milk-pink)'}}>
      <div className="hi-container">
        <div className="hi-section-header">
          <p className="hi-section-num">03 · PLAY</p>
          <h2 className="hi-section-title">내 기분대로 고르는 비누</h2>
          <p className="hi-section-subtitle" style={{margin: '16px auto 0'}}>
            오늘은 어떤 표정인가요?
          </p>
        </div>

        <div className="hi-face-grid">
          {FACES.map((face) => (
            <button
              key={face.id}
              type="button"
              className={`hi-face-card ${selected === face.id ? 'hi-selected' : ''}`}
              onClick={() => setSelected(face.id)}
              aria-label={face.kr}>
              <span className="hi-face-emoji">{face.emoji}</span>
              <div className="hi-face-name">{face.kr}</div>
              <div className="hi-face-desc">{face.desc}</div>
            </button>
          ))}
        </div>

        {selectedFace && (
          <div className="hi-text-center hi-mt-40">
            <p style={{fontSize: '18px', marginBottom: '8px'}}>
              오늘의 표정은 <strong>{selectedFace.kr}</strong> · {selectedFace.desc}
            </p>
            <Link to="/highskin/custom-face" className="hi-btn hi-btn-primary">
              내 표정으로 비누 만들기 →
            </Link>
          </div>
        )}

        <p
          className="hi-text-center hi-mt-40"
          style={{fontSize: '15px', color: 'var(--hi-brown-60)', maxWidth: 640, margin: '40px auto 0'}}>
          캐릭터가 붙어 있는 비누가 아니라,
          <br />
          <strong style={{color: 'var(--hi-brown)'}}>비누 자체가 나의 캐릭터가 됩니다.</strong>
        </p>
      </div>
    </section>
  );
}
