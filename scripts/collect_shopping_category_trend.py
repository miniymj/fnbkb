#!/usr/bin/env python3
"""
네이버 데이터랩 쇼핑인사이트 업종별 트렌드 자동 수집기
업종 카테고리별 트렌드 데이터를 Selenium으로 웹 크롤링

업종별:
- 화장품/미용 > 바디바/샴푸
- 의류 > 치마/스커트
- 의류 > 원피스
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

# 업종별 카테고리 설정 (category_code는 네이버 데이터랩의 카테고리 코드)
# 실제 카테고리 코드는 웹페이지에서 확인 필요
CATEGORY_TARGETS = [
    {
        "name": "바디바_샴푸",
        "category_path": ["화장품/미용", "바디바/샴푸"],
        "keywords": ["바디바", "샴푸바", "고체샴푸"]
    },
    {
        "name": "치마_스커트",
        "category_path": ["의류", "치마/스커트"],
        "keywords": ["치마", "스커트", "플리츠스커트"]
    },
    {
        "name": "원피스",
        "category_path": ["의류", "원피스"],
        "keywords": ["원피스", "여름원피스", "휴양지원피스"]
    }
]


def setup_driver(download_dir):
    """Chrome 드라이버 설정"""
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # 새로운 헤드리스 모드
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    # 다운로드 디렉토리 설정
    chrome_options.add_experimental_option("prefs", {
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True,
        "plugins.always_open_pdf_externally": True
    })

    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(1920, 1080)

    # JavaScript 실행 방지 감회 우회
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            })
        """
    })

    return driver


def collect_category_trend(driver, target, download_dir):
    """
    네이버 데이터랩 쇼핑인사이트 업종별 트렌드 수집

    Args:
        driver: Selenium WebDriver
        target: 카테고리 타겟 정보 (dict)
        download_dir: 다운로드 경로
    """
    category_name = target["name"]
    keywords = target["keywords"]

    print(f"\n🛒 [{category_name}] 업종 트렌드 수집 시작...")
    print(f"   카테고리 경로: {' > '.join(target['category_path'])}")

    # 네이버 데이터랩 쇼핑인사이트 업종별 페이지
    # 2026년 개편: /shoppingInsights/sCategory.naver(구) → /shoppingInsight/sCategory.naver(신)
    url = "https://datalab.naver.com/shoppingInsight/sCategory.naver"
    driver.get(url)

    try:
        # 페이지 로딩 대기
        print("   - 페이지 로딩 중...")
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CLASS_NAME, "box_tab"))
        )
        time.sleep(2)

        # 업종 대분류 선택 (예: 화장품/미용, 의류)
        main_category = target["category_path"][0]
        print(f"   - 대분류 선택: {main_category}")

        # 대분류 탭 클릭
        category_tabs = driver.find_elements(By.CSS_SELECTOR, ".box_tab li a")
        for tab in category_tabs:
            if main_category in tab.text:
                driver.execute_script("arguments[0].click();", tab)
                time.sleep(2)
                break

        # 중분류 선택 (예: 바디바/샴푸, 치마/스커트, 원피스)
        sub_category = target["category_path"][1]
        print(f"   - 중분류 선택: {sub_category}")

        # 중분류 목록에서 해당 항목 찾기
        time.sleep(2)
        sub_items = driver.find_elements(By.CSS_SELECTOR, ".category_list .item")
        for item in sub_items:
            if sub_category in item.text:
                driver.execute_script("arguments[0].click();", item)
                time.sleep(2)
                break

        # 결과 로딩 대기
        print("   - 데이터 로딩 중...")
        time.sleep(5)

        # 엑셀 다운로드 버튼 찾기 및 클릭
        try:
            download_btn = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, ".btn_excel, .btn_download, button[class*='download']"))
            )
            driver.execute_script("arguments[0].click();", download_btn)
            print(f"   ✅ 다운로드 시작!")
            time.sleep(4)  # 다운로드 완료 대기

        except Exception as e:
            # 다른 선택자로 시도
            print(f"   ⚠️  기본 다운로드 버튼 실패, 대안 시도 중...")
            download_buttons = driver.find_elements(By.TAG_NAME, "button")
            for btn in download_buttons:
                if "엑셀" in btn.text or "다운로드" in btn.text or "excel" in btn.get_attribute("class", "").lower():
                    driver.execute_script("arguments[0].click();", btn)
                    print(f"   ✅ 다운로드 시작 (대안)!")
                    time.sleep(4)
                    break

        # 다운로드된 파일 확인 및 이름 변경
        downloaded_files = list(Path(download_dir).glob("*.xlsx"))
        downloaded_files.extend(list(Path(download_dir).glob("*.xls")))

        if downloaded_files:
            latest_file = max(downloaded_files, key=lambda p: p.stat().st_mtime)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            new_name = Path(download_dir) / f"업종트렌드_{category_name}_{timestamp}.xlsx"
            latest_file.rename(new_name)
            print(f"   ✅ 저장 완료: {new_name.name}")
            return str(new_name)
        else:
            print(f"   ⚠️  다운로드된 파일을 찾을 수 없습니다")
            return None

    except Exception as e:
        print(f"   ❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        return None


def main():
    """메인 실행 함수"""
    # 다운로드 디렉토리 설정
    download_dir = "/Volumes/MINIY/중랑/data/user_downloaded"
    os.makedirs(download_dir, exist_ok=True)

    print("=" * 60)
    print("🛒 네이버 데이터랩 쇼핑인사이트 업종별 트렌드 자동 수집기")
    print("=" * 60)

    # 드라이버 설정
    driver = None
    try:
        driver = setup_driver(download_dir)
    except Exception as e:
        print(f"❌ Chrome 드라이버 설정 실패: {e}")
        print("   ChromeDriver가 설치되어 있는지 확인하세요.")
        print("   설치 방법: brew install --cask chromedriver (macOS)")
        return

    try:
        results = []

        for target in CATEGORY_TARGETS:
            result = collect_category_trend(driver, target, download_dir)
            if result:
                results.append({
                    "category": target["name"],
                    "category_path": target["category_path"],
                    "file": result,
                    "keywords": target["keywords"]
                })
            time.sleep(3)  # 카테고리 간 간격 (차단 방지)

        print("\n" + "=" * 60)
        print("📊 수집 결과 요약")
        print("=" * 60)

        for r in results:
            print(f"✅ {r['category']}: {Path(r['file']).name}")

        # 결과 저장
        result_file = Path(download_dir) / f"category_trend_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(result_file, "w", encoding="utf-8") as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "results": results
            }, f, ensure_ascii=False, indent=2)

        print(f"\n📁 저장 위치: {download_dir}")

    except KeyboardInterrupt:
        print("\n⚠️  사용자에 의해 중단되었습니다.")
    except Exception as e:
        print(f"\n❌ 치명적 오류: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if driver:
            driver.quit()
            print("\n🎉 드라이버 종료!")


if __name__ == "__main__":
    main()
