import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '패션뷰티 디지털 셀러 Knowledge Base',
  tagline: '시장조사, 아이템 선정, 브랜딩 가이드',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'http://localhost:3000',
  baseUrl: '/',

  organizationName: 'fashion-beauty-seller',
  projectName: 'knowledge-base',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '📚 Fashion Beauty KB',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'storytellingSidebar',
          position: 'left',
          label: '🎭 스토리텔링',
        },
        {
          type: 'docSidebar',
          sidebarId: 'brandingSidebar',
          position: 'left',
          label: '🌟 브랜딩',
        },
        {
          type: 'docSidebar',
          sidebarId: 'marketingSidebar',
          position: 'left',
          label: '📈 마케팅',
        },
        {
          type: 'docSidebar',
          sidebarId: 'researchSidebar',
          position: 'left',
          label: '🔍 시장조사',
        },
        {
          href: '/',
          label: '🏠 홈',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '카테고리',
          items: [
            {
              label: '스토리텔링',
              to: '/storytelling/intro',
            },
            {
              label: '브랜딩',
              to: '/branding/intro',
            },
            {
              label: '마케팅',
              to: '/marketing/intro',
            },
            {
              label: '시장조사',
              to: '/research/intro',
            },
          ],
        },
        {
          title: '프로젝트',
          items: [
            {
              label: '프로젝트 계획',
              href: 'https://github.com/your-repo',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 패션뷰티 디지털 셀러 양성과정. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'javascript', 'typescript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
