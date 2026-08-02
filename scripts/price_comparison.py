"""
가격비교 사이트 크롤링 스크립트
다나와, 네이버 쇼핑 등에서 가격 정보 수집
"""
import os
import time
import csv
import pandas as pd
from bs4 import BeautifulSoup
import requests


def scrape_naver_shopping(keyword):
    """
    네이버 쇼핑 가격 크롤링

    Args:
        keyword: 검색어

    Returns:
        list: 가격 정보 리스트
    """
    url = f"https://search.shopping.naver.com/search?k={keyword}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")

        products = []
        # 네이버 쇼핑 상품 요소 선택
        for item in soup.select(".product_info_area")[:20]:
            try:
                name_elem = item.select_one(".product_link")
                price_elem = item.select_one(".price_num")
                site_elem = item.select_one(".mall_name")

                if name_elem and price_elem:
                    name = name_elem.text.strip()
                    price = price_elem.text.strip().replace(",", "").replace("원", "")
                    site = site_elem.text.strip() if site_elem else "알 수 없음"

                    products.append({
                        "name": name,
                        "price": int(price) if price.isdigit() else 0,
                        "site": site
                    })
            except (AttributeError, ValueError):
                continue

        return products
    except Exception as e:
        print(f"네이버 쇼핑 크롤링 오류: {e}")
        return []


def analyze_price_data(products):
    """
    가격 데이터 분석

    Args:
        products: 상품 리스트

    Returns:
        dict: 분석 결과
    """
    if not products:
        return {}

    prices = [p["price"] for p in products if p["price"] > 0]

    if not prices:
        return {}

    return {
        "min_price": min(prices),
        "max_price": max(prices),
        "avg_price": sum(prices) // len(prices),
        "product_count": len(prices),
        "site_count": len(set(p["site"] for p in products))
    }


def save_price_data(keyword, products, analysis):
    """
    가격 데이터 저장

    Args:
        keyword: 검색어
        products: 상품 리스트
        analysis: 분석 결과
    """
    os.makedirs("../data", exist_ok=True)

    # 엑셀 저장
    df = pd.DataFrame(products)
    filename = f"../data/price_comparison_{keyword}.xlsx"
    df.to_excel(filename, index=False)

    # 분석 결과 저장
    analysis_filename = f"../data/price_analysis_{keyword}.json"
    import json
    with open(analysis_filename, "w", encoding="utf-8") as f:
        json.dump(analysis, f, ensure_ascii=False, indent=2)

    print(f"✅ 데이터가 저장되었습니다:")
    print(f"   - {filename}")
    print(f"   - {analysis_filename}")


def main():
    """메인 함수"""
    # 검색할 아이템
    items = ["원피스", "치마", "스커트", "샴푸바"]

    print("가격비교 데이터 수집을 시작합니다...")

    for item in items:
        print(f"\n검색 중: {item}")

        # 네이버 쇼핑 크롤링
        products = scrape_naver_shopping(item)

        if products:
            # 분석
            analysis = analyze_price_data(products)

            print(f"   상품 수: {analysis.get('product_count', 0)}")
            print(f"   최저가: {analysis.get('min_price', 0):,}원")
            print(f"   최고가: {analysis.get('max_price', 0):,}원")
            print(f"   평균가: {analysis.get('avg_price', 0):,}원")

            # 저장
            save_price_data(item, products, analysis)
        else:
            print(f"   ⚠️  상품을 찾을 수 없습니다.")

        time.sleep(2)  # 과도한 요청 방지

    print("\n✅ 모든 데이터 수집 완료!")


if __name__ == "__main__":
    main()
