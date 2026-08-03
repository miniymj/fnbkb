#!/usr/bin/env python3
"""
네이버 데이터랩 쇼핑인사이트 자동 수집기
Selenium으로 웹 크롤링
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
    "샴푸바": ["샴푸바"],
    "바디바": ["바디바"],
    "치마": ["치마"],
    "스커트": ["스커트"],
    "원피스": ["원피스"]
}


def setup_driver(download_dir):
    """Chrome 드라이버 설정"""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 헤드리스 모드
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")

    # 다운로드 디렉토리 설정
    chrome_options.add_experimental_option("prefs", {
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True
    })

    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(1920, 1080)
    return driver


def collect_shopping_insight(driver, keyword, category_name, download_dir):
    """
    네이버 데이터랩 쇼핑인사이트 수집

    Args:
        driver: Selenium WebDriver
        keyword: 검색할 키워드
        category_name: 카테고리명
        download_dir: 다운로드 경로
    """
    print(f"\n🛒 [{category_name}] 쇼핑인사이트 수집 시작...")

    # 네이버 데이터랩 쇼핑인사이트 페이지
    url = "https://datalab.naver.com/shoppingInsight/"
    driver.get(url)

    try:
        # 페이지 로딩 대기
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "search_input"))
        )
        time.sleep(2)

        # 검색창에 키워드 입력
        search_input = driver.find_element(By.CLASS_NAME, "search_input")
        search_input.clear()
        search_input.send_keys(keyword)

        print(f"   - 입력 키워드: {keyword}")
        time.sleep(1)

        # 검색 버튼 클릭
        search_button = driver.find_element(By.CLASS_NAME, "btn_search")
        search_button.click()

        # 결과 로딩 대기
        print("   - 데이터 로딩 중...")
        time.sleep(5)

        # 엑셀 다운로드 버튼 찾기 및 클릭
        download_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "btn_excel"))
        )
        download_btn.click()

        print(f"   ✅ 다운로드 시작!")
        time.sleep(3)  # 다운로드 완료 대기

        # 다운로드된 파일 확인 및 이름 변경
        downloaded_files = list(Path(download_dir).glob("*.xlsx"))
        if downloaded_files:
            latest_file = max(downloaded_files, key=lambda p: p.stat().st_mtime)
            new_name = Path(download_dir) / f"쇼핑인사이트_{category_name}.xlsx"
            latest_file.rename(new_name)
            print(f"   ✅ 저장 완료: {new_name.name}")
            return str(new_name)
        else:
            print(f"   ⚠️  다운로드된 파일을 찾을 수 없습니다")
            return None

    except Exception as e:
        print(f"   ❌ 오류 발생: {e}")
        return None


def main():
    """메인 실행 함수"""
    # 다운로드 디렉토리 설정
    download_dir = "/Volumes/MINIY/중랑/data/user_downloaded"
    os.makedirs(download_dir, exist_ok=True)

    print("=" * 60)
    print("🛒 네이버 데이터랩 쇼핑인사이트 자동 수집기")
    print("=" * 60)

    # 드라이버 설정
    driver = setup_driver(download_dir)

    try:
        results = []
        for category, keywords in CATEGORIES.items():
            keyword = keywords[0]  # 첫 번째 키워드만 사용
            result = collect_shopping_insight(driver, keyword, category, download_dir)
            if result:
                results.append({
                    "category": category,
                    "file": result,
                    "keyword": keyword
                })
            time.sleep(2)  # 카테고리 간 간격

        print("\n" + "=" * 60)
        print("📊 수집 결과 요약")
        print("=" * 60)

        for r in results:
            print(f"✅ {r['category']}: {Path(r['file']).name}")

        # 결과 저장
        result_file = Path(download_dir) / "shopping_insights_collection_log.json"
        with open(result_file, "w", encoding="utf-8") as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "results": results
            }, f, ensure_ascii=False, indent=2)

        print(f"\n📁 저장 위치: {download_dir}")

    finally:
        driver.quit()
        print("\n🎉 쇼핑인사이트 수집 완료!")


if __name__ == "__main__":
    main()
