#!/usr/bin/env python3
"""
쇼핑인사이트 데이터 분석
"""
import json
from pathlib import Path
from datetime import datetime

DATA_DIR = Path("/Volumes/MINIY/중랑/data")

CATEGORIES = ["샴푸바", "바디바", "치마", "스커트", "원피스"]


def _complete_months(trend_data):
    """현재 진행 중인(미완성) 월을 제외한 완성된 월 데이터만 반환.

    쇼핑인사이트 ratio는 월 전체 기준이므로, 당월 데이터는 부분 집계라 왜곡됨.
    마지막 period의 연월이 오늘 연월과 같으면 그 포인트를 제외.
    """
    if not trend_data:
        return trend_data
    today = datetime.now()
    last = trend_data[-1]
    try:
        last_dt = datetime.strptime(last["period"][:7], "%Y-%m")
    except (ValueError, KeyError):
        return trend_data
    if last_dt.year == today.year and last_dt.month == today.month:
        return trend_data[:-1]
    return trend_data

def analyze_shopping_insight():
    """쇼핑인사이트 데이터 분석"""
    print("=" * 60)
    print("📊 쇼핑인사이트 데이터 분석")
    print("=" * 60)

    all_data = {}

    # 각 카테고리 데이터 로드
    for category in CATEGORIES:
        file_path = DATA_DIR / f"shopping_insight_{category}.json"
        if file_path.exists():
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                all_data[category] = data
                print(f"\n✅ {category}: {len(data['results'][0]['data'])}개월 데이터")
        else:
            print(f"\n⚠️  {category}: 파일 없음")

    # 트렌드 분석
    print("\n" + "=" * 60)
    print("📈 최근 1년 트렌드 (2025-08 ~ 2026-08)")
    print("=" * 60)

    for category, data in all_data.items():
        result = data["results"][0]
        trend_data = _complete_months(result["data"])

        # 최근 12개월 데이터 (완성된 월 기준)
        recent_12 = trend_data[-12:]

        # 첫 달과 마지막 달 비교
        first_ratio = recent_12[0]["ratio"]
        last_ratio = recent_12[-1]["ratio"]
        change = ((last_ratio - first_ratio) / first_ratio * 100) if first_ratio > 0 else 0

        # 최대값
        max_ratio = max(d["ratio"] for d in trend_data)
        max_period = next(d["period"] for d in trend_data if d["ratio"] == max_ratio)

        print(f"\n🔍 {category}")
        print(f"   최근 12개월 변화: {first_ratio:.4f} → {last_ratio:.4f} ({change:+.1f}%)")
        print(f"   역대 최고점: {max_ratio:.4f} ({max_period})")

    # 전체 카테고리 비교
    print("\n" + "=" * 60)
    print("📊 카테고리별 최근 검색량 순위 (최근 3개월 평균)")
    print("=" * 60)

    recent_avg = {}
    for category, data in all_data.items():
        trend_data = _complete_months(data["results"][0]["data"])
        recent_3 = trend_data[-3:]
        avg = sum(d["ratio"] for d in recent_3) / len(recent_3)
        recent_avg[category] = avg

    sorted_by_avg = sorted(recent_avg.items(), key=lambda x: x[1], reverse=True)

    for i, (category, avg) in enumerate(sorted_by_avg, 1):
        print(f"{i}. {category}: {avg:.4f}")

    # 성장률 분석 (YoY)
    print("\n" + "=" * 60)
    print("📈 연간 성장률 (YoY) 비교")
    print("=" * 60)

    yoy_growth = {}
    for category, data in all_data.items():
        trend_data = _complete_months(data["results"][0]["data"])

        # 1년 전 데이터와 현재 데이터 비교 (완성된 최근 월 기준)
        if len(trend_data) >= 13:
            current = trend_data[-1]["ratio"]
            last_year = trend_data[-13]["ratio"]
            yoy = ((current - last_year) / last_year * 100) if last_year > 0 else 0
            yoy_growth[category] = yoy

    sorted_by_yoy = sorted(yoy_growth.items(), key=lambda x: x[1], reverse=True)

    for i, (category, yoy) in enumerate(sorted_by_yoy, 1):
        icon = "📈" if yoy > 0 else "📉"
        print(f"{i}. {category}: {icon} {yoy:+.1f}%")

    # 분석 결과 저장
    analysis_result = {
        "timestamp": datetime.now().isoformat(),
        "recent_avg_rank": sorted_by_avg,
        "yoy_growth": sorted_by_yoy,
        "categories": list(all_data.keys())
    }

    result_file = DATA_DIR / "shopping_insight_analysis.json"
    with open(result_file, "w", encoding="utf-8") as f:
        json.dump(analysis_result, f, ensure_ascii=False, indent=2)

    print(f"\n📁 분석 결과 저장: {result_file.name}")

    return all_data, analysis_result

if __name__ == "__main__":
    analyze_shopping_insight()
