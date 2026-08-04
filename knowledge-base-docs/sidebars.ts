import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 스토리텔링 사이드바
  storytellingSidebar: [
    {
      type: 'category',
      label: '스토리텔링',
      items: [
        'storytelling/intro',
        'storytelling/stage-structure',
        'storytelling/brand-story',
      ],
    },
  ],

  // 브랜딩 사이드바
  brandingSidebar: [
    {
      type: 'category',
      label: '브랜딩',
      items: [
        'branding/intro',
        'branding/seller-persona',
        'branding/brand-identity-guide',
        'branding/persona-regulation-worksheet',
        'branding/time-place-space-passion-worksheet',
        'branding/skirt-time-place-space-passion-worksheet',
        'branding/onesie-time-place-space-passion-worksheet',
        'branding/bodybar-time-place-space-passion-worksheet',
      ],
    },
    {
      type: 'category',
      label: 'MD 라인업',
      items: [
        'branding/md-lineup-shampoobar',
        'branding/md-lineup-bodybar',
        'branding/md-lineup-skirt-onesie',
        'branding/md-lineup-resort-onesie',
      ],
    },
  ],

  // 마케팅 사이드바
  marketingSidebar: [
    {
      type: 'category',
      label: '마케팅',
      items: [
        'marketing/intro',
        'marketing/methodology',
      ],
    },
  ],

  // 시장조사 사이드바
  researchSidebar: [
    {
      type: 'category',
      label: '시장조사 개요',
      items: [
        'research/intro',
        'research/methodology',
        'research/execution-plan',
        'research/naver-shopping-category',
      ],
    },
    {
      type: 'category',
      label: '데이터 수집 · 트렌드 분석',
      items: [
        'research/project-plan',
        'research/data-collection-guide',
        'research/market-trends-summary',
        'research/industry-report-2026',
        'research/skirt-related-keywords-analysis',
        'research/skirt-review-keywords-analysis',
        'research/shampoo-bar-trending-keywords',
      ],
    },
    {
      type: 'category',
      label: '경쟁사 분석 및 차별화',
      items: [
        'research/competitive-analysis-differentiation',
        'research/competitive-analysis-onesie',
        'research/competitive-analysis-skirt',
        'research/small-brand-competitors',
      ],
    },
    {
      type: 'category',
      label: 'AI 브랜드 분석 · 리뷰 · 채널 검증',
      items: [
        'research/ai-brand-analysis-methodology',
        'research/ai-brand-analysis-results',
        'research/review-research-cleansing-methodology',
        'research/youtube-review-analysis',
        'research/competitor-channel-verification',
      ],
    },
    {
      type: 'category',
      label: '잠재고객 분석',
      items: [
        'research/bodybar-potential-customers',
        'research/skirt-potential-customers',
        'research/onesie-potential-customers',
      ],
    },
  ],

  // 개발 사이드바
  developmentSidebar: [
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
