import type {ReactNode} from 'react';
import HiLayout from '@site/src/components/highskin/HiLayout';

/**
 * HI-SKIN HOW TO USE 페이지
 *
 * 비누를 더 편리하게 사용하는 5단계 가이드: HANG → DRY → FIT → CARRY → REFILL.
 */
export default function HowToUsePage(): ReactNode {
  return (
    <HiLayout
      title="HOW TO USE"
      description="비누를 더 편리하게 사용하는 작은 방법. HANG · DRY · FIT · CARRY · REFILL 5단계 사용 가이드.">
      {/* 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <h1>HOW TO USE</h1>
          <p>비누를 더 편리하게 사용하는 작은 방법.</p>
        </div>
      </section>

      {/* 5단계 사용 가이드 */}
      <section className="hi-section">
        <div className="hi-container">
          <div className="hi-system-flow">
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🪢</div>
              <div className="hi-system-step-label">HANG</div>
              <h4>걸기</h4>
              <p>사용 후 걸어두세요.</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">💨</div>
              <div className="hi-system-step-label">DRY</div>
              <h4>말리기</h4>
              <p>물은 빠지고 공기는 통하도록.</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🪮</div>
              <div className="hi-system-step-label">FIT</div>
              <h4>끼우기</h4>
              <p>브러시에 끼워 편리하게.</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🧳</div>
              <div className="hi-system-step-label">CARRY</div>
              <h4>휴대하기</h4>
              <p>여행과 수영장에도 가볍게.</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🔄</div>
              <div className="hi-system-step-label">REFILL</div>
              <h4>리필하기</h4>
              <p>다 쓰면 바디바만 다시 채워요.</p>
            </div>
          </div>

          <p className="hi-problem-closing">각 단계에 GIF나 짧은 영상이 들어갈 자리입니다.</p>
        </div>
      </section>
    </HiLayout>
  );
}
