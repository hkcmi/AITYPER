# AITYPER

[Live Demo](https://aityper.vercel.app)

A mobile-first AI usage personality scan, built as a lightweight static web app.

AITYPER turns a short quiz into a shareable cyber-style report. It is designed to be fast, self-contained, and easy to deploy anywhere static files can be served.

## Highlights

- Static HTML, CSS, JavaScript, and JSON
- Mobile-first interaction and result layout
- Chinese / English start-screen language switch
- Shareable result copy with dimension scores
- No account system, backend, or database

## Run Locally

Some browsers block local JSON loading when opening `index.html` directly. Use a static server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Architecture

`index.html` is the entry point. `game.js` handles state, scoring, rendering, language switching, and sharing. `questions.json` and `results.json` keep quiz content separate from application logic. `style.css` contains the complete visual system.

The production site is hosted on Vercel:

[https://aityper.vercel.app](https://aityper.vercel.app)

## License

MIT

---

## 中文

[在线体验](https://aityper.vercel.app)

AITYPER 是一个移动端优先的 AI 使用人格扫描小游戏，使用纯静态前端实现。

它把一组轻量问题转成适合分享的赛博风格人格报告。项目本身不依赖后端、数据库或账号系统，可以部署到任何静态托管平台。

## 项目特点

- 静态 HTML、CSS、JavaScript 与 JSON
- 移动端优先的答题与结果页体验
- 首页支持中英文切换
- 分享文案包含结果与维度评分
- 无账号系统、无后端、无数据库

## 本地运行

部分浏览器直接打开 `index.html` 时会限制读取本地 JSON，建议使用静态服务器：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://localhost:4173
```

## 架构

`index.html` 是页面入口。`game.js` 负责状态、计分、渲染、语言切换和分享逻辑。`questions.json` 与 `results.json` 将内容数据和应用逻辑分离。`style.css` 包含完整视觉系统。

生产环境托管在 Vercel：

[https://aityper.vercel.app](https://aityper.vercel.app)

## License

MIT
