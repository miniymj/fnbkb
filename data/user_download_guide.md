# 시장조사 데이터 수집 가이드

> 2026-08-03 기준

---

## ✅ 완료된 작업 (자동화 완료)

| 작업 | 상태 | 결과물 |
|------|------|--------|
| **Selenium 설치** | ✅ 완료 | selenium 4.36.0, webdriver-manager |
| **10년 트렌드 수집** | ✅ 완료 | 6개 카테고리 JSON 파일 |
| **트렌드 분석** | ✅ 완료 | 성장률, 검색량 순위 |
| **종합 보고서 (2개)** | ✅ 완료 | 바디바, 치마/스커트 시장조사 |
| **연관검색어 자동 수집기** | ✅ 완료 | scripts/collect_all_datalab.py |
| **쇼핑인사이트 자동 수집기** | ✅ 완료 | scripts/collect_all_datalab.py |

---

## 🚀 방법 1: 자동 수집 (추천)

**한 번의 명령으로 모든 데이터를 자동 수집하세요!**

```bash
cd /Volumes/MINIY/중랑
python scripts/collect_all_datalab.py
```

**수집 항목**:
- 연관검색어 (5개): 샴푸바, 바디바, 치마, 스커트, 원피스
- 쇼핑인사이트 (5개): 샴푸바, 바디바, 치마, 스커트, 원피스

**주의사항**:
- 네이버 데이터랩 로그인이 필요할 수 있습니다
- 수집 시간: 약 5-10분
- 결과물: `data/user_downloaded/` 폴더에 자동 저장

---

## 📋 방법 2: 수동 다운로드

자동 수집이 안 될 경우, 수동으로 다운로드하세요.

### 연관검색어

> 2026년 데이터랩 개편으로 `/keyword/related/`가 **검색어트렌드**(`/keyword/trendSearch.naver`)로 통합됨.

| 검색어 | URL |
|--------|-----|
| 샴푸바 | https://datalab.naver.com/keyword/trendSearch.naver |
| 바디바 | https://datalab.naver.com/keyword/trendSearch.naver |
| 치마 | https://datalab.naver.com/keyword/trendSearch.naver |
| 스커트 | https://datalab.naver.com/keyword/trendSearch.naver |
| 원피스 | https://datalab.naver.com/keyword/trendSearch.naver |

**단계**:
1. URL 접속
2. 검색창에 키워드 입력
3. "엑셀 다운로드" 클릭

### 쇼핑인사이트

> ✅ **이미 API HUB로 수집 완료** — `data/shopping_insight_{카테고리}.json` 참고. 아래는 보조용 수동 방법.
>
> 2026년 데이터랩 개편으로 쇼핑인사이트가 2개 페이지로 분리됨:
> - **검색어 통계** (특정 키워드의 연관검색어·클릭률): `/shoppingInsight/sKeyword.naver`
> - **분야통계** (카테고리 전체 동향): `/shoppingInsight/sCategory.naver`

**키워드별 검색 (연관검색어·클릭률) — 권장**

| 검색어 | URL |
|--------|-----|
| 샴푸바 | https://datalab.naver.com/shoppingInsight/sKeyword.naver |
| 바디바 | https://datalab.naver.com/shoppingInsight/sKeyword.naver |
| 치마 | https://datalab.naver.com/shoppingInsight/sKeyword.naver |
| 스커트 | https://datalab.naver.com/shoppingInsight/sKeyword.naver |
| 원피스 | https://datalab.naver.com/shoppingInsight/sKeyword.naver |

**분야별 통계 (업종 동향)**: https://datalab.naver.com/shoppingInsight/sCategory.naver

---

## 📁 저장 위치

```
/Volumes/MINIY/중랑/data/user_downloaded/
├── 연관검색어_샴푸바.xlsx
├── 연관검색어_바디바.xlsx
├── 연관검색어_치마.xlsx
├── 연관검색어_스커트.xlsx
├── 연관검색어_원피스.xlsx
├── 쇼핑인사이트_샴푸바.xlsx
├── 쇼핑인사이트_바디바.xlsx
├── 쇼핑인사이트_치마.xlsx
├── 쇼핑인사이트_스커트.xlsx
└── 쇼핑인사이트_원피스.xlsx
```

---

## 🎯 다음 단계

1. **데이터 수집**: 자동 or 수동으로 10개 파일 수집
2. **분석 요청**: 수집 완료되면 알려주세요
3. **종합 보고서**: KB에 업로드

---

📌 **팁**: 자동 수집이 실패하면 네이버 데이터랩에 로그인한 상태에서 다시 실행해 보세요.
