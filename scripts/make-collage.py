#!/usr/bin/env python3
"""
이미지 그리드 콜라주 생성 스킬 (WebP 저장 · 디폴트 quality 80)

사용법:
    python3 scripts/make-collage.py {폴더} --out static/img/class-0807/cardnews/cardnews-collage.webp [--cols 4] [--thumb 400] [--gap 12] [--bg #FFF8EF]

예시:
    python3 scripts/make-collage.py static/img/class-0807/cardnews --out static/img/class-0807/cardnews/cardnews-collage.webp
"""
import argparse
import os
import sys

IMG_EXT = {'.webp', '.png', '.jpg', '.jpeg'}


def main():
    ap = argparse.ArgumentParser(description='이미지 그리드 콜라주 생성 (WebP)')
    ap.add_argument('folder', help='이미지 폴더')
    ap.add_argument('--cols', type=int, default=4, help='열 수')
    ap.add_argument('--thumb', type=int, default=400, help='개별 썸네일 크기(px)')
    ap.add_argument('--gap', type=int, default=12, help='칸 사이 간격(px)')
    ap.add_argument('--out', required=True, help='저장 경로 (.webp)')
    ap.add_argument('--bg', default='#FFF8EF', help='배경색 (HEX)')
    args = ap.parse_args()

    try:
        from PIL import Image
    except ImportError:
        sys.path.insert(0, os.path.expanduser('~/Library/Python/3.9/lib/python/site-packages'))
        from PIL import Image

    files = sorted(
        f for f in os.listdir(args.folder)
        if os.path.splitext(f)[1].lower() in IMG_EXT and not f.startswith('._')
    )
    if not files:
        print('이미지가 없습니다.')
        return

    bg = tuple(int(args.bg.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4))
    rows = (len(files) + args.cols - 1) // args.cols
    W = args.cols * args.thumb + (args.cols - 1) * args.gap + 2 * args.gap
    H = rows * args.thumb + (rows - 1) * args.gap + 2 * args.gap
    canvas = Image.new('RGB', (W, H), bg)

    for i, f in enumerate(files):
        im = Image.open(os.path.join(args.folder, f)).convert('RGB')
        im.thumbnail((args.thumb, args.thumb))
        r, c = divmod(i, args.cols)
        x = args.gap + c * (args.thumb + args.gap)
        y = args.gap + r * (args.thumb + args.gap)
        ox = (args.thumb - im.width) // 2
        oy = (args.thumb - im.height) // 2
        canvas.paste(im, (x + ox, y + oy))

    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    canvas.save(args.out, 'WEBP', quality=80, method=6)
    print(f'OK {args.out} ({len(files)}장 → {os.path.getsize(args.out) // 1024}KB, {W}x{H})')


if __name__ == '__main__':
    main()
