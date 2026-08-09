#!/usr/bin/env python3
"""
HIGHSKIN 이미지 생성 스킬 — ChatGPT 이미지 API(gpt-image-1) 호출

사용법:
    python3 scripts/gen-image.py "생성할 이미지 설명(프롬프트)" [--out out.png] [--size 1024x1024] [--n 1]

예시:
    python3 scripts/gen-image.py "하이피부 무드보드 — 크림 배경, 소프트 핑크 캐릭터" --out output/moodboard.png

API 키: ./.keys/.apikeys 에서 자동 로드 (커밋 금지 — .gitignore에 .keys/ 포함)
"""
import argparse
import base64
import json
import os
import re
import sys
import urllib.error
import urllib.request

KEY_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".keys", ".apikeys")


def load_key():
    """./.keys/.apikeys 에서 OpenAI 키 토큰 추출 (형식: `OpenAI API: sk-proj-...`)"""
    if not os.path.exists(KEY_FILE):
        sys.exit(f"[ERROR] 키 파일 없음: {KEY_FILE}")
    with open(KEY_FILE, encoding="utf-8") as f:
        text = f.read()
    m = re.search(r"sk-proj-[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)*", text)
    if not m:
        m = re.search(r"sk-[A-Za-z0-9_-]{20,}", text)
    if not m:
        sys.exit("[ERROR] .apikeys에서 OpenAI 키를 찾지 못했습니다 (sk-proj-... 형식)")
    return m.group(0)


def generate(prompt, size="1024x1024", n=1):
    key = load_key()
    body = {"model": "gpt-image-1", "prompt": prompt, "size": size, "n": n}
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = json.load(resp)
    imgs = data.get("data", [])
    if not imgs:
        sys.exit("[ERROR] 응답에 이미지가 없습니다")
    return imgs[0]


def _err_body(e):
    """HTTPError 응답 본문(에러 사유) 추출"""
    try:
        return e.read().decode("utf-8", errors="replace")[:800]
    except Exception:
        return ""


def main():
    ap = argparse.ArgumentParser(description="ChatGPT 이미지 생성 (gpt-image-1)")
    ap.add_argument("prompt", help="이미지 생성 프롬프트")
    ap.add_argument("--out", default="output/gen-image.png", help="저장 경로 (기본 output/gen-image.png)")
    ap.add_argument("--size", default="1024x1024", choices=["1024x1024", "1024x1536", "1536x1024"], help="이미지 크기")
    ap.add_argument("--n", type=int, default=1, help="생성 수 (gpt-image-1은 1만 지원)")
    args = ap.parse_args()

    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)

    print(f"[*] 이미지 생성 요청: model=gpt-image-1 size={args.size}")
    try:
        img = generate(args.prompt, size=args.size, n=args.n)
    except urllib.error.HTTPError as e:
        sys.exit(f"[ERROR] API {e.code} {e.reason}\n{_err_body(e)}")
    except urllib.error.URLError as e:
        sys.exit(f"[ERROR] 네트워크 오류: {e.reason}")

    if img.get("b64_json"):
        with open(out, "wb") as f:
            f.write(base64.b64decode(img["b64_json"]))
    elif img.get("url"):
        urllib.request.urlretrieve(img["url"], out)
    else:
        sys.exit("[ERROR] 알 수 없는 응답 형식")

    revised = img.get("revised_prompt", "")
    print(f"[OK] 저장 완료: {out}")
    if revised:
        print(f"[*] revised_prompt: {revised}")


if __name__ == "__main__":
    main()
