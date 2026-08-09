import CsvTable from '@site/src/components/CsvTable';

# 1. 하이피부(HIGHSKIN) — 바디바 · 비주얼 브랜딩·채널 결과물

> **작성일**: 2026-08-09
> **범위**: [공통 결과물 정의](/docs/marketing/visual-branding-common) 기반, 하이피부(바디바) 아이템 적용분
> **이미지 생성**: 실제 생성은 추후 진행, 여기서는 **이미지 생성 프롬프트**(`moodboard-prompt-guide.md` 부록 E)로 작성

---

## 1-① 비주얼 브랜딩 설계 (5장)
| 장 | 내용 | 확정값 |
|---|---|---|
| 1. 컬러 팔레트 | 7색 + 비율 | 크림 `#FFF8EF` 50% · 소프트 핑크 `#F6A6B8` 20% · 밀크 핑크 12% · 세이지 8% · 애프리콧 7% · 리프 그린 5% · 딥 브라운 3% |
| 2. 타이포그래피 | 라운드 산세리프 + 손글씨 | 제목 라운드(Noto Sans KR 계열) · 로고 손글씨 · 본문 Light |
| 3. 로고/심벌 | 표정 콜라주 | 2x3 얼굴 콜라주(컬러) + 단색 각인용(모노크롬) — 부록 A |
| 4. 무드보드 | 크림-핑크 파스텔 | 아이 손그림 · 비눗방울 · 거품 · 가족 목욕 (`moodboard-bodybar.html`) |
| 5. 패키지/적용 | 비누 각인 + 크래프트지 | 딥 브라운 각인 · 리필 홀더 + 여행 미니 세트 패키지 |

> 📎 강의 원본 예시: [공통 원본 이미지 갤러리](/docs/marketing/visual-branding-common) 참조 (비주얼 설계 1~5)

### 🧼 바디바 무드보드 (ChatGPT 생성 · 3안)

> 프롬프트 1(HIGHSKIN Happy Natural Care) 기반으로 ChatGPT에서 생성한 무드보드 3안. 10구역 그리드 레이아웃에 하이피부 7색 팔레트·아이 손그림 캐릭터·리필 홀더·가족 목욕 무드 반영. 원본: `0807Visual_Braning_design_channels/`

![바디바 무드보드 1안](/img/class-0807/bodybar-moodboard-1.webp)
![바디바 무드보드 2안](/img/class-0807/bodybar-moodboard-2.webp)
![바디바 무드보드 3안](/img/class-0807/bodybar-moodboard-3.webp)

> **활용**: 위 무드보드의 시각 방향(크림 베이스·파스텔 그리드·아이 손그림 캐릭터)을 **P3 바디바 언박싱 패키지 디자인**에도 동일하게 적용 → `moodboard-prompt-guide.md` 부록 C P3 참고

## 1-② 인스타 채널 카드뉴스 (4장)
> 📥 [카드뉴스 전체 데이터 CSV](/data/marketing-calendar/cardnews_all.csv) — 3개 아이템 12장
- 구성: ①브랜딩(캐릭터 탄생) ②판매(리필 홀더 세트) ③정보(민감피부 성분) ④참여(픽커 퀴즈)

## 1-③ 2026 마케팅 이슈 캘린더

> 📥 [2026 공통 이슈 CSV](/data/marketing-calendar/2026_marketing_issues.csv)
- **피크**: 설(2월) · 가정의 달(5월) · 여름 휴가(6~7월) · 쇼핑 기획전(11~12월)
- **핵심 캠페인**: 6~7월 여행 세트 + 픽커 퀴즈 · 9월 추석 선물세트 · 리필 구독 연동

### 하이피부 월별 이슈 캘린더
<CsvTable src="/data/marketing-calendar/issue_calendar_highskin.csv" caption="🛁 하이피부 이슈 캘린더" highlightKey="priority" />

## 1-④ 연·월 콘텐츠 캘린더
- **연간 테마**: "가족의 일상에 즐거운 목욕 습관"
- **월 4회**: 브랜딩 1(캐릭터) · 정보 1(민감피부) · 참여 1(픽커/투표) · 판매 1(리필·세트)
- **시즌 피크**: 2월(설) · 5월(가정의달) · 6~7월(휴가) · 11~12월(기획전)

### 하이피부 4주 콘텐츠 캘린더
<CsvTable src="/data/marketing-calendar/4week_content_highskin.csv" caption="🗓 하이피부 4주 콘텐츠 캘린더" />

## 1-⑤ 이미지 생성 프롬프트
→ `moodboard-prompt-guide.md` **부록 E** — E1(비주얼 설계 보드) · E2(카드뉴스) · E3(이슈 캘린더 인포그래픽) · E4(콘텐츠 캘린더) — 하이피부 7색 적용본 참고

---

## 연관 문서
- 전체 결과물 공통: [비주얼 브랜딩 결과물 공통](/docs/marketing/visual-branding-common)
- 채널·콘텐츠 전략: `marketing/highskin-channel-strategy.md` (하이피부 퍼널·캘린더 기초)
- 무드보드: `moodboard-bodybar.html` · 팔레트: `bodybar-color-palette.md`
- 이미지 생성: `branding/moodboard-prompt-guide.md` · [하이피부 전용 이미지 프롬프트](/docs/branding/highskin-image-prompts)
- 런칭: `marketing/launch-playbook.md`
---
