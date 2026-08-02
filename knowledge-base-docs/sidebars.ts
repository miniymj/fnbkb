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
      label: '데이터 수집 가이드',
      items: [
        'research/project-plan',
        'research/data-collection-guide',
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
