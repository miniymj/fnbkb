"""
네이버 쇼핑 리뷰 수집 스크립트
"""
import os
import time
import json
import re
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from dotenv import load_dotenv

# 루트 .env 하나로 통일
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

HEADLESS_MODE = os.getenv("HEADLESS_MODE", "true").lower() == "true"
TIMEOUT = int(os.getenv("TIMEOUT", "30"))


def setup_driver():
    """크롬 드라이버 설정"""
    options = Options()
    if HEADLESS_MODE:
        options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--lang=ko-KR")

    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(TIMEOUT)
    return driver


def search_naver_shopping(keyword, driver):
    """네이버 쇼핑 검색"""
    url = f"https://search.shopping.naver.com/search/all?query={keyword}"
    driver.get(url)
    time.sleep(2)
    return url


def get_top_products(driver, limit=10):
    """상위 상품 추출"""
    products = []

    try:
        product_elements = driver.find_elements(By.CSS_SELECTOR, ".basicList_inner__xQ3yC")[:limit]

        for i, elem in enumerate(product_elements, 1):
            try:
                title = elem.find_element(By.CSS_SELECTOR, ".basicList_link__Xmgbm").text
                price = elem.find_element(By.CSS_SELECTOR, ".price_num__S2p0S").text
                link = elem.find_element(By.CSS_SELECTOR, ".basicList_link__Xmgbm").get_attribute("href")

                products.append({
                    "rank": i,
                    "title": title,
                    "price": price,
                    "link": link
                })
            except:
                continue

    except Exception as e:
        print(f"상품 추출 오류: {e}")

    return products


def get_product_reviews(product_url, driver, limit=100):
    """상품 리뷰 수집"""
    driver.get(product_url)
    time.sleep(2)

    reviews = []

    try:
        # 리뷰 탭 클릭
        driver.find_element(By.CSS_SELECTOR, "a[tabindex*='review']").click()
        time.sleep(2)

        # 리뷰 더보기 클릭 (페이지네이션)
        for page in range(5):  # 최대 5페이지
            try:
                review_elements = driver.find_elements(By.CSS_SELECTOR, ".review_item")

                for elem in review_elements:
                    try:
                        rating = elem.find_element(By.CSS_SELECTOR, ".review_star").get_attribute("title")
                        content = elem.find_element(By.CSS_SELECTOR, ".review_text").text
                        date = elem.find_element(By.CSS_SELECTOR, ".review_date").text

                        reviews.append({
                            "rating": rating,
                            "content": content,
                            "date": date
                        })
                    except:
                        continue

                if len(reviews) >= limit:
                    break

                # 다음 페이지 클릭
                try:
                    driver.find_element(By.CSS_SELECTOR, ".next").click()
                    time.sleep(1)
                except:
                    break

            except:
                break

    except Exception as e:
        print(f"리뷰 수집 오류: {e}")

    return reviews


def analyze_review_keywords(reviews):
    """리뷰 키워드 분석"""
    keyword_count = {}

    for review in reviews:
        content = review["content"]
        words = re.findall(r'\w{2,}', content)  # 2글자 이상 단어

        for word in words:
            word = word.lower()
            if word in ["좋", "잘", "너무", "정말", "계속", "계속해서"]:
                continue
            keyword_count[word] = keyword_count.get(word, 0) + 1

    # 상위 20 키워드
    top_keywords = sorted(keyword_count.items(), key=lambda x: x[1], reverse=True)[:20]

    return top_keywords


def save_results(data, filename):
    """결과 저장"""
    os.makedirs("/Volumes/MINIY/중랑/data/reviews", exist_ok=True)

    filepath = f"/Volumes/MINIY/중랑/data/reviews/{filename}"
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ 저장 완료: {filename}")


if __name__ == "__main__":
    categories = {
        "샴푸바": "샴푸바",
        "바디바": "바디바",
        "치마": "치마",
        "스커트": "플리츠스커트",
        "원피스": "여름원피스"
    }

    print("🔍 네이버 쇼핑 리뷰 수집 시작...")

    driver = setup_driver()

    for category, keyword in categories.items():
        try:
            print(f"\n📊 {category} 리뷰 수집 중...")

            # 검색
            search_naver_shopping(keyword, driver)

            # 상위 상품 추출
            products = get_top_products(driver, limit=3)

            category_reviews = {}

            for product in products:
                print(f"   상품: {product['title']}")

                # 리뷰 수집
                reviews = get_product_reviews(product["link"], driver, limit=50)

                # 키워드 분석
                keywords = analyze_review_keywords(reviews)

                category_reviews[product["title"]] = {
                    "rank": product["rank"],
                    "price": product["price"],
                    "review_count": len(reviews),
                    "keywords": keywords
                }

            save_results(category_reviews, f"{category}_reviews.json")
            print(f"   ✅ {category} 완료")

        except Exception as e:
            print(f"   ❌ {category} 실패: {e}")

    driver.quit()
    print("\n🎉 전체 리뷰 수집 완료!")
