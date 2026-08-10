/**
 * HI-SKIN 제품 데이터
 *
 * MD 라인업(4 tier) + 카테고리별 제품 구성
 * 출처: md-lineup-bodybar.md, highskin-homepage-plan.md
 */

export type Mood = 'rest' | 'fresh' | 'soft' | 'clean';

export type ProductCategory =
  | 'body-bar'
  | 'mini-bar'
  | 'bath-tools'
  | 'travel-swim'
  | 'set-gift';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  mood?: Mood;
  price: number;
  tier?: 'entry' | 'core' | 'premium' | 'bundle';
  emoji: string;
  shortDesc: string;
  description: string;
  scent?: string;
  ingredients?: string[];
  skinFeel?: string;
  faces?: string[];
  target?: string;
  howToUse?: string;
  storage?: string;
  refillable?: boolean;
  situations?: string[];
};

export const MOOD_LABELS: Record<Mood, {label: string; kr: string; desc: string}> = {
  rest: {label: 'REST', kr: '휴식', desc: '하루 끝, 편안하고 촉촉하게'},
  fresh: {label: 'FRESH', kr: '상쾌', desc: '상쾌하게 시작하고 싶은 날'},
  soft: {label: 'SOFT', kr: '부드러움', desc: '부드럽고 편안하게'},
  clean: {label: 'CLEAN', kr: '산뜻', desc: '산뜻하게 씻고 싶은 날'},
};

export const CATEGORY_LABELS: Record<ProductCategory, {label: string; kr: string; desc: string}> = {
  'body-bar': {label: 'BODY BAR', kr: '바디바', desc: '오늘의 기분을 골라 씻어요.'},
  'mini-bar': {label: 'MINI BAR', kr: '미니바', desc: '작게 챙기고, 기분대로 골라요.'},
  'bath-tools': {label: 'BATH TOOLS', kr: '배스 도구', desc: '비누를 더 편하게 사용하는 방법.'},
  'travel-swim': {label: 'TRAVEL & SWIM', kr: '여행·수영', desc: '욕실에서 여행까지, 좋은 목욕 습관 그대로.'},
  'set-gift': {label: 'SET & GIFT', kr: '세트·선물', desc: '좋은 목욕 시간을 선물하세요.'},
};

