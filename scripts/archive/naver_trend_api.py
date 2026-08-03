"""
네이버 검색트렌드 API로 시장조사 데이터 수집 (NAVER API HUB)
"""
import os
import json
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "")

# NAVER API HUB 설정 (2026년 7월 31일 이후 이관)
# 공식 문서: https://api.ncloud-docs.com/docs/naver-api-hub-search-trend
API_HUB_ENDPOINT = "https://naverapihub.apigw.ntruss.com/search-trend/v1/search"


def get_search_trend(keywords, start_date, end_date, time_unit="month", device="", ages=[], gender=""):
    """
    네이버 검색트렌드 조회 (NAVER API HUB)

    Args:
        keywords: 검색어 그룹 딕셔너리
            {
                "group_name": ["keyword1", "keyword2", ...],
                ...
            }
        start_date: 시작일 (YYYY-MM-DD)
        end_date: 종료일 (YYYY-MM-DD)
        time_unit: 시간단위 (month, week, day)
        device: 검색 환경 (pc, mo) - 선택
        ages: 연령대 리스트 ["1", "2", ...] - 선택
        gender: 성별 (m, f) - 선택

    Returns:
        dict: API 응답
    """
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

    # 선택적 파라미터 추가
    if device:
        data["device"] = device
    if ages:
        data["ages"] = ages
    if gender:
        data["gender"] = gender

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()

    return response.json()


def get_10year_trend(keywords):
    """
    10년 트렌드 조회

    Args:
        keywords: dict - 검색어 그룹

    Returns:
        dict: 10년 트렌드 데이터
    """
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365*10)

    return get_search_trend(
        keywords,
        start_date.strftime("%Y-%m-%d"),
        end_date.strftime("%Y-%m-%d"),
        "month"
    )


def save_trend_data(data, filename):
    """
    트렌드 데이터 저장

    Args:
        data: API 응답 데이터
        filename: 저장할 파일명
    """
    os.makedirs("../data", exist_ok=True)

    filepath = f"../data/{filename}"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"데이터가 저장되었습니다: {filepath}")


if __name__ == "__main__":
    # 아이템별 키워드 설정
    item_keywords = {
        "원피스": ["원피스", "여름원피스", "빅사이즈원피스"],
        "치마": ["치마", "롱치마", "미니치마", "플레어치마"],
        "스커트": ["스커트", "롱스커트", "미니스커트"],
        "샴푸바": ["샴푸바", "바디샴푸", "고체샴푸", "클렌징바"]
    }

    # API 키 확인
    if not NAVER_CLIENT_ID or not NAVER_CLIENT_SECRET:
        print("⚠️  네이버 API 인증 정보가 없습니다.")
        print("   .env 파일에 NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET을 설정해주세요.")
        exit(1)

    print("네이버 검색트렌드 조회를 시작합니다...")

    # 10년 트렌드 조회
    try:
        result = get_10year_trend(item_keywords)
        save_trend_data(result, "naver_trend_10year.json")
        print("✅ 데이터 수집 완료!")
    except requests.exceptions.HTTPError as e:
        print(f"❌ API 요청 실패: {e}")
        print("   인증 정보를 확인해주세요.")
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
