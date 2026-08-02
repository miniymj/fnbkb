import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🔍 시장조사',
    to: '/docs/research/intro',
    description: (
      <>
        경쟁사 분석, 잠재고객 분석, AI 브랜드 분석,
        시장 트렌드 및 산업 리포트
      </>
    ),
  },
  {
    title: '🎭 스토리텔링',
    to: '/docs/storytelling/intro',
    description: (
      <>
        브랜드 스토리 구조와 4단계 스토리텔링 프레임워크
      </>
    ),
  },
  {
    title: '🌟 브랜딩 · 📈 마케팅',
    to: '/docs/branding/intro',
    description: (
      <>
        셀러 페르소나, 브랜드 아이덴티티, 마케팅 방법론
      </>
    ),
  },
];

function Feature({title, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Link to={to}>
          <Heading as="h3">{title}</Heading>
        </Link>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
