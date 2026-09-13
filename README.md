# 🐥 小鸡面的个人网站

一个用**纯 HTML / CSS / JS** 手写的个人网站，没有框架、没有构建工具、没有依赖。
风格为新粗野主义（Neo-Brutalism）：大色块、粗描边、硬阴影贴纸感，支持深浅色主题切换。

## 文件结构

```
myweb/
├── index.html        首页（大标题 + 贴纸墙板块 + 关于速览 + 联系）
├── play.html         「约我打球」落地页（最近先不打 + 搞怪小鸡）
├── coffee.html       「咖啡走起」咖啡店推荐页（表单收集，存浏览器 localStorage）
├── songs.html        「神仙歌品」站内歌单页（曲目数据为静态快照）
├── works.html        作品集（支持按分类筛选）
├── blog.html         博客列表
├── about.html        关于我（名片 + 技能 + 时间线 + 联系方式）
├── blog/             文章页（每篇文章一个 HTML 文件）
│   ├── post-handmade-site.html
│   ├── post-css-animation.html
│   └── post-2026-list.html
├── css/style.css     全部样式（设计变量集中在文件顶部的 :root）
├── js/main.js        全部交互（主题切换 / 滚动动画 / 作品筛选）
└── README.md
```

## 本地查看

直接**双击 `index.html`** 即可在浏览器打开；或者启动一个本地服务器：

```bash
# 在本目录执行任选其一
python -m http.server 8000
npx serve .
```

然后访问 http://localhost:8000

## 如何改成你自己的内容（重要）

站内名字已设置为**「小鸡面」**；邮箱、社交链接、作品项目等仍是占位内容。
用编辑器全局搜索替换即可：

| 要改什么 | 在哪改 |
| --- | --- |
| 名字「小鸡面」/ XIAO JI MIAN | 7 个 HTML 文件里全局搜索替换 |
| 头像 emoji（现在是 🐥） | 搜索 `🐥`，以及 `<head>` 里的 favicon |
| 邮箱 `hi@yizhou.example` | 首页、关于页、作品页的 `mailto:` 链接 |
| 社交链接（GitHub / B 站 / 小红书 / 微博） | 搜索 `yourname` / `yourid` 换成你的 |
| **歌单链接**（神仙歌品板块） | 站内页 `songs.html`，只展示歌名/歌手/封面，不含任何账号信息；歌单更新后把新曲目同步进 `songs.html` 即可 |
| 作品项目 | `works.html`：每张卡片是一个 `<article class="work-card">`，`data-category` 决定筛选分类，emoji 即封面 |
| 博客文章 | 复制 `blog/` 下任一文件，改正文和标题；再到 `blog.html` 和首页加一行列表项 |
| 配色 / 字体 | `css/style.css` 顶部 `:root` 里的 `--orange`、`--pink` 等变量 |
| 个人简介 / 时间线 | `about.html` |

## 如何部署（免费）

纯静态网站随便哪家都能托管，推荐：

- **GitHub Pages**：推送到 GitHub 仓库 → Settings → Pages → 选分支即可；
- **Vercel / Netlify**：导入仓库，零配置，自动识别为静态站；
- **Cloudflare Pages**：同理。

不需要任何构建命令，`index.html` 就是入口。

## 已实现的功能

- 🌙 深浅色主题切换（记忆在 localStorage，首次跟随系统）
- 🖥️ 桌面端优先；窄屏下布局自动收缩，导航保持横排（暂未做完整移动端适配）
- ✨ 滚动入场动画（IntersectionObserver，带交错延迟）
- 🗂️ 作品分类筛选
- 🏃 无限跑马灯、贴纸悬停、硬阴影按压感等细节
- ♿ 语义化标签、跳转链接、aria 标注、`prefers-reduced-motion` 支持
