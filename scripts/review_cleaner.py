"""
경쟁사 리뷰 클렌징 · 분석 도구
================================
수집한 원본 리뷰 텍스트에서 광고성/이벤트/체험단 리뷰를 제거하고,
중복·노이즈를 정리한 뒤 긍정/부정 감성, 토픽, 키워드 빈도를 분석한다.

사용법
------
    python3 review_cleaner.py 입력파일.txt [옵션]

옵션
----
    --min-len N      N자 미만 리뷰 제외 (기본 10)
    --out 접미사     결과 파일 접미사 (기본 "cleaned")
    --no-event       이벤트/체험단 리뷰 제거 안 함

입력 파일 형식
-------------
리뷰 하나를 한 줄에 작성. 아래처럼 별점과 함께 적으면 별점 분포도 함께 분석한다.

    5점, 거품이 풍성하고 향이 너무 좋아요 재구매합니다
    3점, 향은 좋은데 보습이 좀 아쉬워요
"""
import sys
import os
import re
import argparse
import collections

# ──────────────────────────────────────────────
# 1. 클렌징 규칙
# ──────────────────────────────────────────────

# 1-1) 광고성 / 이벤트 / 체험단 리뷰 판별 키워드
#   해당 키워드가 포함되면 리뷰에서 제거한다 (가짜 리뷰 1순위)
EVENT_PATTERNS = [
    '체험단', '서포터즈', '새싹에디터', '제품을 제공', '제공받아', '제공 받아',
    '협찬', '구매후기 이벤트', '구매후기이벤트', '리뷰 이벤트', '이벤트 참여',
    '리뷰 작성하고', '작성하고 받', '리뷰만 작성', '무료로 받', '무료제공',
    '쿠폰 받', '추가 적립', '한 달 사용', '한달 사용 후',
]

# 1-2) 노이즈 키워드 (상품 본질과 무관한 리뷰 → 제거)
#   배송/포장/단순 반응성 리뷰는 상품 평가에 노이즈
NOISE_PATTERNS = [
    '배송 빨라', '배송 빠르', '배송 하루', '로켓배송', '쿠팡맨', '포장 꼼꼼',
    '포장 잘', '빠른 배송', '다음날 도착',
]

# 1-3) 극단 의심 패턴 (짧고 반복적인 5점 리뷰는 별도 플래그)
SUSPICIOUS_SHORT_LEN = 15  # 이 길이 미만 5점 리뷰는 "의심 리뷰"로 플래그

# ──────────────────────────────────────────────
# 2. 감성 분석 사전 (뷰티 · 패션 리뷰용)
# ──────────────────────────────────────────────

POSITIVE_WORDS = [
    '좋아요', '좋아', '만족', '재구매', '추천', '편해요', '편안', '부드러',
    '순해요', '자극없', '시원해', '향 좋', '향기', '보습', '촉촉', '산뜻',
    '개운', '예뻐', '예쁘', '이뻐', '잘어울려', '사이즈 좋', '사이즈 딱',
    '넉넉', '가성비', '퀄리티', '고급스', '깔끔', '세정력', '거품', '오래 사용',
    '건조하지', '트러블 없', '민감피부', '안심', '세련', '날씬', '슬림', '정말 좋',
    '대박', '최고', '인생템',
]

NEGATIVE_WORDS = [
    '별로', '아쉽', '아깝', '실망', '비침', '물빠짐', '냄새', '자극', '트러블',
    '건조', '떡짐', '안녹', '부서', '깨지', '갈라', '보풀', '변형', '줄어들',
    '늘어나', '작아요', '작게', '크게 나', '배 나', '팔뚝', '뚱뚱', '비싸',
    '가격 대비', '후회', '못 입', '사이즈 애매', '핏 별로', '목 쓸리', '암홀',
    '뒷트임', '화학', '알레르기', '가려', '따갑', '소름', '비린내',
]

# 2-1) 토픽 분류 키워드
TOPIC_WORDS = {
    '성분·효능': ['성분', '세정력', '거품', '보습', '두피', '모발', '트러블', '민감', '비건', '천연', '숙성', '약산성'],
    '향': ['향', '냄새', '향기', '라벤더', '시트러스', '허브', '유자'],
    '사이즈·핏': ['사이즈', '핏', '기장', '길이', '허리', '밴딩', '엉덩이', '통통', '체형', '빅사이즈'],
    '가격': ['가격', '가성비', '비싸', '저렴', '할인', '단가', '가격대'],
    '배송·포장': ['배송', '포장', '박스', '로켓'],
    '사용감·스타일': ['편안', '부드러', '가볍', '시원', '예쁘', '스타일', '코디', '데이트', '하객', '오피스', '휴양지', '여행'],
}

# ──────────────────────────────────────────────
# 3. 클렌징 함수
# ──────────────────────────────────────────────

