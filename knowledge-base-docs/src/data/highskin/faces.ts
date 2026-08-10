/**
 * HI-SKIN 표정 데이터
 *
 * 6가지 기본 표정 (음각 바디바에 새겨지는 표정)
 */

export type Face = {
  id: string;
  name: string; // 영문
  kr: string; // 국문
  emoji: string;
  desc: string;
};

export const FACES: Face[] = [
  {
    id: 'smile',
    name: 'Smile',
    kr: '미소',
    emoji: '☺',
    desc: '평온하고 기분 좋은 날',
  },
  {
    id: 'wink',
    name: 'Wink',
    kr: '윙크',
    emoji: '😉',
    desc: '장난스럽고 가벼운 날',
  },
  {
    id: 'sleepy',
    name: 'Sleepy',
    kr: '졸림',
    emoji: '😴',
    desc: '하루를 편안하게 마무리',
  },
  {
    id: 'love',
    name: 'Love',
    kr: '하트',
    emoji: '♡',
    desc: '스스로에게 다정한 날',
  },
  {
    id: 'happy',
    name: 'Happy',
    kr: '활짝',
    emoji: '😆',
    desc: '활기차고 즐거운 날',
  },
  {
    id: 'calm',
    name: 'Calm',
    kr: '편안',
    emoji: '◡',
    desc: '조용하고 차분한 날',
  },
];

export function getFaceById(id: string): Face | undefined {
  return FACES.find((f) => f.id === id);
}

/**
 * 커스텀 페이스 빌더 파츠
 * 눈(4) × 코(3) × 입(4) = 48조합
 */
export type FaceParts = {
  eyes: string;
  nose: string;
  mouth: string;
};

export const EYES_OPTIONS = [
  {id: 'dot', label: '동그란 눈', char: '• •'},
  {id: 'arc', label: '초승달 눈', char: '⌣ ⌣'},
  {id: 'star', label: '반짝이 눈', char: '✦ ✦'},
  {id: 'line', label: '가로줄 눈', char: '— —'},
];

export const NOSE_OPTIONS = [
  {id: 'dot', label: '점 코', char: '·'},
  {id: 'triangle', label: '세모 코', char: '▽'},
  {id: 'none', label: '코 없음', char: ''},
];

export const MOUTH_OPTIONS = [
  {id: 'smile', label: '미소 입', char: '⌣'},
  {id: 'open', label: '벌린 입', char: '○'},
  {id: 'kiss', label: '하트 입', char: '♡'},
  {id: 'flat', label: '가로 입', char: '—'},
];