export const PRODUCTS: Product[] = [
  // ============================================================
  // BODY BAR
  // ============================================================
  {
    id: 'body-lavender',
    slug: 'lavender-body-bar',
    name: 'Lavender Body Bar',
    category: 'body-bar',
    mood: 'rest',
    price: 9800,
    tier: 'core',
    emoji: '😴',
    shortDesc: '하루 끝, 편안하게.',
    description:
      '라벤더와 세이지의 차분한 향. 민감피부 당사자도 편안하게 사용할 수 있는 부드러운 거품. 하루를 마무리하는 휴식의 목욕시간을 위한 바디바.',
    scent: 'Lavender · Sage',
    ingredients: ['Lavender Oil', 'Sage Extract', 'Plant Oil', 'Botanical Blend'],
    skinFeel: '편안하고 촉촉하게 닦이는 마무리',
    faces: ['Sleepy', 'Calm', 'Smile'],
    target: '민감피부 당사자 · 하루를 편안하게 마무리하고 싶은 분',
    howToUse: '거품망이나 손으로 충분한 거품을 낸 뒤 온몸에 사용하고 물로 헹궈주세요.',
    storage: '사용 후 실리콘 루프로 걸어두거나 배수 홀더에 올려 물기가 빠지도록 보관하세요.',
    refillable: true,
    situations: ['home', 'rest'],
  },
  {
    id: 'body-citrus',
    slug: 'citrus-body-bar',
    name: 'Citrus Body Bar',
    category: 'body-bar',
    mood: 'fresh',
    price: 9800,
    tier: 'core',
    emoji: '😆',
    shortDesc: '상쾌하게 시작하고 싶은 날.',
    description:
      '감귤과 라임의 산뜻한 향. 아침 목욕으로 하루를 가볍게 시작하고 싶을 때. 상쾌한 사용감으로 기분까지 맑아지는 바디바.',
    scent: 'Citrus · Bergamot',
    ingredients: ['Citrus Oil', 'Bergamot', 'Plant Oil', 'Botanical Blend'],
    skinFeel: '가볍고 산뜻하게 닦이는 사용감',
    faces: ['Happy', 'Wink', 'Smile'],
    target: '아침 목욕을 즐기는 분 · 산뜻한 사용감을 원하는 분',
    howToUse: '거품망이나 손으로 충분한 거품을 낸 뒤 온몸에 사용하고 물로 헹궈주세요.',
    storage: '사용 후 실리콘 루프로 걸어두거나 배수 홀더에 올려 물기가 빠지도록 보관하세요.',
    refillable: true,
    situations: ['home', 'fresh'],
  },
  {
    id: 'body-oat',
    slug: 'oat-body-bar',
    name: 'Oat Body Bar',
    category: 'body-bar',
    mood: 'soft',
    price: 9800,
    tier: 'core',
    emoji: '◡',
    shortDesc: '부드럽고 편안하게.',
    description:
      '오트밀의 부드러운 보습감. 건조함을 느끼는 민감피부에 편안하게 닿는 보습 바디바. 자극 없이 부드럽게 씻어내는 경험.',
    scent: 'Mild Oat',
    ingredients: ['Oat Extract', 'Plant Oil', 'Shea Butter', 'Botanical Blend'],
    skinFeel: '보습감이 남는 부드러운 사용감',
    faces: ['Calm', 'Smile', 'Love'],
    target: '건조함을 느끼는 분 · 보습을 원하는 민감피부',
    howToUse: '거품망이나 손으로 충분한 거품을 낸 뒤 온몸에 사용하고 물로 헹궈주세요.',
    storage: '사용 후 실리콘 루프로 걸어두거나 배수 홀더에 올려 물기가 빠지도록 보관하세요.',
    refillable: true,
    situations: ['home', 'soft'],
  },
  {
    id: 'body-herb',
    slug: 'herb-body-bar',
    name: 'Herb Body Bar',
    category: 'body-bar',
    mood: 'clean',
    price: 9800,
    tier: 'core',
    emoji: '🌿',
    shortDesc: '산뜻하게 씻고 싶은 날.',
    description:
      '허브의 깨끗한 세정력. 땀이나 번들거림이 신경 쓰일 때 산뜻하게. 운동 후나 활동량이 많은 날에 어울리는 시원한 사용감의 바디바.',
    scent: 'Herb · Mint',
    ingredients: ['Herb Extract', 'Peppermint', 'Plant Oil', 'Botanical Blend'],
    skinFeel: '시원하고 산뜻하게 닦이는 사용감',
    faces: ['Happy', 'Wink'],
    target: '운동 후 산뜻한 세정을 원하는 분 · 활동량이 많은 분',
    howToUse: '거품망이나 손으로 충분한 거품을 낸 뒤 온몸에 사용하고 물로 헹궈주세요.',
    storage: '사용 후 실리콘 루프로 걸어두거나 배수 홀더에 올려 물기가 빠지도록 보관하세요.',
    refillable: true,
    situations: ['home', 'gym'],
  },
  {
    id: 'body-family',
    slug: 'family-body-bar',
    name: 'Family Body Bar',
    category: 'body-bar',
    mood: 'soft',
    price: 9800,
    tier: 'core',
    emoji: '☺',
    shortDesc: '온가족이 함께 쓰는 기본 바디바.',
    description:
      '민감피부 당사자부터 가족까지 모두 편안하게 사용할 수 있는 가족용 바디바. 자극이 적고 부드러운 거품으로 온가족이 각자의 표정으로 사용.',
    scent: 'Mild Unscented',
    ingredients: ['Plant Oil', 'Botanical Blend', 'Glycerin'],
    skinFeel: '순하고 부드러운 사용감',
    faces: ['Smile', 'Calm', 'Happy', 'Wink', 'Sleepy', 'Love'],
    target: '온가족 공용 · 민감피부도 편안하게',
    howToUse: '거품망이나 손으로 충분한 거품을 낸 뒤 온몸에 사용하고 물로 헹궈주세요.',
    storage: '사용 후 실리콘 루프로 걸어두거나 배수 홀더에 올려 물기가 빠지도록 보관하세요.',
    refillable: true,
    situations: ['home', 'family'],
  },
  {
    id: 'body-custom',
    slug: 'custom-face-bar',
    name: 'Custom Face Bar',
    category: 'body-bar',
    mood: 'soft',
    price: 16800,
    tier: 'premium',
    emoji: '✦',
    shortDesc: '내가 고른 표정을 비누에 새겨요.',
    description:
      '원하는 표정을 직접 골라 비누에 음각으로 새기는 커스텀 바디바. Smile · Wink · Sleepy · Love · Happy · Calm 중 선택. 세상에 하나뿔인 나만의 바디바.',
    scent: '선택 가능 (Lavender / Citrus / Oat / Herb / Unscented)',
    ingredients: ['선택한 향에 따른 성분 구성'],
    skinFeel: '선택에 따름',
    faces: ['Smile', 'Wink', 'Sleepy', 'Love', 'Happy', 'Calm'],
    target: '나만의 표정을 원하는 분 · 특별한 선물',
    howToUse: '거품망이나 손으로 충분한 거품을 낸 뒤 온몸에 사용하고 물로 헹궈주세요.',
    storage: '사용 후 실리콘 루프로 걸어두거나 배수 홀더에 올려 물기가 빠지도록 보관하세요.',
    refillable: false,
    situations: ['home', 'gift', 'custom'],
  },

  // ============================================================
  // MINI BAR
  // ============================================================
  {
    id: 'mini-lavender',
    slug: 'lavender-mini-bar',
    name: 'Lavender Mini Bar',
    category: 'mini-bar',
    mood: 'rest',
    price: 3900,
    tier: 'entry',
    emoji: '😴',
    shortDesc: '여행에 편안함을.',
    description: 'Lavender Body Bar의 여행용 미니 사이즈. 2-3박 여행에 딱 맞는 크기.',
    scent: 'Lavender · Sage',
    situations: ['travel', 'swim', 'gym', 'camp'],
  },
  {
    id: 'mini-citrus',
    slug: 'citrus-mini-bar',
    name: 'Citrus Mini Bar',
    category: 'mini-bar',
    mood: 'fresh',
    price: 3900,
    tier: 'entry',
    emoji: '😆',
    shortDesc: '여행에 상쾌함을.',
    description: 'Citrus Body Bar의 여행용 미니 사이즈. 가벼운 출발을 위한 산뜻한 향.',
    scent: 'Citrus · Bergamot',
    situations: ['travel', 'swim', 'gym', 'camp'],
  },
  {
    id: 'mini-oat',
    slug: 'oat-mini-bar',
    name: 'Oat Mini Bar',
    category: 'mini-bar',
    mood: 'soft',
    price: 3900,
    tier: 'entry',
    emoji: '◡',
    shortDesc: '여행에 보습을.',
    description: 'Oat Body Bar의 여행용 미니 사이즈. 건조한 숙소에서도 편안하게.',
    scent: 'Mild Oat',
    situations: ['travel', 'swim', 'gym', 'camp'],
  },
  {
    id: 'mini-herb',
    slug: 'herb-mini-bar',
    name: 'Herb Mini Bar',
    category: 'mini-bar',
    mood: 'clean',
    price: 3900,
    tier: 'entry',
    emoji: '🌿',
    shortDesc: '여행에 산뜻함을.',
    description: 'Herb Body Bar의 여행용 미니 사이즈. 활동 후 시원한 세정.',
    scent: 'Herb · Mint',
    situations: ['travel', 'swim', 'gym', 'camp'],
  },
  {
    id: 'mini-3set',
    slug: 'mini-3-set',
    name: 'Mini 3 Set',
    category: 'mini-bar',
    price: 9900,
    tier: 'bundle',
    emoji: '🎒',
    shortDesc: '기분 따라 고르는 3종 세트.',
    description: 'Lavender · Citrus · Oat 미니바 3종 세트. 기분과 상황에 따라 골라 쓰는 여행용 구성.',
    situations: ['travel', 'swim', 'gift'],
  },
  {
    id: 'mini-family-set',
    slug: 'mini-family-set',
    name: 'Mini Family Set',
    category: 'mini-bar',
    price: 14900,
    tier: 'bundle',
    emoji: '👨‍👩‍👧',
    shortDesc: '가족 여행용 미니 세트.',
    description: '예민 가족 각자의 표정과 향을 담은 가족 여행용 미니바 세트.',
    situations: ['travel', 'family'],
  },

  // ============================================================
  // BATH TOOLS
  // ============================================================
  {
    id: 'tool-loop',
    slug: 'silicone-loop',
    name: 'Silicone Loop',
    category: 'bath-tools',
    price: 4900,
    emoji: '🪢',
    shortDesc: '비누를 걸어두는 실리콘 루프.',
    description:
      '비누에 끼워 욕실에 걸어두는 실리콘 루프. 젖은 비누가 물러지지 않게 하고, 항상 건조한 상태로 보관. 손목에 걸고 사용할 수도 있습니다.',
    howToUse: '비누에 루프를 통과시켜 걸고, 사용 후 욕실 후크에 걸어두세요.',
    storage: '실리콘 소재로 물에 강합니다. 주기적으로 헹궈 말려주세요.',
  },
  {
    id: 'tool-brush',
    slug: 'shampoo-brush',
    name: 'Shampoo Brush',
    category: 'bath-tools',
    price: 8900,
    emoji: '🪮',
    shortDesc: '두피 마사지와 바디바 결합.',
    description:
      '바디바를 끼워 사용하는 샴푸브러시. 두피를 자극해 마사지하면서 거품을 내고, 손에 쥐기 편한 구조. 비누의 미끄러짐을 방지합니다.',
    howToUse: '홀더에 바디바를 끼워 머리와 몸에 사용하세요. 두피를 부드럽게 문질러 주세요.',
    storage: '사용 후 물기를 털어 통풍이 잘 되는 곳에 보관하세요.',
  },
  {
    id: 'tool-foam',
    slug: 'foam-net',
    name: 'Foam Net',
    category: 'bath-tools',
    price: 2900,
    emoji: '🫧',
    shortDesc: '풍성한 거품을 내는 거품망.',
    description: '바디바에 문질러 풍성한 거품을 내는 거품망. 건조용 스트랩이 있어 사용 후 걸어 말릴 수 있습니다.',
    howToUse: '바디바를 거품망에 넣고 물을 적셔 문지르면 풍성한 거품이 일어납니다.',
    storage: '사용 후 스트랩으로 걸어 말려주세요.',
  },
  {
    id: 'tool-holder',
    slug: 'soap-holder',
    name: 'Soap Holder',
    category: 'bath-tools',
    price: 6900,
    emoji: '🟫',
    shortDesc: '배수 구조의 비누 홀더.',
    description:
      '물이 빠지고 공기가 통하는 배수 구조의 비누 홀더. 리필 결합이 가능해 바디바만 교체하며 오래 사용. 미끄럼 방지 바닥.',
    howToUse: '욕실 선반이나 바닥에 올려 비누를 얹으세요. 배수구로 물이 빠집니다.',
    storage: '주기적으로 헹궈 청소해 주세요.',
    refillable: true,
  },

  // ============================================================
  // TRAVEL & SWIM
  // ============================================================
  {
    id: 'travel-case',
    slug: 'drain-soap-case',
    name: 'Drain Soap Case',
    category: 'travel-swim',
    price: 5900,
    emoji: '🧴',
    shortDesc: '젖은 비누도 깔끔하게 보관.',
    description:
      '배수와 통풍이 되는 휴대용 비누 케이스. 여행과 수영장에서 젖은 비누를 물렁거리지 않게 보관. 미니바 사이즈에 맞습니다.',
    situations: ['travel', 'swim', 'gym', 'camp'],
  },
  {
    id: 'travel-bag',
    slug: 'bath-bag',
    name: 'Ventilated Bath Bag',
    category: 'travel-swim',
    price: 9900,
    emoji: '👜',
    shortDesc: '통풍되는 분리 수납 목욕가방.',
    description:
      '수영장과 헬스장 샤워용 통풍 목욕가방. 젖은 용품과 마른 용품을 분리 수납하고 공기가 통해 빠르게 마릅니다.',
    situations: ['swim', 'gym', 'travel'],
  },
  {
    id: 'travel-pouch',
    slug: 'travel-pouch',
    name: 'Travel Pouch',
    category: 'travel-swim',
    price: 6900,
    emoji: '👛',
    shortDesc: '가볍게 챙기는 여행 파우치.',
    description: '미니바와 액세서리를 가볍게 챙기는 크래프트 여행 파우치. 액체 없이 세면가방을 꾸릴 수 있습니다.',
    situations: ['travel', 'camp'],
  },
  {
    id: 'travel-hairbrush',
    slug: 'travel-hair-brush',
    name: 'Travel Hair Brush',
    category: 'travel-swim',
    price: 7900,
    emoji: '💆',
    shortDesc: '수영장 후 머리결 케어.',
    description: '수영장 염소와 땀으로 뻣뻣해진 머리결을 부드럽게 빗어주는 휴대용 헤어브러시.',
    situations: ['swim', 'travel'],
  },
  {
    id: 'travel-kit',
    slug: 'travel-bath-kit',
    name: 'Travel Bath Kit',
    category: 'travel-swim',
    price: 24000,
    tier: 'bundle',
    emoji: '🧳',
    shortDesc: '미니바 + 거품망 + 케이스 + 파우치.',
    description:
      '여행과 수영장에 필요한 구성을 한 세트로. Mini 3 Set + 거품망 + 배수 케이스 + 여행 파우치. 액체 없이 가볍게 떠나는 여행.',
    situations: ['travel', 'swim', 'gift'],
  },

  // ============================================================
  // SET & GIFT
  // ============================================================
  {
    id: 'set-family',
    slug: 'family-set',
    name: 'Family Set',
    category: 'set-gift',
    price: 29000,
    tier: 'bundle',
    emoji: '👨‍👩‍👧',
    shortDesc: '온가족 각자의 표정 세트.',
    description:
      '민감피부 당사자부터 가족까지 함께 사용하는 바디바 세트. 각자의 표정과 향을 선택할 수 있고, 홀더와 거품망이 함께 구성됩니다.',
    situations: ['home', 'family', 'gift'],
  },
  {
    id: 'set-kids',
    slug: 'kids-set',
    name: 'Kids Set',
    category: 'set-gift',
    price: 19000,
    tier: 'bundle',
    emoji: '🧒',
    shortDesc: '스스로 씻는 재미를.',
    description:
      '씻기 싫어하는 아이를 위한 세트. 얼굴 표정이 있는 바디바와 거품망, 표정 스티커로 스스로 씻는 재미를 익히도록 돕습니다.',
    situations: ['home', 'family'],
  },
  {
    id: 'set-travel',
    slug: 'travel-set-gift',
    name: 'Travel Set',
    category: 'set-gift',
    price: 24000,
    tier: 'bundle',
    emoji: '✈️',
    shortDesc: '여행 좋아하는 사람에게.',
    description: '여행을 좋아하는 사람을 위한 미니 세트. 작게 챙기고 기분대로 고르는 구성.',
    situations: ['travel', 'gift'],
  },
  {
    id: 'set-custom',
    slug: 'custom-gift-set',
    name: 'Custom Gift Set',
    category: 'set-gift',
    price: 21000,
    tier: 'bundle',
    emoji: '🎁',
    shortDesc: '세상에 하나뿐인 표정 선물.',
    description: '직접 고른 표정의 커스텀 바디바와 메시지 카드, 크래프트 패키지로 구성된 선물 세트.',
    situations: ['gift', 'custom'],
  },
  {
    id: 'set-seasonal',
    slug: 'seasonal-gift-set',
    name: 'Seasonal Gift Set',
    category: 'set-gift',
    price: 26000,
    tier: 'bundle',
    emoji: '🎀',
    shortDesc: '시즌 한정 선물 세트.',
    description: '설 · 어린이날 · 가정의 달 · 추석 · 크리스마스 등 시즌 한정으로 선물하는 바디바 세트.',
    situations: ['gift', 'seasonal'],
  },

  // ============================================================
  // REFILL
  // ============================================================
  {
    id: 'refill-lavender',
    slug: 'lavender-refill',
    name: 'Lavender Refill',
    category: 'body-bar',
    mood: 'rest',
    price: 7900,
    emoji: '🔄',
    shortDesc: 'Lavender 바디바 리필.',
    description: 'Lavender Body Bar 리필용. 홀더와 케이스는 오래 사용하고 바디바만 다시 채우세요.',
    refillable: true,
    situations: ['home', 'refill'],
  },
  {
    id: 'refill-citrus',
    slug: 'citrus-refill',
    name: 'Citrus Refill',
    category: 'body-bar',
    mood: 'fresh',
    price: 7900,
    emoji: '🔄',
    shortDesc: 'Citrus 바디바 리필.',
    description: 'Citrus Body Bar 리필용. 홀더와 케이스는 오래 사용하고 바디바만 다시 채우세요.',
    refillable: true,
    situations: ['home', 'refill'],
  },
  {
    id: 'refill-oat',
    slug: 'oat-refill',
    name: 'Oat Refill',
    category: 'body-bar',
    mood: 'soft',
    price: 7900,
    emoji: '🔄',
    shortDesc: 'Oat 바디바 리필.',
    description: 'Oat Body Bar 리필용. 홀더와 케이스는 오래 사용하고 바디바만 다시 채우세요.',
    refillable: true,
    situations: ['home', 'refill'],
  },
  {
    id: 'refill-herb',
    slug: 'herb-refill',
    name: 'Herb Refill',
    category: 'body-bar',
    mood: 'clean',
    price: 7900,
    emoji: '🔄',
    shortDesc: 'Herb 바디바 리필.',
    description: 'Herb Body Bar 리필용. 홀더와 케이스는 오래 사용하고 바디바만 다시 채우세요.',
    refillable: true,
    situations: ['home', 'refill'],
  },
];

// ============================================================
// 헬퍼 함수
// ============================================================
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductsByMood(mood: Mood): Product[] {
  return PRODUCTS.filter((p) => p.mood === mood);
}

export function getProductsBySituation(situation: string): Product[] {
  return PRODUCTS.filter((p) => p.situations?.includes(situation));
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR');
}
