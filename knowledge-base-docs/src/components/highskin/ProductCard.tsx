import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {type Product, formatPrice, MOOD_LABELS} from '@site/src/data/highskin/products';

/**
 * 제품 카드 컴포넌트 — SHOP 목록에서 사용
 */
export default function ProductCard({product}: {product: Product}): ReactNode {
  const moodClass = product.mood ? `hi-${product.mood}` : '';
  const moodLabel = product.mood ? MOOD_LABELS[product.mood] : null;

  return (
    <Link to={`/highskin/shop/${product.slug}`} className={`hi-product-card`}>
      <div className={`hi-product-img ${moodClass}`}>{product.emoji}</div>
      <div className="hi-product-info">
        {moodLabel && (
          <div className="hi-product-mood">
            {moodLabel.label} · {moodLabel.kr}
          </div>
        )}
        <div className="hi-product-name">{product.name}</div>
        <div className="hi-product-desc">{product.shortDesc}</div>
        <div className="hi-product-price">
          <span className="hi-currency">₩</span>
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
}
