# 시장조사 데이터 수집·분석 스크립트

네이버 데이터랩(API HUB) 기반 시장조사 자동화 도구.

## 사전 준비

```bash
# 1) 가상환경 생성 및 활성화
python3 -m venv ../.venv
source ../.venv/bin/activate

# 2) 의존성 설치
pip install -r ../requirements.txt

# 3) API 키 설정 — ../.env (루트에 하나만 관리)
cp .env.example ../.env
# ../.env 에 NAVER_CLIENT_ID / NAVER_CLIENT_SECRET 입력
```

> 인증 파일은 루트 `.env` 하나로 통일. `.gitignore`에 의해 커밋 제외됨.
> (이전의 `.datalab`, `scripts/.env` 는 동일한 키를 중복 보관하던 파일.)

## 데이터 파이프라인

### 1단계: 트렌드 수집 → 분석
| 스크립트 | 역할 | 산출물 |
|---|---|---|
| `naver_trend_batch.py` | 검색트렌드 10년치 카테고리별 수집 (API HUB) | `../data/naver_trend_{카테고리}.json` + 통합본 |
| `collect_shopping_insight_apihub.py` | 쇼핑인사이트 카테고리 키워드 수집 | `../data/shopping_insight_{카테고리}.json` |
| `analyze_trend_data.py` | 트렌드 JSON → 성장률/피크 분석 | `../analysis/trend_analysis_summary.json` |
| `analyze_shopping_insight.py` | 쇼핑인사이트 JSON → 분석 | `../data/shopping_insight_analysis.json` |

```bash
python3 naver_trend_batch.py
python3 collect_shopping_insight_apihub.py
python3 analyze_trend_data.py
python3 analyze_shopping_insight.py
```

### 2단계: 웹 자동화 수집 (Selenium, 수동 보조 필요)
네이버 데이터랩은 로그인/차단 이슈로 자동화가 어려울 수 있음. 실패 시 수동 다운로드 가이드 참고.

| 스크립트 | 역할 | 산출물 |
|---|---|---|
| `collect_all_datalab.py` | 연관검색어 + 쇼핑인사이트 통합 수집 | `../data/user_downloaded/*.xlsx` |
| `collect_shopping_category_trend.py` | 업종별(대·중분류) 트렌드 수집 | `../data/user_downloaded/*.xlsx` |

### 3단계: 경쟁사/리뷰 분석
| 스크립트 | 역할 |
|---|---|
| `analyze_top_sellers.py` | 네이버 쇼핑 상위 상품 크롤링 + 성공요인 분석 |
| `price_comparison.py` | 가격비교 크롤링 + 최저/최고/평균가 분석 |
| `collect_shopping_reviews.py` | 상품 리뷰 수집 + 키워드 분석 |
| `review_cleaner.py` | 리뷰 텍스트 클렌징(광고/체험단 제거, 감성 분석) |

### 4단계: 사용자 데이터 처리
| 스크립트 | 역할 |
|---|---|
| `process_user_data.py` | 다운로드한 엑셀 → 분석 파이프라인 |
| `manual_data_collection.py` | API 미사용 시 수동 가이드 |
| `manual_top_sellers_analysis.py` | 수동 분석용 템플릿 생성 |

### 테스트
| 스크립트 | 역할 |
|---|---|
| `test_api_hub.py` | NAVER API HUB 엔드포인트 연결 테스트 |
| `test_shopping_insight_endpoints.py` | 쇼핑인사이트 엔드포인트 후보 테스트 |

## archive/
`naver_trend_*` 4종, `naver_shopping_insight_api.py`(구버전), `collect_related_keywords.py`/`collect_shopping_insights.py`(Selenium 단일 기능 → `collect_all_datalab.py`로 통합) 등 중복/사장된 스크립트. 참고용으로 보존.
