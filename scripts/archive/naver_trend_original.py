"""
네이버 검색트렌드 API (원본)로 전체 카테고리 시장조사
"""
import os
import json
import urllib.request
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "")

# 네이버 원본 검색트렌드 API
NAVER_TREND_URL = "https://openapi.naver.com/v1/datalab/search"


def get_search_trend(keywords, start_date, end_date, time_unit="month"):
    """네이버 검색트렌드 조회 (원본 API)"""
    keyword_groups = [
        {"groupName": name, "keywords": kws}
        for name, kws in keywords.items()
    ]

    payload = {
        "startDate": start_date,
        "endDate": end_date,
        "timeUnit": time_unit,
        "keywordGroups": keyword_groups
    }

    request = urllib.request.Request(NAVER_TREND_URL)
    request.add_header("X-Naver-Client-Id", NAVER_CLIENT_ID)
    request.add_header("X-Naver-Client-Secret", NAVER_CLIENT_SECRET)
    request.add_header("Content-Type", "application/json")

    response = urllib.request.urlopen(request, data=json.dumps(payload).encode("utf-8"))
    return json.loads(response.read().decode("utf-8"))


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
        "샴푸바": ["샴푸바", "고체샴푸", "클렌징바"],
        "바디바": ["바디바", "바디워시바", "고체바디워시"],
        "치마": ["치마", "롱치마", "미니치마"],
        "스커트": ["스커트", "롱스커트", "플리츠스커트"],
        "원피스": ["원피스", "여름원피스", "빅사이즈원피스"],
        "휴양지원피스": ["휴양지원피스", "비치원피스", "리조트원피스"]
    }

    print("🔍 전체 카테고리 10년 트렌드 조회 시작...")

    try:
        result = get_10year_trend(all_keywords)
        save_trend_data(result, "naver_trend_10year_all_categories.json")
        print("🎉 전체 카테고리 데이터 수집 완료!")

        print("\n📊 수집된 카테고리:")
        for category in all_keywords.keys():
            print(f"   ✓ {category}")

    except urllib.error.HTTPError as e:
        print(f"❌ API 오류: {e.code} - {e.reason}")
    except Exception as e:
        print(f"❌ 오류: {e}")
