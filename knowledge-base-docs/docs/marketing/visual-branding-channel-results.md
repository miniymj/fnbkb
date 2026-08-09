import CsvTable from '@site/src/components/CsvTable';

# 8/7 비주얼 브랜딩·채널 기획 결과물 — 3개 아이템 적용

> **작성일**: 2026-08-09
> **근거 자료**: `0807Visual_Braning_design_channels/` — 강의 결과물 예시 4종 분석
> **범위**: 모듈 C·D(채널·콘텐츠 전략)의 실제 산출물 — 3개 아이템(하이피부·치마·원피스) 각각 적용
> **이미지 생성**: 실제 생성은 추후 진행, 여기서는 **이미지 생성 프롬프트**(`moodboard-prompt-guide.md` 부록 E)로 작성

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

## 📊 캘린더 데이터 시각화 (CSV)

> 아래 표는 `static/data/marketing-calendar/*.csv`를 실시간 렌더링한 것입니다. CSV가 갱신되면 이 표도 자동 반영됩니다.

### 2026 공휴일
<CsvTable src="/data/marketing-calendar/2026_holidays.csv" caption="📅 2026 대한민국 공휴일 (실제 날짜 검증)" />

### 2026 대형 이벤트
<CsvTable src="/data/marketing-calendar/2026_key_events.csv" caption="🏆 2026 대형 이벤트" />

### 하이피부 월별 이슈 캘린더
<CsvTable src="/data/marketing-calendar/issue_calendar_highskin.csv" caption="🛁 하이피부 이슈 캘린더" highlightKey="priority" />

### 치마 월별 이슈 캘린더
<CsvTable src="/data/marketing-calendar/issue_calendar_skirt.csv" caption="👗 치마 이슈 캘린더" highlightKey="priority" />

### 원피스 월별 이슈 캘린더
<CsvTable src="/data/marketing-calendar/issue_calendar_onesie.csv" caption="🌊 원피스 이슈 캘린더" highlightKey="priority" />

### 하이피부 4주 콘텐츠 캘린더
<CsvTable src="/data/marketing-calendar/4week_content_highskin.csv" caption="🗓 하이피부 4주 콘텐츠 캘린더" />

---


# 1. 하이피부(HIGHSKIN) — 바디바

## 1-① 비주얼 브랜딩 설계 (5장)
| 장 | 내용 | 확정값 |
|---|---|---|
| 1. 컬러 팔레트 | 7색 + 비율 | 크림 `#FFF8EF` 50% · 소프트 핑크 `#F6A6B8` 20% · 밀크 핑크 12% · 세이지 8% · 애프리콧 7% · 리프 그린 5% · 딥 브라운 3% |
| 2. 타이포그래피 | 라운드 산세리프 + 손글씨 | 제목 라운드(Noto Sans KR 계열) · 로고 손글씨 · 본문 Light |
| 3. 로고/심벌 | 표정 콜라주 | 2x3 얼굴 콜라주(컬러) + 단색 각인용(모노크롬) — 부록 A |
| 4. 무드보드 | 크림-핑크 파스텔 | 아이 손그림 · 비눗방울 · 거품 · 가족 목욕 (`moodboard-bodybar.html`) |
| 5. 패키지/적용 | 비누 각인 + 크래프트지 | 딥 브라운 각인 · 리필 홀더 + 여행 미니 세트 패키지 |

> 📎 강의 원본 예시: 아래 **결과물 원본 이미지 갤러리** 참조 (비주얼 설계 1~5)

### 🧼 바디바 무드보드 (ChatGPT 생성 · 3안)

> 프롬프트 1(HIGHSKIN Happy Natural Care) 기반으로 ChatGPT에서 생성한 무드보드 3안. 10구역 그리드 레이아웃에 하이피부 7색 팔레트·아이 손그림 캐릭터·리필 홀더·가족 목욕 무드 반영. 원본: `0807Visual_Braning_design_channels/`

