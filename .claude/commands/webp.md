# WebP 경량화 (이미지 게시 전 필수 · 디폴트)

static에 게시하는 모든 이미지는 **WebP(quality 80)**로 경량화합니다. 웹게시용 수준의 품질이면 충분합니다.

## 실행
```bash
# 폴더 내 모든 이미지 변환 + 원본 제거 (static 게시 기본)
python3 scripts/to-webp.py static/img/{폴더}/ --replace

# 원본 유지하며 변환만
python3 scripts/to-webp.py static/img/{폴더}/

# 하위 폴더 포함 / 품질 지정
python3 scripts/to-webp.py static/img/{폴더}/ --recursive --quality 80
```

## 스킬 규칙 (이미지 게시 시 반드시 준수)
1. **WebP 디폴트**: static 게시 이미지는 항상 WebP(quality 80)로 변환 후 커밋 — PNG/JPG 원본을 그대로 올리지 않기
2. **문서 참조**: 마크다운/문서 이미지 경로는 `.webp` 사용 (`/img/.../파일.webp`)
3. **원본 보존**: 원본이 필요하면 `--replace` 없이 변환만 (원본은 `0807...` 같은 로컬 원본 폴더에 별도 보관)
4. **이미지 생성 스킬 연동**: `scripts/gen-image.py`는 생성 후 **PNG + WebP를 함께 자동 생성** — KB 표출 참조는 WebP 사용
5. **변환 검증**: 변환 후 라이브 URL 200 + 크기(경량화) 확인

## 출력 예시
```
원본                                   크기      WebP     감소
visual-branding-design-1.png         2488KB     193KB    92%
합계: 13.2MB → 0.9MB (약 93% 감소)
```
