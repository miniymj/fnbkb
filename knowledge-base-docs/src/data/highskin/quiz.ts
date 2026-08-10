/**
 * HI-SKIN "나의 하이친구 찾기" 퀴즈 데이터
 *
 * 4-Step 인터랙션:
 *   Q1 누구와? → Q2 기분? → Q3 어디서? → Q4 표정?
 *
 * 결과는 Mood + Face 조합으로 추천 제품 반환.
 * 출처: highskin-picker-quiz.md, highskin-homepage-plan.md
 */

import type {Mood} from './products';
import {PRODUCTS, type Product} from './products';
import {FACES, type Face} from './faces';

export type QuizOption = {
  id: string;
  label: string;
  emoji?: string;
  /** 이 선택지가 가리키는 값 */
  value: string;
};

export type QuizStep = {
  id: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  /** 결과에 미치는 영향 */
  affects: 'target' | 'mood' | 'situation' | 'face';
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    id: 1,
    question: '누구와 사용하나요?',
    subtitle: '나만의 목욕인지, 가족과 함께인지 알려주세요.',
    affects: 'target',
    options: [
      {id: 'me', label: '나', emoji: '🙂', value: 'me'},
      {id: 'kids', label: '아이와 함께', emoji: '🧒', value: 'kids'},
      {id: 'family', label: '온가족', emoji: '👨‍👩‍👧', value: 'family'},
    ],
  },
  {
    id: 2,
    question: '오늘 기분은?',
    subtitle: '어떤 목욕이 필요한지 알려주세요.',
    affects: 'mood',
    options: [
      {id: 'rest', label: '편안하게', emoji: '😴', value: 'rest'},
      {id: 'fresh', label: '상쾌하게', emoji: '😆', value: 'fresh'},
      {id: 'soft', label: '부드럽게', emoji: '◡', value: 'soft'},
      {id: 'clean', label: '산뜻하게', emoji: '🌿', value: 'clean'},
    ],
  },
  {
    id: 3,
    question: '어디에서 사용하나요?',
    subtitle: '집인지, 이동 중인지 알려주세요.',
    affects: 'situation',
    options: [
      {id: 'home', label: '집', emoji: '🏠', value: 'home'},
      {id: 'travel', label: '여행', emoji: '✈️', value: 'travel'},
      {id: 'swim', label: '수영장', emoji: '🏊', value: 'swim'},
      {id: 'gym', label: '운동 후', emoji: '🏃', value: 'gym'},
    ],
  },
  {
    id: 4,
    question: '오늘 표정은?',
    subtitle: '오늘의 기분에 맞는 얼굴을 골라주세요.',
    affects: 'face',
    options: FACES.map((f) => ({
      id: f.id,
      label: f.kr,
      emoji: f.emoji,
      value: f.id,
    })),
  },
];

export type QuizAnswers = {
  target?: string;
  mood?: Mood;
  situation?: string;
  face?: string;
};

export type QuizResult = {
  mood: Mood;
  face: Face;
  /** 추천 메인 제품 */
  mainProduct: Product;
  /** 추천 보조 제품 (액세서리/세트) */
  accessory?: Product;
  /** 추천 여행/수영용품 (situation이 home이 아닐 때) */
  travelItem?: Product;
  /** 결과 한 줄 문장 */
  headline: string;
};

/**
 * 답변을 기반으로 결과 계산
 */
export function computeResult(answers: QuizAnswers): QuizResult {
  const mood = answers.mood ?? 'soft';
  const face = FACES.find((f) => f.id === answers.face) ?? FACES[0];

  // 메인 제품 — 상황이 travel/swim/gym이면 미니바 우선, 아니면 바디바
  let mainProduct: Product;
  if (answers.situation && answers.situation !== 'home') {
    // 미니바 중 해당 mood
    const mini = PRODUCTS.find(
      (p) => p.category === 'mini-bar' && p.mood === mood,
    );
    mainProduct = mini ?? PRODUCTS.find((p) => p.category === 'body-bar' && p.mood === mood)!;
  } else {
    const bar = PRODUCTS.find(
      (p) => p.category === 'body-bar' && p.mood === mood && !p.id.startsWith('refill'),
    );
    mainProduct = bar ?? PRODUCTS.find((p) => p.category === 'body-bar' && p.mood === mood)!;
  }

  // 보조 액세서리
  const accessory = PRODUCTS.find((p) => p.id === 'tool-foam');

  // 여행/수영 보조
  let travelItem: Product | undefined;
  if (answers.situation === 'travel' || answers.situation === 'swim') {
    travelItem = PRODUCTS.find((p) => p.id === 'travel-case');
  } else if (answers.situation === 'gym') {
    travelItem = PRODUCTS.find((p) => p.id === 'travel-bag');
  }

  // 헤드라인
  const faceName = face.kr;
  const headline = `오늘의 하이친구는 ${mainProduct.name.replace(' Body Bar', '').replace(' Mini Bar', '')} ${faceName} :)`;

  return {
    mood,
    face,
    mainProduct,
    accessory,
    travelItem,
    headline,
  };
}

export const MOOD_KR: Record<Mood, string> = {
  rest: '휴식',
  fresh: '상쾌',
  soft: '부드러움',
  clean: '산뜻',
};
