import type {ReactNode} from 'react';
import HiLayout from '@site/src/components/highskin/HiLayout';

/**
 * HI-SKIN OUR STORY 페이지
 *
 * 5단계 브랜드 스토리: WHY → PLAY → USEFUL → FAMILY → SUSTAINABLE.
 * 민감피부 당사자부터 가족까지 함께 사용하는 패밀리 배스케어.
 */
export default function OurStoryPage(): ReactNode {
  return (
    <HiLayout
      title="OUR STORY"
      description="매일 하는 목욕에도 표정이 있습니다. 하이피부의 시작과 철학을 담은 브랜드 스토리.">
      {/* 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <h1>OUR STORY</h1>
          <p>매일 하는 목욕에도 표정이 있습니다.</p>
        </div>
      </section>

      {/* 스토리 섹션들 */}
      <section className="hi-section">
        <div className="hi-container">
          {/* STORY 01 · WHY */}
          <div className="hi-section-header hi-left" style={{marginBottom: '32px'}}>
            <div className="hi-section-num">STORY 01 · WHY</div>
            <p className="hi-section-subtitle" style={{maxWidth: '720px'}}>
              "매일 반복하는 목욕을 조금 더 기다려지는 시간으로 만들 수 없을까?"
            </p>
          </div>
        </div>
      </section>

      <section className="hi-section" style={{paddingTop: '0'}}>
        <div className="hi-container">
          {/* STORY 02 · PLAY */}
          <div className="hi-section-header hi-left" style={{marginBottom: '32px'}}>
            <div className="hi-section-num">STORY 02 · PLAY</div>
            <p className="hi-section-subtitle" style={{maxWidth: '720px'}}>
              "그래서 비누에 표정을 만들었습니다."
            </p>
          </div>
        </div>
      </section>

      <section className="hi-section" style={{paddingTop: '0'}}>
        <div className="hi-container">
          {/* STORY 03 · USEFUL */}
          <div className="hi-section-header hi-left" style={{marginBottom: '32px'}}>
            <div className="hi-section-num">STORY 03 · USEFUL</div>
            <p className="hi-section-subtitle" style={{maxWidth: '720px'}}>
              "하지만 귀엽기만 한 제품은 만들고 싶지 않았습니다. 젖고, 미끄럽고,
              보관하기 어려웠던 비누의 불편함을 다시 디자인합니다."
            </p>
          </div>
        </div>
      </section>

      <section className="hi-section" style={{paddingTop: '0'}}>
        <div className="hi-container">
          {/* STORY 04 · FAMILY */}
          <div className="hi-section-header hi-left" style={{marginBottom: '32px'}}>
            <div className="hi-section-num">STORY 04 · FAMILY</div>
            <p className="hi-section-subtitle" style={{maxWidth: '720px'}}>
              "민감피부 당사자도 안심, 가족 모두가 함께 쓰면서 각자의 표정과 향을
              선택."
            </p>
          </div>
        </div>
      </section>

      <section className="hi-section" style={{paddingTop: '0'}}>
        <div className="hi-container">
          {/* STORY 05 · SUSTAINABLE */}
          <div className="hi-section-header hi-left" style={{marginBottom: '56px'}}>
            <div className="hi-section-num">STORY 05 · SUSTAINABLE</div>
            <p className="hi-section-subtitle" style={{maxWidth: '720px'}}>
              "한 번 쓰고 버리는 대신, 오래 쓰고 다시 채우는 방식으로."
            </p>
          </div>

          {/* 클로징 */}
          <div className="hi-story-closing">
            <div className="hi-story-brand">HI-SKIN 하이피부</div>
            <h2>가족의 일상에 즐거운 목욕 습관.</h2>
            <p>
              민감피부 당사자부터 가족까지, 각자의 표정과 향을 고르며 함께 쓰는
              목욕. 하이피부는 그 작은 즐거움을 매일의 습관으로 만듭니다.
            </p>
          </div>
        </div>
      </section>
    </HiLayout>
  );
}
