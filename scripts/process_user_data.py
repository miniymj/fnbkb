"""
사용자가 다운로드한 데이터 처리 파이프라인
연관검색어, 쇼핑인사이트 엑셀 파일 분석
"""
import json
import os
from pathlib import Path

def analyze_related_keywords(excel_file_path):
    """
    네이버 데이터랩 연관검색어 엑셀 분석
    당신이 다운로드한 파일 경로를 입력하세요
    """
    # 엑셀 파일 처리를 위한 라이브러리
    try:
        import pandas as pd
        df = pd.read_excel(excel_file_path)
        return df.to_dict(orient='records')
    except ImportError:
        print("pandas 설치 필요: pip3 install openpyxl")
        return None

def analyze_shopping_insights(excel_file_path):
    """
    쇼핑인사이트 업종 트렌드 엑셀 분석
    """
    try:
        import pandas as pd
        df = pd.read_excel(excel_file_path)
        return df.to_dict(orient='records')
    except ImportError:
        print("pandas 설치 필요: pip3 install openpyxl")
        return None

def generate_market_research_report(category, related_data=None, shopping_data=None, trend_data=None):
    """
    종합 시장조사 보고서 생성
    """
    report = {
        "category": category,
        "analysis_date": "2026-08-03",
        "data_sources": [],
        "findings": {}
    }

    if related_data:
        report["data_sources"].append("연관검색어")
        report["findings"]["related_keywords"] = analyze_keywords(related_data)

    if shopping_data:
        report["data_sources"].append("쇼핑인사이트")
        report["findings"]["shopping_insights"] = analyze_shopping(shopping_data)

    if trend_data:
        report["data_sources"].append("10년 트렌드")
        report["findings"]["trend_analysis"] = analyze_trends(trend_data)

    return report

def _series_ratios(data):
    """JSON/엑셀 결과에서 [{period, ratio}] 시계열을 추출.

    엑셀 to_dict 레코드 리스트 또는 네이버 API results 구조 모두 지원.
    """
    if isinstance(data, dict) and "results" in data:
        out = []
        for grp in data["results"]:
            out.extend(grp.get("data", []))
        return out
    if isinstance(data, list) and data and isinstance(data[0], dict):
        # period/ratio 키가 있으면 그대로 사용, 아니면 엑셀 레코드로 간주
        if "period" in data[0] and "ratio" in data[0]:
            return data
        # 엑셀: 컬럼명 매핑 시도 (period/월/날짜, ratio/비율/클릭률)
        def _row(r):
            period = r.get("period") or r.get("월") or r.get("날짜") or r.get("date")
            ratio = r.get("ratio") or r.get("비율") or r.get("클릭률") or r.get("value")
            return {"period": period, "ratio": ratio}
        return [_row(r) for r in data if r.get("period") or r.get("월") or r.get("날짜")]
    return []

def _growth_and_peak(series):
    """[{period, ratio}] -> 최근/이전 1년 비교 성장률 + 최고점."""
    pts = [(p["period"], float(p["ratio"])) for p in series
           if p.get("period") and p.get("ratio") is not None]
    if not pts:
        return None
    pts.sort(key=lambda x: x[0])
    peak_period, peak_ratio = max(pts, key=lambda x: x[1])
    latest = pts[-12:]
    previous = pts[-24:-12] if len(pts) >= 24 else pts[:12]
    latest_avg = sum(r for _, r in latest) / len(latest)
    previous_avg = (sum(r for _, r in previous) / len(previous)) if previous else latest_avg
    growth = ((latest_avg - previous_avg) / previous_avg * 100) if previous_avg else 0.0
    return {
        "data_points": len(pts),
        "peak_period": peak_period,
        "peak_ratio": round(peak_ratio, 2),
        "latest_ratio": round(latest[-1][1], 2) if latest else None,
        "latest_1yr_avg": round(latest_avg, 2),
        "growth_rate_pct": round(growth, 1),
    }

def analyze_keywords(data):
    """연관검색어 분석: 빈도/성장률/피크."""
    if isinstance(data, list) and data and isinstance(data[0], dict):
        # 엑셀 레코드인 경우 키워드 빈도 집계 시도
        kw_col = next((k for k in ("키워드", "연관검색어", "검색어", "keyword") if k in data[0]), None)
        if kw_col:
            from collections import Counter
            freq = Counter(r[kw_col] for r in data if r.get(kw_col))
            return {
                "data_points": len(data),
                "unique_keywords": len(freq),
                "top_keywords": freq.most_common(10),
            }
    series = _series_ratios(data)
    return _growth_and_peak(series) or {"status": "분석 불가 (데이터 형식 미일치)", "data_points": 0}

def analyze_shopping(data):
    """쇼핑인사이트 분석: 클릭량 시계열의 성장률/피크."""
    series = _series_ratios(data)
    return _growth_and_peak(series) or {"status": "분석 불가 (데이터 형식 미일치)", "data_points": 0}

def analyze_trends(data):
    """트렌드 분석: 10년 검색량의 성장률/피크/계절성."""
    series = _series_ratios(data)
    if not series:
        return {"status": "분석 불가 (데이터 형식 미일치)", "data_points": 0}
    base = _growth_and_peak(series)
    if not base:
        return {"status": "분석 불가", "data_points": 0}
    # 월별 계절성 (같은 월 평균 대비 최근 1년)
    from collections import defaultdict
    by_month = defaultdict(list)
    for p in series:
        if p.get("period"):
            by_month[p["period"][:7][-2:]].append(float(p["ratio"]))
    seasonal = {m: round(sum(v)/len(v), 2) for m, v in sorted(by_month.items())}
    base["seasonal_avg_by_month"] = seasonal
    return base

if __name__ == "__main__":
    print("📊 데이터 처리 파이프라인 준비 완료")
    print("\n당신이 다운로드한 파일을 아래 경로에 넣어주세요:")
    print("/Volumes/MINIY/중랑/data/user_downloaded/")
    print("\n예상 파일명:")
    print("  - 연관검색어_샴푸바.xlsx")
    print("  - 쇼핑인사이트_바디바.xlsx")
    print("  - 연관검색어_치마.xlsx")
    print("  - 쇼핑인사이트_원피스.xlsx")
