#!/usr/bin/env python3
"""
NAVER API HUB 쇼핑인사이트 데이터 수집
2026년 7월 31일 이후 NAVER API HUB로 이관됨
"""
import json
import os
import urllib.request
import urllib.parse
from datetime import datetime, timedelta
from pathlib import Path

# 크레덴셜 파일 경로
CREDENTIAL_FILE = Path("/Volumes/MINIY/중랑/.datalab")
OUTPUT_DIR = Path("/Volumes/MINIY/중랑/data")

# 카테고리 설정 (cat_id)
# 네이버쇼핑 카테고리 코드 - 필요한 경우 네이버쇼핑 URL에서 cat_id 확인
CATEGORIES = {
    "샴푸바": {"category": "50000002", "keyword": "샴푸바"},  # 화장품/미용
    "바디바": {"category": "50000002", "keyword": "바디바"},
    "치마": {"category": "50000000", "keyword": "치마"},    # 패션의류
    "스커트": {"category": "50000000", "keyword": "스커트"},
    "원피스": {"category": "50000000", "keyword": "원피스"}
}


def load_credentials():
    """크레덴셜 로드"""
    if not CREDENTIAL_FILE.exists():
        raise FileNotFoundError(f"크레덴셜 파일을 찾을 수 없습니다: {CREDENTIAL_FILE}")

    creds = {}
    with open(CREDENTIAL_FILE, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                creds[key] = value

    return creds.get("NAVER_CLIENT_ID"), creds.get("NAVER_CLIENT_SECRET")


def call_shopping_insight_api(client_id, client_secret, category, keyword, start_date, end_date):
    """
    쇼핑인사이트 키워드별 트렌드 조회

    API Endpoint: https://openapi.naver.com/v1/datalab/shopping/category/keywords
    """
    url = "https://openapi.naver.com/v1/datalab/shopping/category/keywords"

    body = json.dumps({
        "startDate": start_date,
        "endDate": end_date,
        "timeUnit": "month",
        "category": category,
        "keyword": [
            {"name": keyword, "param": [keyword]}
        ]
    }, ensure_ascii=False)

    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    request.add_header("Content-Type", "application/json")

    try:
        response = urllib.request.urlopen(request, data=body.encode("utf-8"))
        if response.getcode() == 200:
            return json.loads(response.read().decode("utf-8"))
        else:
            print(f"API 오류: {response.getcode()}")
            return None
    except urllib.error.HTTPError as e:
        print(f"HTTP 오류: {e.code} - {e.reason}")
        print(f"응답: {e.read().decode('utf-8')}")
        return None
    except Exception as e:
        print(f"요청 오류: {e}")
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

    # 10년치 데이터 수집 (2016-01-01 ~ 오늘)
    end_date = datetime.now().strftime("%Y-%m-%d")
    start_date = "2016-01-01"

    print(f"📅 수집 기간: {start_date} ~ {end_date}")

    results = []
    for name, config in CATEGORIES.items():
        print(f"\n🔍 [{name}] 데이터 수집 중...")
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


if __name__ == "__main__":
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    collect_shopping_insights()
