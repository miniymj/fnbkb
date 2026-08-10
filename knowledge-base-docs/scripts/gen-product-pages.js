/**
 * HI-SKIN 제품 상세페이지 자동 생성 스크립트
 *
 * 각 제품 slug별로 ProductDetailContent를 호출하는 TSX 파일을 생성.
 * Docusaurus 3 pages plugin은 동적 라우트([slug].tsx)를 기본 지원하지 않으므로
 * 정적 파일로 각 slug에 대한 페이지를 생성.
 */
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'highskin', 'products.ts'),
  'utf8',
);
const slugMatches = content.match(/slug:\s*'([^']+)'/g) || [];
const slugs = slugMatches.map((s) => s.replace(/slug:\s*'/, '').replace(/'/, ''));

const shopDir = path.join(__dirname, '..', 'src', 'pages', 'highskin', 'shop');
const existingCategories = ['body-bar', 'mini-bar', 'bath-tools', 'travel-swim', 'set-gift', 'index'];

let count = 0;
slugs.forEach((slug) => {
  if (existingCategories.includes(slug)) return;

  const fileName = slug + '.tsx';
  const fnName = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/-/g, '');

  const fileContent = `import type {ReactNode} from 'react';
import ProductDetailContent from '@site/src/components/highskin/ProductDetailContent';

export default function ${fnName}Page(): ReactNode {
  return <ProductDetailContent slug="${slug}" />;
}
`;

  fs.writeFileSync(path.join(shopDir, fileName), fileContent);
  count++;
});

console.log('Generated', count, 'product detail pages');
