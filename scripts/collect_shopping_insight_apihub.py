#!/usr/bin/env python3
"""
NAVER API HUB 쇼핑인사이트 데이터 수집
작동하는 엔드포인트: https://naverapihub.apigw.ntruss.com/shopping/v1/category/keywords
"""
import json
import os
import requests
from datetime import datetime, timedelta
from pathlib import Path

# 크레덴셜 로드 — 루트 .env 하나로 통일 (이전의 .datalab 폐기)
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")

def load_credentials():
    """크레덴셜 로드 (.env)"""
    return os.getenv("NAVER_CLIENT_ID"), os.getenv("NAVER_CLIENT_SECRET")

# 쇼핑인사이트 API 엔드포인트
SHOPPING_API_URL = "https://naverapihub.apigw.ntruss.com/shopping/v1/category/keywords"

# 카테고리 설정
CATEGORIES = {
    "샴푸바": {"category": "50000002", "keyword": "샴푸바"},  # 화장품/미용
    "바디바": {"category": "50000002", "keyword": "바디바"},
    "치마": {"category": "50000000", "keyword": "치마"},    # 패션의류
    "스커트": {"category": "50000000", "keyword": "스커트"},
    "원피스": {"category": "50000000", "keyword": "원피스"}
}

OUTPUT_DIR = Path("/Volumes/MINIY/중랑/data")

def call_shopping_insight_api(client_id, client_secret, category, keyword, start_date, end_date):
    """
    쇼핑인사이트 키워드별 트렌드 조회

    API Endpoint: https://naverapihub.apigw.ntruss.com/shopping/v1/category/keywords
    """
    headers = {
        "X-NCP-APIGW-API-KEY-ID": client_id,
        "X-NCP-APIGW-API-KEY": client_secret,
        "Content-Type": "application/json"
    }

    data = {
        "startDate": start_date,
        "endDate": end_date,
        "timeUnit": "month",
        "category": category,
        "keyword": [
            {"name": keyword, "param": [keyword]}
        ]
    }

    try:
        response = requests.post(SHOPPING_API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"   ❌ API 오류: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"      응답: {e.response.text[:200]}")
        return None

def collect_shopping_insights():
    """쇼핑인사이트 데이터 수집"""
    print("=" * 60)
    print("🛒 NAVER API HUB 쇼핑인사이트 데이터 수집")
    print("=" * 60)

    # 크레덴셜 로드
    try:
        client_id, client_secret = load_credentials()
        print(f"✅ 크레덴셜 로드 완료")
    except Exception as e:
        print(f"❌ {e}")
        return

    # 쇼핑인사이트 데이터 수집 (2017년 8월 1일부터 가능)
    end_date = datetime.now().strftime("%Y-%m-%d")
    start_date = "2017-08-01"

    print(f"📅 수집 기간: {start_date} ~ {end_date}")
    print(f"🔗 엔드포인트: {SHOPPING_API_URL}\n")

    results = []
    for name, config in CATEGORIES.items():
        print(f"🔍 [{name}] 데이터 수집 중...")
        print(f"   카테고리: {config['category']}, 키워드: {config['keyword']}")

        data = call_shopping_insight_api(
            client_id,
            client_secret,
            config["category"],
            config["keyword"],
            start_date,
            end_date
        )

        if data:
            # 결과 저장
            output_file = OUTPUT_DIR / f"shopping_insight_{name}.json"
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            print(f"   ✅ 저장 완료: {output_file.name}")
            results.append({"name": name, "file": str(output_file)})
        else:
            print(f"   ❌ 수집 실패")

    # 요약
    print("\n" + "=" * 60)
    print("📊 수집 결과 요약")
    print("=" * 60)
    print(f"성공: {len(results)}/{len(CATEGORIES)}")

    for r in results:
        print(f"  ✅ {r['name']}")

    # 통합 파일 저장
    all_data = {}
    for r in results:
        with open(r["file"], "r", encoding="utf-8") as f:
            all_data[r["name"]] = json.load(f)

    combined_file = OUTPUT_DIR / "shopping_insight_all_categories.json"
    with open(combined_file, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    print(f"\n📁 통합 파일: {combined_file.name}")
    print("\n🎉 쇼핑인사이트 데이터 수집 완료!")

if __name__ == "__main__":
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    collect_shopping_insights()
