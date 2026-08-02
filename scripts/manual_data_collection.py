"""
수동 데이터 수집 가이드
네이버 API 인증이 필요한 경우, 데이터랩에서 직접 다운로드한 파일을 처리합니다.
"""
import os
import json
import pandas as pd
from datetime import datetime


def process_naver_datalab_excel(filepath):
    """
    네이버 데이터랩에서 다운로드한 엑셀 파일 처리

    수동 다운로드 방법:
    1. https://datalab.naver.com/shoppingInsights/sCategory.naver 접속
    2. 검색어 입력 및 기간 설정
    3. 엑셀 다운로드 버튼 클릭

    Args:
        filepath: 다운로드한 엑셀 파일 경로
    """
    try:
        # 엑셀 파일 읽기
        df = pd.read_excel(filepath)

        # 데이터 정리
        print("=" * 50)
        print(f"파일: {os.path.basename(filepath)}")
        print("=" * 50)
        print(df.head(20).to_string(index=False))
        print("=" * 50)
        print(f"총 {len(df)}개의 데이터")

        return df
    except Exception as e:
        print(f"파일 읽기 오류: {e}")
        return None


def create_manual_collection_guide():
    """
    수동 데이터 수집 가이드 생성
    """
    guide = """
# 수동 데이터 수집 가이드

## 1. 네이버 데이터랩 - 연관검색어

### 접속 URL
https://datalab.naver.com/shoppingInsights/sCategory.naver

### 수집 단계
1. 검색어 입력 (예: 원피스, 치마, 스커트, 샴푸바)
2. 기간 설정: 최대 10년 (2016-08-01 ~ 2026-08-01)
3. [엑셀 다운로드] 버튼 클릭
4. `../data/` 폴더에 저장

### 필요한 데이터
| 검색어 | 파일명 | 비고 |
|:---|:---|:---|
| 원피스 | naver_datalab_원피스.xlsx | |
| 치마 | naver_datalab_치마.xlsx | |
| 스커트 | naver_datalab_스커트.xlsx | |
| 샴푸바 | naver_datalab_샴푸바.xlsx | |

## 2. 네이버 쇼핑 - 가격비교

### 접속 URL
https://shopping.naver.com/

### 수집 단계
1. 검색어 입력
2. 상위 20개 상품 정보 수동 입력
3. 상품명, 가격, 판매처 기록

## 3. 네이버 쇼핑 - 리뷰 수집

### 수집 단계
1. 상품 상세페이지 접속
2. 리뷰 탭 클릭
3. 상위 리뷰 100개 스크롤 캡처
4. 광고성 리뷰 제거 필터링
"""

    os.makedirs("../data", exist_ok=True)

    with open("../data/MANUAL_COLLECTION_GUIDE.md", "w", encoding="utf-8") as f:
        f.write(guide)

    print("✅ 수동 데이터 수집 가이드가 생성되었습니다:")
    print("   ../data/MANUAL_COLLECTION_GUIDE.md")


if __name__ == "__main__":
    print("네이버 API 인증이 필요합니다.")
    print("수동 데이터 수집 방법을 안내합니다.\n")

    create_manual_collection_guide()

    # 이미 있는 엑셀 파일이 있는지 확인
    data_dir = "../data"
    if os.path.exists(data_dir):
        excel_files = [f for f in os.listdir(data_dir) if f.endswith((".xlsx", ".xls"))]

        if excel_files:
            print(f"\n발견된 엑셀 파일 {len(excel_files)}개:")
            for f in excel_files:
                print(f"  - {f}")
                process_naver_datalab_excel(os.path.join(data_dir, f))
