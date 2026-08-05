# KB 협업 규칙 & 파일 매니페스트 (CONTRIBUTING)

> 다중 에이전트(외부 검색 강화 / 리뷰·보강)가 같은 저장소에서 **병렬 작업**하므로
> 충돌·중복을 막기 위한 규칙과 전체 문서 현황을 한곳에서 관리합니다.
> 갱신일: 2026-08-05

---

## 1. 병렬 작업 규칙

1. **파일 단위 점유**: 한 파일은 동시에 한 에이전트만 수정. 작업 시작 시 이 문서의 "상태"에 작업 중 표시.
2. **sidebars.ts 수정 최소화**: 문서 추가 시 필요한 라인만 추가. 공통 영역(commonSidebar)은 우선순위 담당(현재: Cline), 탑바별 영역은 각자 소관.
3. **신규 파일 등록 의무**: 새 문서를 만들면 즉시 이 매니페스트에 추가.
4. **커밋 단위**: `npm run build` 검증 통과 후, 파일 단위로 작게 커밋. 남의 미커밋 파일은 건드리지 않기.
5. **추정값 표기**: 실측 전 값은 반드시 "(추정)" 표기. 실측 시 태그 제거 + `competitor-verification-checklist`에 확인일 기록.
6. **수치 인용**: 원본 파일 경로 + 계산식 병기 (`market-reality-assessment` §7 원칙 준수).

---

## 2. 파일 매니페스트

| 파일 | 카테고리 | 담당 | 상태 |
|---|---|---|---|
| `research/price-master` | 실행·가격 | Cline | 🟡 결정 필요 2건 (§4) |
| `research/compliance-checklist` | 실행·법규 | Cline | 🔴 미착수 (런칭 전 필수) |
| `research/financial-model` | 실행·재무 | Cline | 🟡 가정 기반 (OEM 견적 후 갱신) |
| `marketing/launch-playbook` | 실행·런칭 | Cline | 🟡 준비 중 |
| `research/oem-supply-chain` | 실행·공급망 | Cline | 🟡 후보 발굴 중 (외부검색 병합 예정) |
| `research/competitor-verification-checklist` | 실행·검증 | Cline | 🔴 전부 미검증 |
| `research/market-reality-assessment` | 실행·데이터 | Cline | ✅ 최초 작성 (데이터 규명 포함) |
| `research/bodybar-external-insights` | 시장조사(외부검색) | 외부검색 에이전트 | 🟡 작성 중 |
| `research/skirt-external-insights` | 시장조사(외부검색) | 외부검색 에이전트 | 🟡 작성 중 |
| `research/resort-onesie-external-insights` | 시장조사(외부검색) | 외부검색 에이전트 | 🟡 작성 중 |
| 기존 59개 문서 | — | — | 이 목록에 미기재 — 필요 시 확장 |

---

## 3. 파일명 컨벤션

- 영문 소문자 + 하이픈 (예: `price-master.md`)
- 접두어 규칙: `md-lineup-*`(MD 라인업) · `*-bmc-9blocks`(BMC) · `*-external-insights`(외부검색) · `*-market-research` · `*-potential-customers`
- 새 접두어 도입 시 이 문서에 규칙 추가

---

## 4. 빌드 검증

```bash
cd knowledge-base-docs
npm run build
```

- onBrokenLinks: warn 설정 — 경고도 확인 후 커밋 권장
- 링크 추가 시 실제 파일 존재 확인
