import CsvTable from '@site/src/components/CsvTable';

# 8/7 비주얼 브랜딩·채널 기획 결과물 — 공통

> **작성일**: 2026-08-09
> **근거 자료**: `0807Visual_Braning_design_channels/` — 강의 결과물 예시 4종 분석
> **범위**: 모듈 C·D(채널·콘텐츠 전략)의 실제 산출물 — 공통 정의 · 원본 이미지 · 공통 캘린더 데이터
> **아이템별 적용**: [하이피부](/docs/marketing/visual-branding-highskin) · [치마](/docs/marketing/visual-branding-skirt) · [원피스](/docs/marketing/visual-branding-onesie)

---

## 0. 결과물 4종 분석 (강의 산출물 정의)

| # | 결과물 | 형태 | 필수 구성 |
|---|---|---|---|
| **①** | 비주얼 브랜딩 설계 (1-1 ~ 1-5) | 설계 보드 5장 | 컬러 팔레트 · 타이포그래피 · 로고/심벌 · 무드보드 · 패키지/채널 적용 |
| **②** | 채널 카드뉴스 — 인스타 (2) | 인스타그램 카드뉴스 | 브랜드 소개 · 제품 · 정보 · 참여 유도 (4장 구성) |
| **③** | 2026 마케팅 이슈 캘린더 (3) | 연중 이슈 PDF | 월별 테마 · 키워드 · 공휴일 · 기념일 · 업종별 이벤트 |
| **④** | 연·월 행사 마케팅 콘텐츠 캘린더 (4) | 연간 캘린더 표 | 연간 테마 → 월별 콘텐츠 매핑 |

> **2026 연간 이슈 요약** (PDF 분석): 붉은 말의 해(병오년) · 2026 동계올림픽 · 새학기 · 벚꽃 시즌 · 가정의 달 · 2026 FIFA 월드컵 · 프로야구 · 여름 휴가 · 추석 특수 · 마라톤 이벤트 · 수능·대규모 쇼핑 기획전 · 크리스마스·연말 특수
> **2026 실제 날짜 검증** (외부 검색 — 위키백과 공휴일 법률 · 국제대회 일정): 설 연휴 **2/16~18** · 동계올림픽 **2/6~22** · 노동절 **5/1**(신규) · 제헌절 **7/17**(부활) · 월드컵 **6/11~7/19** · 추석 연휴 **9/24~26** · 수능 **11/19** — 📊 [`2026_holidays.csv`](/data/marketing-calendar/2026_holidays.csv) · [`2026_key_events.csv`](/data/marketing-calendar/2026_key_events.csv) · [`2026_marketing_issues.csv`](/data/marketing-calendar/2026_marketing_issues.csv)

---

## 📸 8/7 결과물 원본 이미지 (강의 자료)

> 원본: `0807Visual_Braning_design_channels/` → KB `static/img/class-0807/` · 이미지를 클릭하면 원본 크기로 열립니다.

### ① 비주얼 브랜딩 설계 (5장)
![비주얼 브랜딩 설계 1](/img/class-0807/visual-branding-design-1.webp)
![비주얼 브랜딩 설계 2](/img/class-0807/visual-branding-design-2.webp)
![비주얼 브랜딩 설계 3](/img/class-0807/visual-branding-design-3.webp)
![비주얼 브랜딩 설계 4](/img/class-0807/visual-branding-design-4.webp)
![비주얼 브랜딩 설계 5](/img/class-0807/visual-branding-design-5.webp)

### ② 인스타 채널 카드뉴스
![인스타 채널 카드뉴스](/img/class-0807/insta-cardnews-1.webp)

### ③ 2026 마케팅 이슈 캘린더 (PDF)
📥 [2026 마케팅 이슈 캘린더 PDF 다운로드](/img/class-0807/2026-marketing-issue-calendar.pdf)

### ④ 연·월 행사 마케팅 콘텐츠 캘린더
![연월 행사 콘텐츠 캘린더](/img/class-0807/yearly-content-calendar.webp)

---

## 📊 공통 캘린더 데이터 (CSV)

> 아래 표는 `static/data/marketing-calendar/*.csv`를 실시간 렌더링한 것입니다. CSV가 갱신되면 이 표도 자동 반영됩니다.
> 아이템별 이슈 캘린더와 콘텐츠 캘린더는 각 아이템 페이지에서 확인하세요: [하이피부](/docs/marketing/visual-branding-highskin) · [치마](/docs/marketing/visual-branding-skirt) · [원피스](/docs/marketing/visual-branding-onesie)

### 2026 공휴일
<CsvTable src="/data/marketing-calendar/2026_holidays.csv" caption="📅 2026 대한민국 공휴일 (실제 날짜 검증)" />

### 2026 대형 이벤트
<CsvTable src="/data/marketing-calendar/2026_key_events.csv" caption="🏆 2026 대형 이벤트" />

### 2026 월별 마케팅 이슈 (공통)
<CsvTable src="/data/marketing-calendar/2026_marketing_issues.csv" caption="📌 2026 월별 마케팅 이슈" />

---

## 연관 문서
- 아이템별 결과물: [하이피부](/docs/marketing/visual-branding-highskin) · [치마](/docs/marketing/visual-branding-skirt) · [원피스](/docs/marketing/visual-branding-onesie)
- 채널·콘텐츠 전략: `marketing/highskin-channel-strategy.md` (하이피부 퍼널·캘린더 기초)
- 무드보드: `moodboard-{bodybar,skirt,onesie}.html` · 팔레트: `bodybar-color-palette.md` · `skirt-brand-color-palette.md` · `onesie-brand-color-palette.md`
- 이미지 생성: `branding/moodboard-prompt-guide.md` **부록 E**
- 런칭: `marketing/launch-playbook.md`
---
