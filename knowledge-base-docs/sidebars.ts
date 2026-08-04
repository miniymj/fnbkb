import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // ============================================================
  // 🧴 바디바/샴푸바 사이드바 (뷰티 아이템)
  // ============================================================
  bodybarSidebar: [
    {
      type: 'category',
      label: '🧴 바디바/샴푸바',
      link: { type: 'doc', id: 'branding/intro' },
      items: [
        'branding/md-lineup-shampoobar',
        'branding/md-lineup-bodybar',
        'branding/bodybar-time-place-space-passion-worksheet',
      ],
    },
    {
      type: 'category',
      label: '비즈니스 모델 캔버스 (BMC)',
      items: [
        'research/bodybar-bmc-9blocks',
      ],
    },
    {
      type: 'category',
      label: '시장조사 · 경쟁사 분석',
      items: [
        'research/bodybar-market-research',
        'research/bodybar-potential-customers',
        'research/competitive-analysis-differentiation',
        'research/youtube-review-analysis',
      ],
    },
  ],

  // ============================================================
  // 👗 스커트/원피스 사이드바 (패션 아이템 A)
  // ============================================================
  skirtSidebar: [
    {
      type: 'category',
      label: '👗 스커트/원피스',
      link: { type: 'doc', id: 'branding/intro' },
      items: [
        'branding/md-lineup-skirt-onesie',
        'branding/skirt-time-place-space-passion-worksheet',
      ],
    },
    {
      type: 'category',
      label: '비즈니스 모델 캔버스 (BMC)',
      items: [
        'research/skirt-bmc-9blocks',
      ],
    },
    {
      type: 'category',
      label: '시장조사 · 경쟁사 분석',
      items: [
        'research/skirt-market-research',
        'research/skirt-potential-customers',
        'research/competitive-analysis-skirt',
        'research/competitive-analysis-onesie',
        'research/onesie-potential-customers',
        'research/skirt-youtube-review-analysis',
        'research/skirt-related-keywords-analysis',
        'research/skirt-review-keywords-analysis',
      ],
    },
  ],

  // ============================================================
  // 🏖️ 휴양지원피스 사이드바 (패션 아이템 B)
  // ============================================================
  resortSidebar: [
    {
      type: 'category',
      label: '🏖️ 휴양지원피스',
      link: { type: 'doc', id: 'branding/intro' },
      items: [
        'branding/md-lineup-resort-onesie',
        'branding/onesie-time-place-space-passion-worksheet',
      ],
    },
    {
      type: 'category',
      label: '비즈니스 모델 캔버스 (BMC)',
      items: [
        'research/resort-onesie-bmc-9blocks',
      ],
    },
    {
      type: 'category',
      label: '시장조사 · 경쟁사 분석',
      items: [
        'research/resort-onesie-market-research',
        'research/resort-onesie-youtube-review-analysis',
      ],
    },
  ],

  // ============================================================
  // 📚 공통 가이드 사이드바
  // ============================================================
  commonSidebar: [
    {
      type: 'category',
      label: '스토리텔링',
      items: [
        'storytelling/intro',
        'storytelling/stage-structure',
        'storytelling/brand-story',
      ],
    },
    {
      type: 'category',
      label: '브랜딩 가이드',
      items: [
        'branding/brand-identity-guide',
        'branding/seller-persona',
        'branding/persona-regulation-worksheet',
        'branding/time-place-space-passion-worksheet',
      ],
    },
    {
      type: 'category',
      label: '마케팅',
      items: [
        'marketing/intro',
        'marketing/methodology',
      ],
    },
    {
      type: 'category',
      label: '시장조사 방법론 · 공통',
      items: [
        'research/intro',
        'research/methodology',
        'research/execution-plan',
        'research/project-plan',
        'research/data-collection-guide',
        'research/naver-shopping-category',
        'research/market-trends-summary',
        'research/industry-report-2026',
        'research/shampoo-bar-trending-keywords',
      ],
    },
    {
      type: 'category',
      label: '경쟁사 공통 분석',
      items: [
        'research/small-brand-competitors',
        'research/competitor-channel-verification',
        'research/ai-brand-analysis-methodology',
        'research/ai-brand-analysis-results',
        'research/review-research-cleansing-methodology',
      ],
    },
    {
      type: 'category',
      label: '개발 도구',
      items: [
        'development/crawling-scripts',
        'development/naver-api',
        'development/naver-api-setup',
      ],
    },
  ],
};

export default sidebars;
