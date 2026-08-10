import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import HiLayout from '@site/src/components/highskin/HiLayout';

/**
 * HI-SKIN JOURNAL 랜딩 페이지
 *
 * 제품 광고가 아닌, 상황을 해결하는 콘텐츠를 모은 허브.
 * SEO/GEO를 위한 문제 해결형 콘텐츠 마케팅 페이지.
 *
 * 카테고리: FAMILY BATH · SOLID CARE · TRAVEL · SWIM · REFILL LIFE
 */
type Article = {
  title: string;
  href: string;
};

type Category = {
  id: string;
  name: string;
  eyebrow: string;
  tint: string; // 카테고리별 카드 배경 틴트
  tagColor: string;
  articles: Article[];
};

const CATEGORIES: Category[] = [
  {
    id: 'family-bath',
    name: 'FAMILY BATH',
    eyebrow: 'FAMILY BATH',
    tint: 'rgba(244, 178, 125, 0.12)',
    tagColor: '#d88443',
    articles: [
      {title: '씻기 싫어하는 아이와 목욕하는 방법', href: '/highskin/journal'},
      {title: '아이가 스스로 씻는 습관 만들기', href: '/highskin/journal'},
      {title: '가족 목욕 루틴 만들기', href: '/highskin/journal'},
    ],
  },
  {
    id: 'solid-care',
    name: 'SOLID CARE',
    eyebrow: 'SOLID CARE',
    tint: 'rgba(111, 148, 112, 0.10)',
    tagColor: '#6F9470',
    articles: [
      {title: '고체비누가 물러지는 이유', href: '/highskin/journal'},
      {title: '비누 잘 말리는 방법', href: '/highskin/journal'},
      {title: '바디바 보관법', href: '/highskin/journal'},
    ],
  },
  {
    id: 'travel',
    name: 'TRAVEL',
    eyebrow: 'TRAVEL',
    tint: 'rgba(64, 55, 53, 0.05)',
    tagColor: '#403735',
    articles: [
      {title: '가족여행 샤워용품 체크리스트', href: '/highskin/journal'},
      {title: '액체 없이 여행용 세면가방 꾸리기', href: '/highskin/journal'},
      {title: '미니바 활용법', href: '/highskin/journal'},
    ],
  },
  {
    id: 'swim',
    name: 'SWIM',
    eyebrow: 'SWIM',
    tint: 'rgba(91, 149, 200, 0.10)',
    tagColor: '#3b7fb8',
    articles: [
      {title: '수영장 목욕가방 준비물', href: '/highskin/journal'},
      {title: '젖은 비누 보관 방법', href: '/highskin/journal'},
      {title: '수영장 샤워 루틴', href: '/highskin/journal'},
    ],
  },
  {
    id: 'refill-life',
    name: 'REFILL LIFE',
    eyebrow: 'REFILL LIFE',
    tint: 'rgba(111, 148, 112, 0.14)',
    tagColor: '#6F9470',
    articles: [
      {title: '욕실 플라스틱 줄이는 방법', href: '/highskin/journal'},
      {title: '리필 생활 시작하기', href: '/highskin/journal'},
    ],
  },
];

export default function JournalPage(): ReactNode {
  return (
    <HiLayout
      title="JOURNAL"
      description="HI-SKIN JOURNAL — 목욕 고민이 있나요? 상황을 해결하는 콘텐츠를 모았어요. 가족 목욕, 고체비누 관리, 여행·수영, 리필 생활.">
      {/* 페이지 헤더 */}
      <section className="hi-page-header">
        <div className="hi-container">
          <p className="hi-eyebrow">JOURNAL</p>
          <h1>목욕 고민이 있나요?</h1>
          <p>상황을 해결하는 콘텐츠를 모았어요.</p>
        </div>
      </section>

      {/* 인트로 */}
      <section className="hi-section" style={{paddingBottom: '40px'}}>
        <div className="hi-container">
          <div className="hi-text-center" style={{maxWidth: '560px', margin: '0 auto'}}>
            <p style={{fontSize: '16px', lineHeight: 1.8, color: 'var(--hi-brown-60)'}}>
              JOURNAL은 제품 광고가 아니에요. 가족 목욕, 비누 보관, 여행과 수영장, 리필
              생활 — 일상에서 마주칠 수 있는 작은 목욕 고민을 해결하는 글을 모았어요.
              <br />
              상황별로 필요한 팁을 찾아보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      {CATEGORIES.map((cat) => (
        <section key={cat.id} className="hi-section" style={{paddingTop: '20px'}}>
          <div className="hi-container">
            <div className="hi-section-header hi-text-center" style={{marginBottom: '32px'}}>
              <p className="hi-eyebrow">{cat.eyebrow}</p>
              <h2 className="hi-section-title">{cat.name}</h2>
            </div>

            <div
              className="hi-journal-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
              }}>
              {cat.articles.map((article) => (
                <div
                  key={article.title}
                  style={{
                    background: cat.tint,
                    borderRadius: 'var(--hi-radius-md)',
                    padding: '28px 24px',
                    boxShadow: 'var(--hi-shadow-sm)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <span
                    style={{
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: cat.tagColor,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: '#fff',
                      marginBottom: '16px',
                    }}>
                    {cat.name}
                  </span>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      lineHeight: 1.4,
                      marginBottom: 'auto',
                      color: 'var(--hi-brown)',
                    }}>
                    {article.title}
                  </h3>
                  <Link
                    to={article.href}
                    style={{
                      display: 'inline-block',
                      marginTop: '20px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: cat.tagColor,
                      textDecoration: 'none',
                    }}>
                    읽기 →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 마무리 CTA */}
      <section
        className="hi-section"
        style={{background: 'var(--hi-cream)', textAlign: 'center'}}>
        <div className="hi-container">
          <h2 className="hi-section-title" style={{marginBottom: '16px'}}>
            목욕 고민이 더 있나요?
          </h2>
          <p style={{color: 'var(--hi-brown-60)', marginBottom: '32px'}}>
            자주 묻는 질문에서 더 많은 답을 찾을 수 있어요.
          </p>
          <Link to="/highskin/faq" className="hi-btn hi-btn-primary">
            FAQ 보기 →
          </Link>
        </div>
      </section>
    </HiLayout>
  );
}
