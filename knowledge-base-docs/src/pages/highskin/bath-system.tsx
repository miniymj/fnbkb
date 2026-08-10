import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';

/**
 * HI-SKIN BATH SYSTEM 페이지
 *
 * 5단계 시스템(HANG → DRY → FIT → CARRY → REFILL) 시각화.
 * 이 영역이 하이피부를 일반 수제비누 브랜드와 구분하는 핵심입니다.
 */
export default function BathSystemPage(): ReactNode {
  return (
    <HiLayout
      title="BATH SYSTEM"
      description="비누의 불편함도 바꿨습니다. HANG · DRY · FIT · CARRY · REFILL — 하이피부의 5단계 Bath System.">
      {/* 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <h1>BATH SYSTEM</h1>
          <p>비누의 불편함도 바꿨습니다.</p>
        </div>
      </section>

      {/* 5단계 시스템 */}
      <section className="hi-section">
        <div className="hi-container">
          <div className="hi-system-flow">
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🪢</div>
              <div className="hi-system-step-label">HANG</div>
              <h4>걸기</h4>
              <p>실리콘 루프로 걸어두기</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">💨</div>
              <div className="hi-system-step-label">DRY</div>
              <h4>말리기</h4>
              <p>배수·통풍 구조로 건조</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🪮</div>
              <div className="hi-system-step-label">FIT</div>
              <h4>끼우기</h4>
              <p>샴푸브러시·홀더와 결합</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🧳</div>
              <div className="hi-system-step-label">CARRY</div>
              <h4>휴대하기</h4>
              <p>여행·수영장에 휴대</p>
            </div>
            <div className="hi-system-step">
              <div className="hi-system-step-icon">🔄</div>
              <div className="hi-system-step-label">REFILL</div>
              <h4>리필하기</h4>
              <p>다 쓰면 바디바만 교체</p>
            </div>
          </div>

          <p className="hi-problem-closing">
            이 영역이 하이피부를 일반 수제비누 브랜드와 구분하는 핵심입니다.
          </p>

          <div className="hi-text-center hi-mt-40">
            <Link to="/highskin/shop/bath-tools" className="hi-btn hi-btn-primary">
              SHOP에서 Bath Tools 보기 →
            </Link>
          </div>
        </div>
      </section>
    </HiLayout>
  );
}
