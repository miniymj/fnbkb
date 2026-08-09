# CLAUDE.md — 세션 베이스 컨텍스트

> 이 파일은 세션 간 이어가기를 위한 핵심 상태 파일입니다. 세션 시작 시 최신 커밋 로그와 대조해 갱신하세요.

## 1. 프로젝트 개요
- **과정**: 패션뷰티 특화 디지털 셀러 양성과정 (2026.08)
- **목표**: 창업 아이템 선정 → 시장조사 → 온라인 커머스 등록 → 실제 판매
- **후보 아이템**: 샴푸바(바디바) · 치마(스커트) · 원피스

## 2. 저장소 구조
- `knowledge-base-docs/` — Docusaurus KB 사이트 (GitHub Pages로 배포, git 하위 모듈 아님 — 루트 git `/Volumes/MINIY/중랑`에 포함)
- `{아이템}/` — 아이템별 원본 데이터 (키워드 xlsx · 리뷰 캡처 · 경쟁사 분석 등)
- `Knowledge Base/` — 수업 단원 원본 KB (스토리텔링 등)
- `PROJECT_PLAN.md` — 프로젝트 계획서 + 표준 폴더 구조 규약

## 3. 브랜드 상태 (8/9 기준)
- **6대 요소**: 01 네이밍 / 02 컬러 팔레트 / 03 타이포그래피 / 04 보이스앤톤 / 05 무드보드 / 06 슬로건
- **컬러 팔레트(02) — 3개 아이템 모두 완료**:
  - **바디바(가칭 하이피부 HIGHSKIN)**: 무드보드는 **Happy Natural Care**로 전환(7색 — Cream `#FFF8EF` 50% · Soft Pink `#F6A6B8` 20% · Milk Pink · Apricot · Soft Sage · Leaf Green · Deep Brown). 참고: KB 팔레트 문서는 아직 `Warm Clean`(전환 대기)
  - **치마**: *Confident Curation* — 네이비·아이보리·비스트·코랄·라벤더·차콜 (6색)
  - **원피스**: *Garden Sea · 바다의 정원* — 라군 블루 `#5B8FA8` Primary (6색, WCAG 12.3:1 AAA)
- **브랜드 패밀리**: 바디바(그린)·원피스(블루)·치마(네이비) — 웜톤 크림 공통 베이스, 경쟁사 차별화 완료
- **무드보드(05)**: 3개 아이템 HTML 무드보드 완성 → `moodboard-{bodybar,skirt,onesie}.html` (바디바는 **하이피부/Happy Natural Care** 버전, Unsplash 외부 이미지, 루트에 위치, 10섹션 공통 포맷)
- **AI 무드보드 프롬프트**: `docs/branding/moodboard-prompt-guide.md` — 나노바나 프로용 3종 (하이피부·치마·원피스) + 로고 생성(A/B) + 제품 시각화(P1/P2) 부록
- **하이피부 제품 아이디어**: `docs/branding/highskin-product-ideas.md` — 샴푸브러시×비누 홀더(리필·반복구매) + 여행용 미니(50g+거품망) 세트
- **하이피부 픽커 퀴즈**: `docs/branding/highskin-picker-quiz.md` — 구매 홈페이지 설문(피부타입·향·눈코입 커스텀 4×3×4=48조합) → 추천 상품+쿠폰. 스모어 제작, 그래픽은 가이드 부록 B(G1부품시트/G2캐릭터4종/G3 UI데코)
- **다음 단계**: 03 타이포그래피 → 04 보이스앤톤 → 06 슬로건 (아이템별), 이후 커머스 등록 단계

## 4. 배포 운영 (GitHub Pages)
- **트리거**: `push` / `workflow_dispatch` (`deploy.yml`, 빌드→deploy)
- **라이브**: https://miniymj.github.io/fnbkb/ — 문서 URL 패턴 `/docs/{카테고리}/{slug}/`
- **⚠️ 배포 스틱 이슈**: deploy job이 간헐적으로 무한 대기(5분+) → 240초 초과 시 취소→재디스패치
  ```bash
  gh run cancel {RUN_ID} --repo miniymj/fnbkb && sleep 15
  gh workflow run deploy.yml --repo miniymj/fnbkb
  ```
- **검증**: `curl -s -o /dev/null -w '%{http_code}' https://miniymj.github.io/fnbkb/docs/branding/{slug}/` → 200

## 5. 작업 규칙
- 커밋 컨벤션: 한글 + 태그 (`feat:`/`fix:`/`docs:`/`chore:`)
- 문서 추가·수정 시 `sidebars.ts` 반영 (Docusaurus)
- 컬러 팔레트 문서: WCAG 대비·CMYK 환산·색상환 하모니 검증 포함, 치마 팔레트와 동일한 섹션 템플릿 유지
- 빌드 검증: `cd knowledge-base-docs && npm run build` (SUCCESS 확인 후 push)
- 스마트스토어 판매 준비는 `docs/research/execution-plan.md` · `launch-playbook.md` 참조

## 6. 세션 이어가기 체크리스트
- [ ] `git log --oneline -10` — 최신 작업 확인
- [ ] `git status` — 미커밋/미추적 파일 정리 여부
- [ ] 배포 상태: `gh run list --repo miniymj/fnbkb --limit 3`
- [ ] 라이브 200 OK 확인
