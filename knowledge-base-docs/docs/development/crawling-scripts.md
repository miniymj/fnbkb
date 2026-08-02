# 크롤링 스크립트

> 가격비교 및 리뷰 수집을 위한 크롤링 도구

---

## 📦 필요한 패키지

```bash
pip install selenium beautifulsoup4 requests pandas openpyxl python-dotenv
```

---

## 🔑 환경 설정

### `.env` 파일
```bash
# 네이버 API 인증
NAVER_CLIENT_ID=your_client_id
NAVER_CLIENT_SECRET=your_client_secret

# 크롤링 설정
HEADLESS_MODE=true
TIMEOUT=30
```

---

## 📜 스크립트 목록

### 1. 네이버 검색트렌드 API

`scripts/naver_trend_api.py`

```python
"""
네이버 검색트렌드 API로 10년 트렌드 데이터 수집
"""
import os
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

def get_10year_trend(keywords):
    """
    네이버 데이터랩 검색트렌드 API로 10년 트렌드 조회
    
    Args:
        keywords: list of str - 검색어 리스트
        
    Returns:
        dict: API 응답 데이터
    """
    url = "https://openapi.naver.com/v1/datalab/search"
    headers = {
        "X-Naver-Client-Id": os.getenv("NAVER_CLIENT_ID"),
        "X-Naver-Client-Secret": os.getenv("NAVER_CLIENT_SECRET"),
        "Content-Type": "application/json"
    }
    
    # 10년 전 날짜 계산
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365*10)
    
    data = {
        "startDate": start_date.strftime("%Y-%m-%d"),
        "endDate": end_date.strftime("%Y-%m-%d"),
        "timeUnit": "month",
        "keywordGroups": [
            {"groupName": f"group_{i}", "keywords": [kw]}
            for i, kw in enumerate(keywords)
        ]
    }
    
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    # 테스트
    keywords = ["원피스", "치마", "스커트", "샴푸바"]
    result = get_10year_trend(keywords)
    
    # JSON 저장
    import json
    with open("../data/naver_trend_10year.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print("데이터가 저장되었습니다.")
```

---

### 2. 네이버 쇼핑 리뷰 크롤러

`scripts/naver_shopping_review_crawler.py`

```python
"""
네이버 쇼핑 리뷰 수집 (Selenium 활용)
"""
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options


def setup_driver(headless=True):
    """Chrome 드라이버 설정"""
    options = Options()
    if headless:
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--lang=ko_KR")
    
    driver = webdriver.Chrome(options=options)
    return driver


def is_ad_review(review_text):
    """광고성 리뷰 필터링"""
    if len(review_text) < 20:
        return True
    
    # 광고성 키워드
    ad_keywords = ["직구", "배송빠름", "재구매"]
    if any(kw in review_text for kw in ad_keywords):
        return True
    
    return False


def collect_product_reviews(product_url, max_reviews=100):
    """
    상품 리뷰 수집
    
    Args:
        product_url: 네이버 쇼핑 상품 URL
        max_reviews: 수집할 리뷰 최대 개수
        
    Returns:
        list: 리뷰 데이터 리스트
    """
    driver = setup_driver()
    reviews = []
    
    try:
        driver.get(product_url)
        
        # 리뷰 탭 클릭
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".review_tab"))
        ).click()
        
        time.sleep(2)
        
        # 리뷰 수집
        review_elements = driver.find_elements(By.CSS_SELECTOR, ".review_content")
        
        for element in review_elements[:max_reviews]:
            try:
                review_text = element.find_element(By.CSS_SELECTOR, ".review_text").text
                
                # 광고성 리뷰 필터링
                if not is_ad_review(review_text):
                    reviews.append({
                        "text": review_text,
                        "rating": element.find_element(By.CSS_SELECTOR, ".rating").text,
                        "date": element.find_element(By.CSS_SELECTOR, ".date").text,
                    })
            except Exception as e:
                continue
                
    finally:
        driver.quit()
    
    return reviews


if __name__ == "__main__":
    # 테스트
    product_url = input("상품 URL을 입력하세요: ")
    reviews = collect_product_reviews(product_url)
    
    # 엑셀 저장
    df = pd.DataFrame(reviews)
    df.to_excel("../data/reviews.xlsx", index=False)
    
    print(f"{len(reviews)}개의 리뷰가 저장되었습니다.")
```

---

### 3. 가격비교 크롤러

`scripts/price_comparison_crawler.py`

```python
"""
다나와, 쿠팡 등 가격비교 사이트 크롤러
"""
import time
import pandas as pd
from bs4 import BeautifulSoup
import requests


def scrape_danawa_price(keyword):
    """
    다나와 가격비교 크롤링
    
    Args:
        keyword: 검색어
        
    Returns:
        list: 가격 정보 리스트
    """
    url = f"https://search.danawa.com/search.php?query={keyword}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    products = []
    for item in soup.select(".product_list")[:20]:
        try:
            name = item.select_one(".prod_name").text.strip()
            price = item.select_one(".price_sect").text.strip()
            products.append({"name": name, "price": price})
        except AttributeError:
            continue
    
    return products


def scrape_coupons_deals(keyword):
    """
    쿠팡 가격 크롤링
    
    Args:
        keyword: 검색어
        
    Returns:
        list: 가격 정보 리스트
    """
    url = f"https://www.coupang.com/np/search?q={keyword}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    
    products = []
    for item in soup.select(".search-product")[:20]:
        try:
            name = item.select_one(".name").text.strip()
            price = item.select_one(".price-value").text.strip()
            products.append({"name": name, "price": price})
        except AttributeError:
            continue
    
    return products


def compare_prices(keyword):
    """
    여러 사이트 가격비교
    
    Args:
        keyword: 검색어
        
    Returns:
        DataFrame: 가격비교 결과
    """
    print(f"다나와 검색 중: {keyword}")
    danawa_products = scrape_danawa_price(keyword)
    
    print(f"쿠팡 검색 중: {keyword}")
    coupang_products = scrape_coupons_deals(keyword)
    
    # 데이터프레임 생성
    df_danawa = pd.DataFrame(danawa_products)
    df_danawa["site"] = "다나와"
    
    df_coupang = pd.DataFrame(coupang_products)
    df_coupang["site"] = "쿠팡"
    
    # 통합
    result = pd.concat([df_danawa, df_coupang], ignore_index=True)
    
    return result


if __name__ == "__main__":
    # 테스트
    keyword = input("검색어를 입력하세요: ")
    result = compare_prices(keyword)
    
    # 엑셀 저장
    result.to_excel(f"../data/price_comparison_{keyword}.xlsx", index=False)
    
    print(f"총 {len(result)}개 상품의 가격이 저장되었습니다.")
```

---

## 🚀 실행 방법

### 1. 네이버 API 트렌드 수집
```bash
cd /Volumes/MINIY/중랑/scripts
python naver_trend_api.py
```

### 2. 리뷰 수집
```bash
cd /Volumes/MINIY/중랑/scripts
python naver_shopping_review_crawler.py
```

### 3. 가격비교
```bash
cd /Volumes/MINIY/중랑/scripts
python price_comparison_crawler.py
```

---

## 📋 실행 체크리스트

- [ ] `.env` 파일 설정 완료
- [ ] ChromeDriver 설치
- [ ] 필요한 패키지 설치
- [ ] 네이버 API 인증 발급
- [ ] 스크립트 테스트 실행

---

## 다음 단계

[네이버 API 상세 가이드](./naver-api)에서 API 활용 방법을 자세히 알아보세요.