![바디바 무드보드 1안](/img/class-0807/bodybar-moodboard-1.webp)
![바디바 무드보드 2안](/img/class-0807/bodybar-moodboard-2.webp)
![바디바 무드보드 3안](/img/class-0807/bodybar-moodboard-3.webp)

> **활용**: 위 무드보드의 시각 방향(크림 베이스·파스텔 그리드·아이 손그림 캐릭터)을 **P3 바디바 언박싱 패키지 디자인**에도 동일하게 적용 → `moodboard-prompt-guide.md` 부록 C P3 참고

## 1-② 인스타 채널 카드뉴스 (4장)
> 📥 [카드뉴스 전체 데이터 CSV](/data/marketing-calendar/cardnews_all.csv) — 3개 아이템 12장
- 구성: ①브랜딩(캐릭터 탄생) ②판매(리필 홀더 세트) ③정보(민감피부 성분) ④참여(픽커 퀴즈)

## 1-③ 2026 마케팅 이슈 캘린더 연동
> 📥 [하이피부 이슈 캘린더 CSV](/data/marketing-calendar/issue_calendar_highskin.csv) · [2026 공통 이슈 CSV](/data/marketing-calendar/2026_marketing_issues.csv)
- **피크**: 설(2월) · 가정의 달(5월) · 여름 휴가(6~7월) · 쇼핑 기획전(11~12월)
- **핵심 캠페인**: 6~7월 여행 세트 + 픽커 퀴즈 · 9월 추석 선물세트 · 리필 구독 연동

## 1-④ 연·월 콘텐츠 캘린더
> 📥 [하이피부 4주 콘텐츠 캘린더 CSV](/data/marketing-calendar/4week_content_highskin.csv)
- **연간 테마**: "가족의 일상에 즐거운 목욕 습관"
- **월 4회**: 브랜딩 1(캐릭터) · 정보 1(민감피부) · 참여 1(픽커/투표) · 판매 1(리필·세트)
- **시즌 피크**: 2월(설) · 5월(가정의달) · 6~7월(휴가) · 11~12월(기획전)

## 1-⑤ 이미지 생성 프롬프트
→ `moodboard-prompt-guide.md` **부록 E** — E1(비주얼 설계 보드) · E2(카드뉴스) · E3(이슈 캘린더 인포그래픽) · E4(콘텐츠 캘린더) — 하이피부 7색 적용본 참고


---

# 2. 치마(SKIRT) — Confident Curation

## 2-① 비주얼 브랜딩 설계 (5장)
| 장 | 내용 | 확정값 |
|---|---|---|
| 1. 컬러 팔레트 | 네이비 앵커 6색 | 넌 트루 네이비 `#1B3A5C` 35~40% · 웜 아이보리 `#F7F4EF` · 샌드 비스트 `#C4A77D` · 블러시 코랄 `#D4856A` · 소프트 라벤더 `#A89BB5` · 인크 차콜 `#2C2E31` |
| 2. 타이포그래피 | Serif + Sans | 제목 Cormorant Garamond 400 · 본문 Noto Sans KR Light · Inter Light |
| 3. 로고/심벌 | 네이비 워드마크 | 단정한 세리프 "SKIRT" + 체형/상황 아이콘 |
| 4. 무드보드 | 편집화보 무드 | 오피스·면접·웨딩하객 장면, 테일러링 우브 (`moodboard-skirt.html`) |
| 5. 패키지/적용 | 상세페이지 · 라벨 | 아이보리 라벨 + 네이비 텍스트, 사이즈·상황 태그 |

> 📎 강의 원본 예시: 아래 **결과물 원본 이미지 갤러리** 참조 (비주얼 설계 1~5)

## 2-② 인스타 채널 카드뉴스 (4장)
> 📥 [카드뉴스 전체 데이터 CSV](/data/marketing-calendar/cardnews_all.csv)
- 구성: ①브랜딩(첫인상 3초) ②정보(체형별 핏) ③판매(상황별 3세트) ④참여(스타일 투표)

