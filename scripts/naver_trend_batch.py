"""
네이버 API HUB로 카테고리별 시장조사 데이터 수집 (배치 처리)
"""
import os
import json
import requests
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv

# 루트 .env 하나로 통일
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "")

API_HUB_ENDPOINT = "https://naverapihub.apigw.ntruss.com/search-trend/v1/search"


def get_search_trend(keywords, start_date, end_date, time_unit="month"):
    """네이버 검색트렌드 조회"""
    url = API_HUB_ENDPOINT
    headers = {
        "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
        "Content-Type": "application/json"
    }

    keyword_groups = [
        {"groupName": name, "keywords": kws}
        for name, kws in keywords.items()
    ]

    data = {
        "startDate": start_date,
        "endDate": end_date,
        "timeUnit": time_unit,
        "keywordGroups": keyword_groups
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()


def get_10year_trend(keywords, category_name):
    """10년 트렌드 조회"""
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365*10)
    return get_search_trend(
        keywords,
        start_date.strftime("%Y-%m-%d"),
        end_date.strftime("%Y-%m-%d"),
        "month"
    )


def save_trend_data(data, filename):
    """트렌드 데이터 저장"""
    os.makedirs("/Volumes/MINIY/중랑/data", exist_ok=True)
    filepath = f"/Volumes/MINIY/중랑/data/{filename}"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ 저장 완료: {filename}")


if __name__ == "__main__":
    # 카테고리별 키워드 (각각 개별 요청)
    categories = {
        "샴푸바": ["샴푸바", "고체샴푸", "클렌징바"],
        "바디바": ["바디바", "바디워시바", "고체바디워시"],
        "치마": ["치마", "롱치마", "미니치마"],
        "스커트": ["스커트", "롱스커트", "플리츠스커트"],
        "원피스": ["원피스", "여름원피스", "빅사이즈원피스"],
        "휴양지원피스": ["휴양지원피스", "비치원피스", "리조트원피스"],
        "바디케어": ["바디케어", "바디로션", "바디오일", "바디스크럽"],
    }

    print("🔍 카테고리별 10년 트렌드 조회 시작...")

    all_results = {}
    success_count = 0
    fail_count = 0

    for category_name, keywords in categories.items():
        try:
            print(f"\n📊 {category_name} 조회 중...")
            result = get_10year_trend({category_name: keywords}, category_name)
            all_results[category_name] = result
            save_trend_data(result, f"naver_trend_{category_name}.json")
            success_count += 1
            print(f"   ✅ {category_name} 완료")

        except Exception as e:
            print(f"   ❌ {category_name} 실패: {e}")
            fail_count += 1

    # 전체 통합 데이터 저장
    combined_data = {
        "startDate": (datetime.now() - timedelta(days=365*10)).strftime("%Y-%m-%d"),
        "endDate": datetime.now().strftime("%Y-%m-%d"),
        "categories": all_results
    }
    save_trend_data(combined_data, "naver_trend_all_categories_combined.json")

    print(f"\n🎉 데이터 수집 완료!")
    print(f"   성공: {success_count}, 실패: {fail_count}")
