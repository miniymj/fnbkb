"""
NAVER API HUB / NAVER 연동 API 엔드포인트 연결 테스트
현재 스크립트의 endpoint와 후보 endpoint들을 모두 테스트한다.
"""
import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "")
CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "")

PAYLOAD = {
    "startDate": "2025-07-01",
    "endDate": "2025-08-01",
    "timeUnit": "month",
    "keywordGroups": [
        {"groupName": "샴푸바", "keywords": ["샴푸바", "고체샴푸"]}
    ]
}

# 후보 엔드포인트 목록
ENDPOINTS = [
    # NAVER API HUB (2026년 7월 31일 이후 이관) - 공식 문서 기준
    "https://naverapihub.apigw.ntruss.com/search-trend/v1/search",
    # NAVER 연동 API (구버전 NCP)
    "https://naveropenapi.apigw.ntruss.com/datalab/v1/search",
    # NAVER Open API (구버전 developers.naver.com)
    "https://openapi.naver.com/v1/datalab/search",
    # 기타 변형
    "https://naverapihub.apigw.ntruss.com/datalab/v1/search",
]


def test_endpoint(name, url, headers, data, use_json=True):
    print(f"\n{'='*60}")
    print(f"[{name}] {url}")
    try:
        if use_json:
            resp = requests.post(url, headers=headers, json=data, timeout=15)
        else:
            resp = requests.post(url, headers=headers, data=data, timeout=15)
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
    print("NAVER API HUB 엔드포인트 테스트 시작\n")

    # API 키 확인
    if not CLIENT_ID or not CLIENT_SECRET:
        print("⚠️  네이버 API 인증 정보가 없습니다.")
        print("   .env 파일에 NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET을 설정해주세요.")
        exit(1)

    # 1. NAVER API HUB 인증 헤더
    hub_headers = {
        "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
        "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
        "Content-Type": "application/json",
    }

    # 2. 구버전 NAVER Open API 헤더
    old_headers = {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
        "Content-Type": "application/json",
    }

    for url in ENDPOINTS:
        test_endpoint("NAVER API HUB 헤더", url, hub_headers, PAYLOAD)
        test_endpoint("구버전 헤더", url, old_headers, PAYLOAD)

    print("\n" + "="*60)
    print("테스트 완료")
