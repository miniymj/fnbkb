"""
쇼핑인사이트 API HUB 엔드포인트 테스트
"""
import os
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

# 루트 .env 하나로 통일 (이전의 .datalab 폐기)
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "")
CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "")

# 쇼핑인사이트 테스트 페이로드
SHOPPING_PAYLOAD = {
    "startDate": "2025-07-01",
    "endDate": "2025-08-31",
    "timeUnit": "month",
    "category": "50000002",  # 화장품/미용
    "keyword": [
        {"name": "샴푸바", "param": ["샴푸바"]}
    ]
}

# 쇼핑인사이트 후보 엔드포인트
SHOPPING_ENDPOINTS = [
    # NAVER API HUB (예상)
    "https://naverapihub.apigw.ntruss.com/shopping/v1/category/keywords",
    "https://naverapihub.apigw.ntruss.com/shopping-insight/v1/category/keywords",
    "https://naverapihub.apigw.ntruss.com/datalab/v1/shopping/category/keywords",
    # NAVER 연동 API (예상)
    "https://naveropenapi.apigw.ntruss.com/shopping/v1/category/keywords",
    "https://naveropenapi.apigw.ntruss.com/datalab/v1/shopping/category/keywords",
    # 기존 Open API
    "https://openapi.naver.com/v1/datalab/shopping/category/keywords",
]

def test_endpoint(name, url, headers, data):
    print(f"\n{'='*60}")
    print(f"[{name}] {url}")
    try:
        resp = requests.post(url, headers=headers, json=data, timeout=15)
        print(f"  HTTP {resp.status_code}")
        try:
            body = resp.json()
            print(f"  Body: {json.dumps(body, ensure_ascii=False)[:300]}")
        except Exception:
            print(f"  Body: {resp.text[:300]}")
        return resp
    except requests.exceptions.RequestException as e:
        print(f"  ERROR: {e}")
        return None

if __name__ == "__main__":
    print("🛒 쇼핑인사이트 API HUB 엔드포인트 테스트 시작\n")

    # API HUB 인증 헤더
    hub_headers = {
        "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
        "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
        "Content-Type": "application/json",
    }

    for url in SHOPPING_ENDPOINTS:
        test_endpoint("API HUB 헤더", url, hub_headers, SHOPPING_PAYLOAD)

    print("\n" + "="*60)
    print("테스트 완료")
