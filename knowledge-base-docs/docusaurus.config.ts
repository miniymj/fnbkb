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

  url: 'https://miniymj.github.io',
  baseUrl: '/fnbkb/',

  organizationName: 'miniymj',
  projectName: 'fnbkb',

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
          sidebarId: 'skirtSidebar',
          position: 'left',
          label: '👗 치마(스커트)',
        },
        {
          type: 'docSidebar',
          sidebarId: 'onesieSidebar',
          position: 'left',
          label: '👗 원피스',
        },
        {
          type: 'docSidebar',
          sidebarId: 'bodybarSidebar',
          position: 'left',
          label: '🧴 바디바/샴푸바',
        },
        {
          type: 'docSidebar',
          sidebarId: 'commonSidebar',
          position: 'left',
          label: '📚 공통 가이드',
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
              to: '/docs/storytelling/intro',
            },
            {
              label: '브랜딩',
              to: '/docs/branding/intro',
            },
            {
              label: '마케팅',
              to: '/docs/marketing/intro',
            },
            {
              label: '시장조사',
              to: '/docs/research/intro',
            },
          ],
        },
        {
          title: '프로젝트',
          items: [
            {
              label: '프로젝트 계획',
              href: 'https://github.com/miniymj/fnbkb',
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
