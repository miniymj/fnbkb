# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## 협업 규칙 (병렬 에이전트)

- [CONTRIBUTING.md](CONTRIBUTING.md) 참조 — 병렬 작업 규칙 · 파일 매니페스트 · 파일명 컨벤션 · 빌드 검증
- 문서 추가 시 반드시 `sidebars.ts`의 해당 사이드바에 등록하고, `CONTRIBUTING.md` 매니페스트에 기록

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
