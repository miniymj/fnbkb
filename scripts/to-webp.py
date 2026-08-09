#!/usr/bin/env python3
"""
이미지 → WebP 경량화 스킬 — 웹게시용 디폴트(quality 80)

사용법:
    python3 scripts/to-webp.py <파일 또는 폴더> [--quality 80] [--replace] [--recursive]

예시:
    python3 scripts/to-webp.py static/img/class-0807/ --replace     # 폴더 내 모든 이미지 변환 + 원본 제거
    python3 scripts/to-webp.py static/img/highskin/ --recursive      # 하위 폴더 포함 변환
    python3 scripts/to-webp.py output/moodboard.png --quality 85    # 단일 파일 품질 지정
"""
import argparse
import os
import sys

IMG_EXT = {'.png', '.jpg', '.jpeg'}


def _pillow():
    try:
        from PIL import Image
        return Image
    except ImportError:
        # macOS 기본 python의 user site 경로 시도
        sys.path.insert(0, os.path.expanduser('~/Library/Python/3.9/lib/python/site-packages'))
        from PIL import Image
        return Image


def to_webp(Image, path, quality, replace):
    try:
        if not os.path.isfile(path):
            return None
        ext = os.path.splitext(path)[1].lower()
        if ext not in IMG_EXT:
            return None
        im = Image.open(path)
        out = os.path.splitext(path)[0] + '.webp'
        im.save(out, 'WEBP', quality=quality, method=6)
        png_size = os.path.getsize(path)
        wp_size = os.path.getsize(out)
        saved = 100 * (1 - wp_size / png_size) if png_size else 0
        if replace:
            os.remove(path)
        return (path, out, png_size, wp_size, saved)
    except Exception as e:
        print(f'[!] 건너뜀: {os.path.basename(path)} — {e}')
        return None


def main():
    ap = argparse.ArgumentParser(description='이미지 → WebP 경량화 (디폴트 웹게시용 quality=80)')
    ap.add_argument('target', help='이미지 파일 또는 폴더')
    ap.add_argument('--quality', type=int, default=80, help='WebP 품질 (기본 80)')
    ap.add_argument('--replace', action='store_true', help='변환 후 원본 삭제')
    ap.add_argument('--recursive', action='store_true', help='폴더 하위까지 재귀 탐색')
    args = ap.parse_args()

    Image = _pillow()

    if os.path.isdir(args.target):
        targets = []
        for root, dirs, files in os.walk(args.target):
            if not args.recursive and root != args.target:
                dirs[:] = []
                continue
            for f in files:
                if f.startswith('._'):
                    continue
                if os.path.splitext(f)[1].lower() in IMG_EXT:
                    targets.append(os.path.join(root, f))
    else:
        targets = [args.target]

    results = [r for t in sorted(targets) if (r := to_webp(Image, t, args.quality, args.replace))]
    if not results:
        print('변환할 이미지가 없습니다.')
        return

    print(f'{"원본":40} {"크기":>9} {"WebP":>9} {"감소":>6}')
    for p, out, ps, ws, saved in results:
        print(f'{os.path.basename(p)[:40]:40} {ps/1024:6.0f}KB {ws/1024:6.0f}KB {saved:5.0f}%')
    total_p = sum(r[2] for r in results)
    total_w = sum(r[3] for r in results)
    print(f'합계: {total_p/1024/1024:.1f}MB → {total_w/1024/1024:.1f}MB (약 {100*(1-total_w/total_p):.0f}% 감소)')


if __name__ == '__main__':
    main()