## 2-③ 2026 마케팅 이슈 캘린더 연동
> 📥 [치마 이슈 캘린더 CSV](/data/marketing-calendar/issue_calendar_skirt.csv)
- **피크**: 취준(3월·11월) · 하객(5월·9월) · 연말 파티(12월)

## 2-④ 연·월 콘텐츠 캘린더 (요약)
- **연간 테마**: "상황에 맞는 완벽한 핏, 체형에 맞는 나만의 스타일"
- **월 4회**: 정보(상황별 코디) 2 · 판매 1 · 참여 1
- **시즌 피크**: 3~5월(취준·하객) · 11~12월(면접·연말)

## 2-⑤ 이미지 생성 프롬프트
→ `moodboard-prompt-guide.md` **부록 E** — 치마용 변형: 네이비·아이보리 팔레트, 편집화보 무드 적용

---

# 3. 원피스(RESORT ONESIE) — Garden Sea

## 3-① 비주얼 브랜딩 설계 (5장)
| 장 | 내용 | 확정값 |
|---|---|---|
| 1. 컬러 팔레트 | 라군 블루 앵커 6색 | 라군 블루 `#5B8FA8` 40% · 세라믹 화이트 `#F5F0EB` 25% · 샌드 베이지 `#C4A882` 15% · 코랄 블러썸 `#E8917A` · 소프트 세이지 `#A8B5A0` · 딥 챠콜 `#2C2C2C` |
| 2. 타이포그래피 | Serif + Sans | 제목 Cormorant Garamond 300 · 본문 Noto Sans KR Light · Inter Light |
| 3. 로고/심벌 | 여유로운 워드마크 | "RESORT ONESIE" + 파도/해변 아이콘 |
| 4. 무드보드 | 바다·리조트 무드 | 수평선·리조트 풀·해변 실루엣 (`moodboard-onesie.html`) |
| 5. 패키지/적용 | 라벨 · 행거택 | 세라믹 화이트 라벨 + 라군 블루 포인트, 사이즈(44~120) 안내 |

> 📎 강의 원본 예시: 아래 **결과물 원본 이미지 갤러리** 참조 (비주얼 설계 1~5)

## 3-② 인스타 채널 카드뉴스 (4장)
> 📥 [카드뉴스 전체 데이터 CSV](/data/marketing-calendar/cardnews_all.csv)
- 구성: ①브랜딩(모두가 아름다운 바다) ②정보(사이즈프리 핏) ③판매(휴양지 코디 3종) ④참여(휴양 무드 투표)

## 3-③ 2026 마케팅 이슈 캘린더 연동
> 📥 [원피스 이슈 캘린더 CSV](/data/marketing-calendar/issue_calendar_onesie.csv)
- **핵심 시즌**: 여름 휴가(6~8월) — 여행 캠페인 주 3회
- **기타**: 벚꽃(4월) · 가족 여행(5~6월) · 추석(9월) · 연말 여행(12월)

## 3-④ 연·월 콘텐츠 캘린더 (요약)
- **연간 테마**: "양자택일 없는 사이즈프리 휴양지원피스"
- **월 4회**: 정보(사이즈·코디) 2 · 판매 1 · 참여 1
- **시즌 피크**: 6~8월(휴가) · 12월(연말 여행)

## 3-⑤ 이미지 생성 프롬프트
→ `moodboard-prompt-guide.md` **부록 E** — 원피스용 변형: 라군 블루·세라믹 화이트 팔레트, 바다·리조트 무드 적용

---

## 연관 문서
- 채널·콘텐츠 전략: `marketing/highskin-channel-strategy.md` (하이피부 퍼널·캘린더 기초)
- 무드보드: `moodboard-{bodybar,skirt,onesie}.html` · 팔레트: `bodybar-color-palette.md` · `skirt-brand-color-palette.md` · `onesie-brand-color-palette.md`
- 이미지 생성: `branding/moodboard-prompt-guide.md` **부록 E**
- 런칭: `marketing/launch-playbook.md`
---