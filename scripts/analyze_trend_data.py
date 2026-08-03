"""
수집된 트렌드 데이터 분석 스크립트
"""
import json
import os
from datetime import datetime
from collections import defaultdict

def load_trend_data(filename):
    """트렌드 데이터 로드"""
    filepath = f"/Volumes/MINIY/중랑/data/{filename}"
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def _drop_incomplete_month(trend_data):
    """현재 진행 중인(미완성) 당월 데이터를 제외.

    검색트렌드 ratio는 월 전체 기준이므로 당월은 부분 집계라 왜곡됨.
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

def analyze_category_trend(category_name):
    """카테고리별 트렌드 분석"""
    try:
        data = load_trend_data(f"naver_trend_{category_name}.json")
    except:
        return None

    if not data.get("results"):
        return None

    result = data["results"][0]
    title = result["title"]
    keywords = result["keywords"]
    trend_data = _drop_incomplete_month(result["data"])

    # 기본 통계
    ratios = [d["ratio"] for d in trend_data]
    latest_ratio = ratios[-1]
    max_ratio = max(ratios)
    min_ratio = min(ratios)

    # 성장률 계산 (최근 1년 vs 이전 1년)
    recent_12 = ratios[-12:] if len(ratios) >= 24 else ratios[-len(ratios)//2:]
    previous_12 = ratios[-24:-12] if len(ratios) >= 24 else ratios[:len(ratios)//2]

    if recent_12 and previous_12:
        avg_recent = sum(recent_12) / len(recent_12)
        avg_previous = sum(previous_12) / len(previous_12)
        growth_rate = ((avg_recent - avg_previous) / avg_previous * 100) if avg_previous > 0 else 0
    else:
        growth_rate = 0

    # 최고/최저 시점
    max_data = max(trend_data, key=lambda x: x["ratio"])
    min_data = min(trend_data, key=lambda x: x["ratio"])

    return {
        "category": category_name,
        "title": title,
        "keywords": keywords,
        "latest_ratio": latest_ratio,
        "max_ratio": max_ratio,
        "min_ratio": min_ratio,
        "growth_rate": growth_rate,
        "peak_period": max_data["period"],
        "low_period": min_data["period"],
        "data_points": len(trend_data)
    }

def generate_report():
    """전체 분석 리포트 생성"""
    categories = ["샴푸바", "바디바", "치마", "스커트", "원피스", "휴양지원피스"]

    print("📊 카테고리별 트렌드 분석")
    print("=" * 80)

    all_results = []
    for category in categories:
        analysis = analyze_category_trend(category)
        if analysis:
            all_results.append(analysis)
            print(f"\n[{category}]")
            print(f"  키워드: {', '.join(analysis['keywords'])}")
            print(f"  최근 지수: {analysis['latest_ratio']:.2f}")
            print(f"  최고 지수: {analysis['max_ratio']:.2f} ({analysis['peak_period']})")
            print(f"  최저 지수: {analysis['min_ratio']:.2f} ({analysis['low_period']})")
            print(f"  성장률: {analysis['growth_rate']:+.1f}%")

    # 정렬: 성장률 기준
    print("\n" + "=" * 80)
    print("📈 성장률 순위")
    sorted_results = sorted(all_results, key=lambda x: x["growth_rate"], reverse=True)
    for i, r in enumerate(sorted_results, 1):
        status = "🟢" if r["growth_rate"] > 0 else "🔴"
        print(f"  {i}. {status} {r['category']}: {r['growth_rate']:+.1f}%")

    # 정렬: 최근 검색량 기준
    print("\n" + "=" * 80)
    print("🔍 최근 검색량 순위")
    sorted_by_latest = sorted(all_results, key=lambda x: x["latest_ratio"], reverse=True)
    for i, r in enumerate(sorted_by_latest, 1):
        print(f"  {i}. {r['category']}: {r['latest_ratio']:.2f}")

    return all_results

if __name__ == "__main__":
    results = generate_report()

    # 결과 저장
    os.makedirs("/Volumes/MINIY/중랑/analysis", exist_ok=True)
    with open("/Volumes/MINIY/중랑/analysis/trend_analysis_summary.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("\n✅ 분석 결과 저장 완료: analysis/trend_analysis_summary.json")
