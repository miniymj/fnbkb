"""
상위 판매 사이트 분석 스크립트
가격비교 1~5위 사이트 중 후기 많고 별점 높은 곳 분석
"""
import os
import json
import requests
from bs4 import BeautifulSoup
from collections import defaultdict


def scrape_naver_shopping_top_products(keyword, top_n=5):
    """
    네이버 쇼핑 상위 N개 상품 크롤링

    Args:
        keyword: 검색어
        top_n: 상위 N개

    Returns:
        list: 상품 정보 리스트
    """
    url = f"https://search.shopping.naver.com/search?k={keyword}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    }

    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")

        products = []
        product_items = soup.select(".product_info_area")[:top_n]

        for idx, item in enumerate(product_items, 1):
            try:
                # 상품명
                name_elem = item.select_one(".product_link a")
                name = name_elem.text.strip() if name_elem else "알 수 없음"

                # 가격
                price_elem = item.select_one(".price_num")
                price = price_elem.text.strip() if price_elem else "알 수 없음"

                # 판매처 (브랜드)
                site_elem = item.select_one(".mall_name")
                site = site_elem.text.strip() if site_elem else "알 수 없음"

                # 리뷰 수
                review_elem = item.select_one(".review_count")
                reviews = review_elem.text.strip() if review_elem else "0"

                # 평점
                rating_elem = item.select_one(".rating_score")
                rating = rating_elem.text.strip() if rating_elem else "0"

                # 상품 URL
                link_elem = item.select_one(".product_link a")
                product_url = link_elem.get("href", "") if link_elem else ""

                products.append({
                    "rank": idx,
                    "name": name,
                    "price": price,
                    "site": site,
                    "reviews": reviews,
                    "rating": rating,
                    "url": product_url
                })

                print(f"  {idx}위: {site} - {name} (리뷰: {reviews}, 평점: {rating})")

            except Exception as e:
                print(f"  상품 {idx} 추출 오류: {e}")
                continue

        return products
    except Exception as e:
        print(f"크롤링 오류: {e}")
        return []


def analyze_success_factors(products):
    """
    성공 요인 분석

    Args:
        products: 상품 리스트

    Returns:
        dict: 분석 결과
    """
    analysis = {
        "top_sellers": [],
        "common_traits": defaultdict(int),
        "price_range": {"min": float("inf"), "max": 0},
        "content_strategy": [],
        "shipping_info": []
    }

    for product in products:
        # 상위 판매처
        if product["site"] not in [s["name"] for s in analysis["top_sellers"]]:
            analysis["top_sellers"].append({
                "name": product["site"],
                "rank": product["rank"],
                "reviews": product["reviews"],
                "rating": product["rating"]
            })

        # 가격대 분석 (숫자 추출)
        try:
            price_str = product["price"].replace(",", "").replace("원", "")
            if price_str.isdigit():
                price = int(price_str)
                analysis["price_range"]["min"] = min(analysis["price_range"]["min"], price)
                analysis["price_range"]["max"] = max(analysis["price_range"]["max"], price)
        except:
            pass

    return analysis


def save_analysis_result(keyword, products, analysis):
    """
    분석 결과 저장

    Args:
        keyword: 검색어
        products: 상품 리스트
        analysis: 분석 결과
    """
    os.makedirs("../data", exist_ok=True)
    os.makedirs("../analysis", exist_ok=True)

    # 원본 데이터 저장
    with open(f"../data/top_sellers_{keyword}.json", "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    # 분석 결과 저장
    with open(f"../analysis/top_sellers_analysis_{keyword}.json", "w", encoding="utf-8") as f:
        json.dump(analysis, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 데이터가 저장되었습니다:")
    print(f"   - ../data/top_sellers_{keyword}.json")
    print(f"   - ../analysis/top_sellers_analysis_{keyword}.json")


def generate_insights_report(keyword, analysis):
    """
    인사이트 리포트 생성

    Args:
        keyword: 검색어
        analysis: 분석 결과
    """
    report = f"""# {keyword} 상위 판매 사이트 인사이트 분석

## 상위 판매처 랭킹

"""

    for idx, seller in enumerate(analysis["top_sellers"], 1):
        report += f"""### {idx}위: {seller["name"]}
- **노출 순위**: {seller["rank"]}위
- **리뷰 수**: {seller["reviews"]}
- **평점**: {seller["rating"]}

"""

    report += f"""## 가격대 분석

- **최저가**: {analysis["price_range"]["min"]:,}원
- **최고가**: {analysis["price_range"]["max"]:,}원
- **가격 격차**: {analysis["price_range"]["max"] - analysis["price_range"]["min"]:,}원

## 시사점

### 성공 요인
1. **리뷰 마케팅**: 상위 판매처들은 리뷰 수가 많음
2. **가격 경쟁력**: 중간 가격대 형성
3. **브랜드 인지도**: 검색 상단 노출

### 벤치마킹 포인트
- 상위 1~3위 사이트의 상세페이지 구조
- 리뷰 관리 전략
- 가격 정책

### 개선 기회
- 상위 사이트의 부족한 부분 파악 필요
- 리뷰 분석을 통한 고객 Needs 도출
"""

    os.makedirs("../reports", exist_ok=True)
    with open(f"../reports/insights_{keyword}.md", "w", encoding="utf-8") as f:
        f.write(report)

    print(f"✅ 리포트가 저장되었습니다: ../reports/insights_{keyword}.md")


def main():
    """메인 함수"""
    # 분석할 아이템
    items = ["원피스", "치마", "스커트", "샴푸바"]

    print("상위 판매 사이트 분석을 시작합니다...\n")

    for item in items:
        print(f"\n{'='*50}")
        print(f"검색어: {item}")
        print('='*50)

        # 상위 5개 상품 크롤링
        products = scrape_naver_shopping_top_products(item, top_n=5)

        if products:
            # 성공 요인 분석
            analysis = analyze_success_factors(products)

            # 결과 저장
            save_analysis_result(item, products, analysis)

            # 인사이트 리포트 생성
            generate_insights_report(item, analysis)
        else:
            print(f"⚠️  {item} 상품을 찾을 수 없습니다.")

        print("\n")

    print("✅ 모든 분석 완료!")


if __name__ == "__main__":
    main()
