# 이미지 생성 (ChatGPT gpt-image-1)

하이피부(HIGHSKIN) 브랜드 이미지 — 무드보드 · 캐릭터 · 로고 · 제품 사진을 **ChatGPT 이미지 API(gpt-image-1)** 로 생성합니다.

## 실행
```bash
# 기본: KB 표출 경로에 저장 (knowledge-base-docs/static/img/highskin/ -> /img/highskin/{파일})
python3 scripts/gen-image.py "프롬프트"

# 파일명·크기 지정
python3 scripts/gen-image.py "프롬프트" --out knowledge-base-docs/static/img/highskin/moodboard.png --size 1024x1536

# 임시(비표출) 파일
python3 scripts/gen-image.py "프롬프트" --out output/tmp.png
```

## 스킬 규칙 (이미지 생성 요청 시 반드시 준수)
1. **키 로드**: `./.keys/.apikeys` 에서 자동 로드 — 키를 프롬프트·출력·로그에 노출 금지, 커밋 금지(`.gitignore`에 `.keys/` 포함됨)
2. **하이피부 팔레트 적용**: 프롬프트에 항상 7색 명시 — 크림 `#FFF8EF`(배경) · 소프트 핑크 `#F6A6B8`(메인) · 밀크 핑크 `#FCE8EC` · 애프리콧 `#F4B27D` · 소프트 세이지 `#AFC7A8` · 리프 그린 `#6F9470` · 딥 브라운 `#403735`(텍스트)
3. **용도별 프롬프트 참고**: `docs/branding/moodboard-prompt-guide.md` — 무드보드(3종) · 로고(부록 A) · 픽커 그래픽(부록 B: G1 눈·코·입 / G2 캐릭터 4종 / G3 UI) · 제품(부록 C: P1 리필 홀더 / P2 여행 세트) · 채널 다이어그램(부록 D)
4. **KB 표출 절차 (기본)**: 생성 이미지는 `knowledge-base-docs/static/img/highskin/`에 저장 → 필요 문서에 `![](/img/highskin/{파일})` 참조 추가 → 커밋·push → 배포 → **라이브 URL**(`https://miniymj.github.io/fnbkb/img/highskin/{파일}`) 확인 → 사용자에게 표출 경로 보고
5. **파일명 규칙**: 용도에 맞게 — `moodboard-*.png` · `character-*.png` · `logo-*.png` · `product-*.png` · `picker-*.png` (한글·공백 금지)
6. **결과 보고**: 저장 경로 + **라이브 표출 URL** + (있으면) revised_prompt
7. **비용 주의**: gpt-image-1은 이미지당 요금 — 대량 생성 전 사용자에게 확인

## 일반 프롬프트 템플릿
```
[하이피부 7색 팔레트 명시] + [용도/구성] + [그림체: 아이 손그림·둥근 셰이프·파스텔] + [금지: 네온·3D·그라데이션]
```

