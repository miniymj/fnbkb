import type {ReactNode} from 'react';
import {useState, useEffect} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';

/**
 * HI-SKIN 레이아웃 래퍼
 *
 * KB 기본 Layout 대신 사용되는 HI-SKIN 전용 레이아웃.
 * .hi-app 클래스로 스코핑하여 KB 테마와 분리.
 */

type HiLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  /** JSON-LD 구조화 데이터 (GEO/SEO) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** OG 이미지 (절대/상대 경로) */
  ogImage?: string;
};

const NAV_ITEMS = [
  {
    label: 'SHOP',
    to: '/highskin/shop',
    dropdown: [
      {label: 'Body Bar', to: '/highskin/shop/body-bar'},
      {label: 'Mini Bar', to: '/highskin/shop/mini-bar'},
      {label: 'Bath Tools', to: '/highskin/shop/bath-tools'},
      {label: 'Travel & Swim', to: '/highskin/shop/travel-swim'},
      {label: 'Set & Gift', to: '/highskin/shop/set-gift'},
    ],
  },
  {label: 'BATH SYSTEM', to: '/highskin/bath-system'},
  {label: 'FIND MY FRIEND', to: '/highskin/find-my-friend'},
  {label: 'REFILL', to: '/highskin/refill'},
  {
    label: 'STORY',
    to: '/highskin/story',
    dropdown: [
      {label: 'Our Story', to: '/highskin/story/our-story'},
      {label: 'Ingredient & Material', to: '/highskin/story/ingredients'},
      {label: 'How To Use', to: '/highskin/story/how-to-use'},
    ],
  },
  {label: 'JOURNAL', to: '/highskin/journal'},
];

export default function HiLayout({
  children,
  title,
  description,
  jsonLd,
  ogImage,
}: HiLayoutProps): ReactNode {
  const [mobileOpen, setMobileOpen] = useState(false);

  // 본문 스크롤 잠금 (모바일 메뉴 열렸을 때)
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const pageTitle = title
    ? `${title} · HI-SKIN 하이피부`
    : 'HI-SKIN 하이피부 · 오늘, 어떤 표정으로 씻을래?';

  const pageDesc =
    description ??
    '표정을 고르는 즐거움부터, 사용하는 편리함까지. 민감피부 당사자부터 가족까지 함께 사용하는 패밀리 배스케어 브랜드.';

  return (
    <div className="hi-app">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Head>

      {/* GNB */}
      <nav className="hi-navbar">
        <div className="hi-navbar-inner">
          <Link to="/highskin" className="hi-navbar-logo">
            HI<span className="hi-logo-dot">·</span>SKIN
          </Link>

          <ul className="hi-navbar-menu">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={item.dropdown ? 'hi-dropdown' : ''}>
                <Link to={item.to}>{item.label}</Link>
                {item.dropdown && (
                  <ul className="hi-dropdown-menu">
                    {item.dropdown.map((sub) => (
                      <li key={sub.to}>
                        <Link to={sub.to}>{sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <Link to="/highskin/find-my-friend" className="hi-cta-nav">
            <span>☺</span>
            <span className="hi-cta-text">나의 하이친구 찾기</span>
          </Link>

          <button
            type="button"
            className="hi-navbar-toggle"
            aria-label="메뉴 열기"
            onClick={() => setMobileOpen((v) => !v)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div className={`hi-mobile-menu ${mobileOpen ? 'hi-open' : ''}`}>
        <Link to="/highskin/shop" onClick={() => setMobileOpen(false)}>
          SHOP
        </Link>
        <Link to="/highskin/bath-system" onClick={() => setMobileOpen(false)}>
          BATH SYSTEM
        </Link>
        <Link to="/highskin/find-my-friend" onClick={() => setMobileOpen(false)}>
          FIND MY FRIEND
        </Link>
        <Link to="/highskin/refill" onClick={() => setMobileOpen(false)}>
          REFILL
        </Link>
        <Link to="/highskin/story" onClick={() => setMobileOpen(false)}>
          STORY
        </Link>
        <Link to="/highskin/journal" onClick={() => setMobileOpen(false)}>
          JOURNAL
        </Link>
        <Link
          to="/highskin/faq"
          onClick={() => setMobileOpen(false)}
          style={{borderBottom: 'none', marginTop: '12px'}}>
          FAQ
        </Link>
      </div>

      {/* 본문 */}
      <main>{children}</main>

      {/* 모바일 플로팅 CTA */}
      <div className="hi-floating-cta">
        <Link to="/highskin/find-my-friend" className="hi-btn hi-btn-primary">
          ☺ 나의 하이친구 찾기
        </Link>
      </div>

      {/* 푸터 */}
      <footer className="hi-footer">
        <div className="hi-footer-inner">
          <div className="hi-footer-top">
            <div>
              <div className="hi-footer-brand">HI·SKIN 하이피부</div>
              <p className="hi-footer-tagline">
                표정을 고르는 즐거움부터, 사용하는 편리함까지.
                <br />
                가족의 일상에 즐거운 목욕 습관.
              </p>
              <div className="hi-footer-pillars" style={{marginTop: '20px'}}>
                <span>PLAYFUL</span>·<span>USEFUL</span>·<span>NATURAL</span>
              </div>
            </div>
            <div className="hi-footer-col">
              <h5>SHOP</h5>
              <ul>
                <li><Link to="/highskin/shop/body-bar">Body Bar</Link></li>
                <li><Link to="/highskin/shop/mini-bar">Mini Bar</Link></li>
                <li><Link to="/highskin/shop/bath-tools">Bath Tools</Link></li>
                <li><Link to="/highskin/shop/travel-swim">Travel & Swim</Link></li>
                <li><Link to="/highskin/shop/set-gift">Set & Gift</Link></li>
              </ul>
            </div>
            <div className="hi-footer-col">
              <h5>EXPERIENCE</h5>
              <ul>
                <li><Link to="/highskin/find-my-friend">나의 하이친구 찾기</Link></li>
                <li><Link to="/highskin/custom-face">나만의 표정 만들기</Link></li>
                <li><Link to="/highskin/bath-system">Bath System</Link></li>
                <li><Link to="/highskin/refill">Refill</Link></li>
              </ul>
            </div>
            <div className="hi-footer-col">
              <h5>STORY</h5>
              <ul>
                <li><Link to="/highskin/story/our-story">Our Story</Link></li>
                <li><Link to="/highskin/story/ingredients">Ingredient & Material</Link></li>
                <li><Link to="/highskin/story/how-to-use">How To Use</Link></li>
                <li><Link to="/highskin/journal">Journal</Link></li>
                <li><Link to="/highskin/faq">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="hi-footer-bottom">
            <span>© {new Date().getFullYear()} HI-SKIN 하이피부 · Happy Natural Care</span>
            <span>Family Bath Care · Solid & Travel Bath System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
