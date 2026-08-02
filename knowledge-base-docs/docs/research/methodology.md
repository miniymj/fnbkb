# 시장조사 방법론

> 강사가 알려준 체계적인 시장조사 방법

---

## 📋 시장조사 5단계

### 1. 네이버 연관검색어 키워드 리스트

**목적**: 검색량과 경쟁정도를 파악하여 시장 규모와 진입 가능성 판단

**도구**: 네이버 데이터랩 - 쇼핑인사이트
- URL: https://datalab.naver.com/shoppingInsights/sCategory.naver

**수집 항목**:
- 연관검색어 TOP 100
- 월간검색수 (PC + 모바일)
- 월평균클릭수
- 월평균클릭률
- 경쟁정도

**분석 포인트**:
- 검색량은 많고 경쟁이 낮은 키워드 발굴 (Blue Ocean)
- 계절성 파악 (월별 추이)
- 성장성 확인 (YoY 비교)

---

### 2. 소셜 언급 분석 (썸트렌드 대체)

**목적**: 소셜 미디어에서의 긍정/부정 반응과 트렌드 파악

**문제**: 썸트렌드는 유료 서비스

**대체 방안**:

#### 방안 A: 네이버 뉴스/카페/블로그 API
```python
# 네이버 검색 트렌드 API 활용
import requests

def get_naver_search_trend(keywords):
    # 네이버 데이터랩 검색트렌드 API
    url = "https://openapi.naver.com/v1/datalab/search"
    headers = {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET
    }
    data = {
        "startDate": "2016-01-01",
        "endDate": "2026-08-01",
        "timeUnit": "month",
        "keywordGroups": [
            {"groupName": keyword, "keywords": [keyword]}
            for keyword in keywords
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()
```

#### 방안 B: 인스타그램/블로그 해시태그 수동 분석
- 인스타그램: `#{키워드}` 해시태그 게시물 수, 좋아요 수
- 블로그: 키워드 검색 결과 게시물 수, 댓글 반응

---

### 3. 스마트스토어/네이버 쇼핑 리뷰 수집

**목적**: 실제 소비자 불만사항과 Needs 파악

**방법 A: 네이버 쇼핑 API (추천)**
```python
import requests

def get_naver_shopping_reviews(product_id):
    url = f"https://api.naver.com/comp/v1/nca/shop/reviews/naver/naver-{product_id}"
    # 네이버 쇼핑 인증 필요
    response = requests.get(url)
    return response.json()
```

**방법 B: 수동 수집 (크롬 확장프로그램)**
- 네이버 쇼핑 → 상품 검색 → 리뷰 탭
- 리뷰 확장 프로그램으로 전체 리뷰 추출
- 광고성 리뷰 필터링:
  - 리뷰 내용이 20자 미만
  - 동일한 리뷰어가 여러 상품에 동일 리뷰
  - "직구", "배송빠름" 등 상품 관련 없는 리뷰

---

### 4. 네이버 데이터랩 10년 트렌드 조회

**목적**: 장기 트렌드 파악을 통한 시장 성숙도와 계절성 분석

**API 활용**:
```python
def get_10year_trend(keyword):
    """
    네이버 데이터랩 검색트렌드 API로 10년 트렌드 조회
    """
    import requests
    from datetime import datetime, timedelta
    
    # 10년 전 날짜 계산
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365*10)
    
    url = "https://openapi.naver.com/v1/datalab/search"
    headers = {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET
    }
    data = {
        "startDate": start_date.strftime("%Y-%m-%d"),
        "endDate": end_date.strftime("%Y-%m-%d"),
        "timeUnit": "month",
        "keywordGroups": [
            {"groupName": keyword, "keywords": [keyword]}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()
```

**API 인증 발급**:
1. 네이버 개발자센터: https://developers.naver.com/
2. 애플리케이션 등록
3. Client ID, Client Secret 발급

---

### 5. 쇼핑인사이트 업종 트렌드 신호

**목적**: 카테고리별 클릭 추이와 인기 키워드로 업종 내 실수요 변화 감지

**도구**: 네이버 데이터랩 - 쇼핑인사이트

**분석 항목**:

#### 5.1 분야 통계 (클릭량 추이)
- **패션의류**: 전체 카테고리 클릭량 월별 추이
- **화장품/미용**: 화장품 카테고리 클릭량 월별 추이

#### 5.2 업종별 연관검색어
- 의류업종 전반의 인기 키워드
- 화장품업종 전반의 인기 키워드

**트렌드 신호 해석**:
- **클릭량 급증**: 새로운 수요 발생 (기회)
- **클릭량 급감**: 시장 위축 (위험)
- **새로운 키워드 등장**: 트렌드 변화 (대응 필요)

---

## 📊 데이터 수집 체크리스트

| 단계 | 항목 | 도구 | 주기 | 상태 |
|:---:|:---|:---|:---|:---|
| 1 | 연관검색어 리스트 | 네이버 데이터랩 | 1회 | ⏳ |
| 2 | 소셜 언급 분석 | 네이버 API/수동 | 1회 | ⏳ |
| 3 | 리뷰 수집 | API/수동 | 1회 | ⏳ |
| 4 | 10년 트렌드 | 네이버 API | 1회 | ⏳ |
| 5 | 업종 트렌드 | 네이버 데이터랩 | 월별 | ⏳ |

---

## 🔧 필요한 도구 설정

### 네이버 API 인증 발급
1. https://developers.naver.com/ 접속
2. 애플리케이션 등록
3. Client ID, Client Secret 발급 후 `.env` 파일에 저장

### 크롤링 도구
- Selenium: 동적 웹페이지 크롤링
- BeautifulSoup: HTML 파싱
- requests: API 요청

### 데이터 저장
- CSV/Excel: 연관검색어, 리뷰
- JSON: 트렌드 데이터
- 이미지: 캡처본

---

## 다음 단계

[데이터 수집 실행 계획](./execution-plan)에서 구체적인 일정과 방법을 확인하세요.
