#!/usr/bin/env python3
"""
네이버 데이터랩 전체 자동 수집기
연관검색어 + 쇼핑인사이트 일괄 수집
"""
import json
import time
import os
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from datetime import datetime

# 대상 카테고리와 키워드
CATEGORIES = {
    "샴푸바": {"related": ["샴푸바", "솔리드 샴푸", "고체 샴푸"], "shopping": "샴푸바"},
    "바디바": {"related": ["바디바", "솔리드 바드워시", "고체 바드워시"], "shopping": "바디바"},
    "치마": {"related": ["치마", "스커트", "미니 스커트", "롱 스커트"], "shopping": "치마"},
    "스커트": {"related": ["스커트", "치마", "롱 스커트", "미니 스커트", "플리츠 스커트"], "shopping": "스커트"},
    "원피스": {"related": ["원피스", "드레스", "미디 원피스", "롱 원피스"], "shopping": "원피스"}
}


def setup_driver(download_dir):
    """Chrome 드라이버 설정"""
    chrome_options = Options()
    # 헤드리스 모드 제거 (네이버 차단 방지)
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")

    chrome_options.add_experimental_option("prefs", {
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True
    })

    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(1920, 1080)
    return driver


def collect_related_keywords(driver, keywords, category_name, download_dir):
    """연관검색어 수집 (검색어트렌드로 통합됨)"""
    print(f"  🔍 [{category_name}] 연관검색어 수집...")

    # 2026년 데이터랩 개편: /keyword/related/ → /keyword/trendSearch.naver
    url = "https://datalab.naver.com/keyword/trendSearch.naver"
    driver.get(url)

    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "keyword_search_box"))
        )
        time.sleep(2)

        search_box = driver.find_element(By.CLASS_NAME, "keyword_search_box")
        search_box.clear()
        search_box.send_keys(",".join(keywords))
        time.sleep(1)

        search_button = driver.find_element(By.CLASS_NAME, "btn_search")
        search_button.click()

        print(f"     - 로딩 중...")
        time.sleep(5)

        download_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "btn_excel"))
        )
        download_btn.click()

        time.sleep(3)

        downloaded_files = list(Path(download_dir).glob("*.xlsx"))
        if downloaded_files:
            latest_file = max(downloaded_files, key=lambda p: p.stat().st_mtime)
            new_name = Path(download_dir) / f"연관검색어_{category_name}.xlsx"
            latest_file.rename(new_name)
            print(f"     ✅ {new_name.name}")
            return str(new_name)

    except Exception as e:
        print(f"     ❌ 오류: {e}")
        return None


def collect_shopping_insight(driver, keyword, category_name, download_dir):
    """쇼핑인사이트 수집"""
    print(f"  🛒 [{category_name}] 쇼핑인사이트 수집...")

    # 2026년 데이터랩 개편: /shoppingInsight/ → /shoppingInsight/sKeyword.naver (검색어 통계)
    url = "https://datalab.naver.com/shoppingInsight/sKeyword.naver"
    driver.get(url)

    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "search_input"))
        )
        time.sleep(2)

        search_input = driver.find_element(By.CLASS_NAME, "search_input")
        search_input.clear()
        search_input.send_keys(keyword)
        time.sleep(1)

        search_button = driver.find_element(By.CLASS_NAME, "btn_search")
        search_button.click()

        print(f"     - 로딩 중...")
        time.sleep(5)

        download_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "btn_excel"))
        )
        download_btn.click()

        time.sleep(3)

        downloaded_files = list(Path(download_dir).glob("*.xlsx"))
        if downloaded_files:
            latest_file = max(downloaded_files, key=lambda p: p.stat().st_mtime)
            new_name = Path(download_dir) / f"쇼핑인사이트_{category_name}.xlsx"
            latest_file.rename(new_name)
            print(f"     ✅ {new_name.name}")
            return str(new_name)

    except Exception as e:
        print(f"     ❌ 오류: {e}")
        return None


def main():
    """메인 실행 함수"""
    download_dir = "/Volumes/MINIY/중랑/data/user_downloaded"
    os.makedirs(download_dir, exist_ok=True)

    print("\n" + "=" * 60)
    print("🤖 네이버 데이터랩 전체 자동 수집기")
    print("=" * 60)

    driver = setup_driver(download_dir)
    results = {"related": [], "shopping": []}

    try:
        for category, data in CATEGORIES.items():
            print(f"\n📂 [{category}] 수집 시작")
            print("-" * 40)

            # 연관검색어 수집
            related_file = collect_related_keywords(
                driver, data["related"], category, download_dir
            )
            if related_file:
                results["related"].append({"category": category, "file": related_file})

            time.sleep(2)

            # 쇼핑인사이트 수집
            shopping_file = collect_shopping_insight(
                driver, data["shopping"], category, download_dir
            )
            if shopping_file:
                results["shopping"].append({"category": category, "file": shopping_file})

            time.sleep(2)

        # 결과 요약
        print("\n" + "=" * 60)
        print("📊 수집 결과 요약")
        print("=" * 60)
        print(f"\n연관검색어: {len(results['related'])}/5 개")
        for r in results['related']:
            print(f"  ✅ {r['category']}")
        print(f"\n쇼핑인사이트: {len(results['shopping'])}/5 개")
        for r in results['shopping']:
            print(f"  ✅ {r['category']}")

        # 결과 저장
        result_file = Path(download_dir) / "datalab_collection_log.json"
        with open(result_file, "w", encoding="utf-8") as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "results": results
            }, f, ensure_ascii=False, indent=2)

        print(f"\n📁 전체 저장 위치: {download_dir}")

    finally:
        driver.quit()

    print("\n" + "=" * 60)
    print("🎉 전체 수집 완료!")
    print("=" * 60)


if __name__ == "__main__":
    main()
