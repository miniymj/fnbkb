# 네이버 API 활용 가이드

> 네이버 검색트렌드 API로 시장조사 데이터 수집

---

## 🔑 API 인증 발급

### 1. 네이버 개발자센터 가입

1. https://developers.naver.com/ 접속
2. 네이버 계정으로 로그인
3. 애플리케이션 등록 클릭

### 2. 애플리케이션 등록

- **애플리케이션 이름**: 패션뷰티 시장조사
- **사용 API**: 검색트렌드 API
- **비 로그인 오픈 API 서비스**: OFF
- **환경**: 다른 PC에서도 호출 허용

### 3. 인증 정보 확인

- **Client ID**: `j8Vo...`
- **Client Secret**: `5X3t...`

---

## 📡 검색트렌드 API

### 엔드포인트

```
POST https://openapi.naver.com/v1/datalab/search
```

### 요청 헤더

```http
X-Naver-Client-Id: {CLIENT_ID}
X-Naver-Client-Secret: {CLIENT_SECRET}
Content-Type: application/json
```

### 요청 본문

```json
{
  "startDate": "2016-01-01",
  "endDate": "2026-08-01",
  "timeUnit": "month",
  "keywordGroups": [
    {
      "groupName": "원피스",
      "keywords": ["원피스", "여름원피스", "원피스추천"]
    }
  ]
}
```

### 응답 예시

```json
{
  "results": [
    {
      "title": "원피스",
      "keywords": ["원피스", "여름원피스", "원피스추천"],
      "data": [
        {"period": "2016-01-01", "ratio": 100},
        {"period": "2016-02-01", "ratio": 85},
        ...
      ]
    }
  ]
}
```

---

## 🐍 Python 구현

### 기본 설정

```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
```

### 검색트렌드 조회 함수

```python
def get_search_trend(keywords, start_date, end_date, time_unit="month"):
    """
    네이버 검색트렌드 조회
    
    Args:
        keywords: 검색어 그룹 딕셔너리
            {
                "group_name": ["keyword1", "keyword2", ...],
                ...
            }
        start_date: 시작일 (YYYY-MM-DD)
        end_date: 종료일 (YYYY-MM-DD)
        time_unit: 시간단위 (month, week, day)
        
    Returns:
        dict: API 응답
    """
    url = "https://openapi.naver.com/v1/datalab/search"
    headers = {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
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
    
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    
    return response.json()
```

### 사용 예시

```python
# 10년 트렌드 조회
keywords = {
    "원피스": ["원피스", "여름원피스"],
    "치마": ["치마", "롱치마", "미니치마"],
    "스커트": ["스커트", "롱스커트"],
    "샴푸바": ["샴푸바", "고체샴푸"]
}

result = get_search_trend(
    keywords,
    "2016-08-01",
    "2026-08-01",
    "month"
)

# 결과 저장
import json
with open("../data/naver_trend_10year.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
```

---

## 📊 데이터 시각화

### 트렌드 차트 그리기

```python
import matplotlib.pyplot as plt
import pandas as pd
import json

# 데이터 로드
with open("../data/naver_trend_10year.json", "r") as f:
    data = json.load(f)

# 데이터프레임 변환
df_list = []
for result in data["results"]:
    for item in result["data"]:
        df_list.append({
            "group": result["title"],
            "date": item["period"],
            "ratio": item["ratio"]
        })

df = pd.DataFrame(df_list)
df["date"] = pd.to_datetime(df["date"])

# 시각화
fig, ax = plt.subplots(figsize=(14, 6))

for group in df["group"].unique():
    group_data = df[df["group"] == group]
    ax.plot(group_data["date"], group_data["ratio"], label=group)

ax.legend()
ax.set_title("10년 검색 트렌드")
ax.set_xlabel("날짜")
ax.set_ylabel("검색량 (비율)")
plt.xticks(rotation=45)
plt.tight_layout()

plt.savefig("../analysis/trend_chart_10year.png")
plt.show()
```

---

## ⚠️ 사용 제한

- **일일 쿼터**: 1,000회/일
- **시간당 쿼터**: 제한 없음 (일일 기준)
- **최대 기간**: 10년
- **최대 키워드 그룹**: 5개
- **그룹당 키워드**: 최대 20개

---

## 🔍 응용: 계절성 분석

```python
def analyze_seasonality(trend_data):
    """
    트렌드 데이터의 계절성 분석
    
    Args:
        trend_data: 검색트렌드 API 응답 데이터
        
    Returns:
        dict: 계절성 분석 결과
    """
    import pandas as pd
    from datetime import datetime
    
    # 데이터프레임 변환
    df_list = []
    for result in trend_data["results"]:
        for item in result["data"]:
            date = datetime.strptime(item["period"], "%Y-%m-%d")
            df_list.append({
                "group": result["title"],
                "date": date,
                "month": date.month,
                "ratio": item["ratio"]
            })
    
    df = pd.DataFrame(df_list)
    
    # 월별 평균 계산
    monthly_avg = df.groupby(["group", "month"])["ratio"].mean().unstack()
    
    return monthly_avg


# 사용
seasonality = analyze_seasonality(result)
print("계절성 분석:")
print(seasonality)
```

---

## 다음 단계

[크롤링 스크립트](./crawling-scripts)에서 전체 데이터 수집 방법을 확인하세요.