def normalize(text: str) -> str:
    """공백·특수문자 정규화 (중복 제거용)."""
    text = re.sub(r'[,.!?~“”"\'·\s]+', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()


def is_event_review(text: str) -> bool:
    return any(p in text for p in EVENT_PATTERNS)


def is_noise_review(text: str) -> bool:
    return any(p in text for p in NOISE_PATTERNS)


def parse_star(text: str):
    """'5점, ...' 형태에서 별점 추출. 없으면 None."""
    m = re.match(r'^\s*([1-5])\s*[점개,]?', text)
    if m:
        return int(m.group(1))
    return None


def clean_reviews(lines):
    """리뷰 목록을 클렌징한다."""
    stats = {'전체': 0, '이벤트·체험단 제거': 0, '노이즈 제거': 0, '중복 제거': 0,
             '짧은 리뷰 제거': 0, '의심 리뷰(짧은 5점)': 0, '유효 리뷰': 0}
    cleaned, dup_check, suspicious = [], set(), []

    for raw in lines:
        raw = raw.strip()
        if not raw:
            continue
        stats['전체'] += 1

        if is_event_review(raw):
            stats['이벤트·체험단 제거'] += 1
            continue
        if is_noise_review(raw):
            stats['노이즈 제거'] += 1
            continue

        norm = normalize(raw)
        if norm in dup_check:          # 중복 리뷰
            stats['중복 제거'] += 1
            continue
        dup_check.add(norm)

        if len(norm) < args.min_len:   # 짧은 리뷰
            stats['짧은 리뷰 제거'] += 1
            continue

        star = parse_star(raw)
        if star == 5 and len(norm) < SUSPICIOUS_SHORT_LEN:
            # 짧은 5점 리뷰 — 광고성 가능성 높음, 별도 리스트로 분리 (제거는 아님)
            stats['의심 리뷰(짧은 5점)'] += 1
            suspicious.append(raw)
            continue

        cleaned.append(raw)

    stats['유효 리뷰'] = len(cleaned)
    return cleaned, suspicious, stats


# ──────────────────────────────────────────────
# 4. 분석 함수
# ──────────────────────────────────────────────

def analyze_reviews(reviews):
    """클렌징된 리뷰에서 감성·토픽·키워드를 분석한다."""
    report = collections.OrderedDict()

    # 별점 분포
    stars = [parse_star(r) for r in reviews]
    stars = [s for s in stars if s]
    if stars:
        report['별점 분포'] = dict(collections.Counter(stars))

    # 감성 점수
    pos_hits, neg_hits = [], []
    for r in reviews:
        pos = [w for w in POSITIVE_WORDS if w in r]
        neg = [w for w in NEGATIVE_WORDS if w in r]
        if pos:
            pos_hits.extend(pos)
        if neg:
            neg_hits.extend(neg)
    pos_cnt, neg_cnt = len(pos_hits), len(neg_hits)
    total = pos_cnt + neg_cnt
    report['긍정 리뷰 키워드 등장'] = pos_cnt
    report['부정 리뷰 키워드 등장'] = neg_cnt
    report['긍정 비율'] = f"{pos_cnt / total * 100:.1f}%" if total else "0%"

    # 상위 키워드
    report['긍정 키워드 TOP'] = collections.Counter(pos_hits).most_common(10)
    report['부정 키워드 TOP'] = collections.Counter(neg_hits).most_common(10)

    # 토픽 분류
    topic_counter = collections.Counter()
    for r in reviews:
        matched = set()
        for topic, words in TOPIC_WORDS.items():
            if any(w in r for w in words):
                matched.add(topic)
        for t in matched:
            topic_counter[t] += 1
    report['토픽 분포'] = topic_counter.most_common()

    return report


def print_report(report):
    print("=" * 50)
    print("📊 리뷰 분석 보고서")
    print("=" * 50)
    for key, val in report.items():
        print(f"\n■ {key}")
        if isinstance(val, dict):
            for k, v in val.items():
                print(f"   {k}: {v}")
        elif isinstance(val, list):
            for k, v in val:
                print(f"   {k}: {v}회")
        else:
            print(f"   {val}")


# ──────────────────────────────────────────────
# 5. 실행
# ──────────────────────────────────────────────

def main():
    global args
    ap = argparse.ArgumentParser(description="경쟁사 리뷰 클렌징·분석 도구")
    ap.add_argument('input', help='입력 리뷰 파일 (리뷰 1줄 = 1건)')
    ap.add_argument('--min-len', type=int, default=10, help='N자 미만 리뷰 제외 (기본 10)')
    ap.add_argument('--out', default='cleaned', help='결과 파일 접미사 (기본 cleaned)')
    args = ap.parse_args()

    if not os.path.exists(args.input):
        print(f"❌ 파일 없음: {args.input}")
        sys.exit(1)

    with open(args.input, encoding='utf-8') as f:
        lines = f.readlines()

    cleaned, suspicious, stats = clean_reviews(lines)

    print("🧹 클렌징 결과")
    print("-" * 50)
    for k, v in stats.items():
        print(f"   {k}: {v}")

    if suspicious:
        print("\n⚠️ 의심 리뷰 (짧은 5점, 광고성 가능성 — 별도 확인 필요)")
        print("-" * 50)
        for s in suspicious[:10]:
            print(f"   · {s[:60]}")

    if not cleaned:
        print("\n❌ 유효 리뷰가 없습니다.")
        sys.exit(1)

    # 결과 저장
    base, _ = os.path.splitext(args.input)
    out_clean = f"{base}_{args.out}.txt"
    with open(out_clean, 'w', encoding='utf-8') as f:
        f.write("\n".join(cleaned))
    print(f"\n✅ 클렌징된 리뷰 저장: {out_clean} ({len(cleaned)}건)")

    # 분석
    report = analyze_reviews(cleaned)
    print_report(report)


if __name__ == '__main__':
    main()
