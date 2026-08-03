"""
네이버 검색트렌드 API로 전체 카테고리 시장조사 데이터 수집
"""
import os
import json
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

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


def get_10year_trend(keywords):
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
    # 전체 카테고리 키워드 설정
    all_keywords = {
        "샴푸바": ["샴푸바", "바디샴푸", "고체샴푸", "클렌징바"],
        "바디바": ["바디바", "바디워시바", "고체바디워시", "손비누"],
        "치마": ["치마", "롱치마", "미니치마", "플레어치마"],
        "스커트": ["스커트", "롱스커트", "미니스커트", "플리츠스커트"],
        "원피스": ["원피스", "여름원피스", "빅사이즈원피스", "휴양지원피스"],
        "바디케어": ["바디케어", "바디로션", "바디오일", "바디스크럽"]
    }

    print("🔍 전체 카테고리 10년 트렌드 조회 시작...")

    # 전체 카테고리 한번에 조회
    try:
        result = get_10year_trend(all_keywords)
        save_trend_data(result, "naver_trend_10year_all_categories.json")
        print("🎉 전체 카테고리 데이터 수집 완료!")

        # 결과 요약
        print("\n📊 수집된 카테고리:")
        for category in all_keywords.keys():
            print(f"   ✓ {category}")

    except Exception as e:
        print(f"❌ 오류: {e}")
