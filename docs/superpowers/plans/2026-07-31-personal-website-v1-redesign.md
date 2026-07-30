# Personal Website V1 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing static résumé-style site into a complete, deployable creator portfolio led by Li Xueqin / wolfan, with four real works, concise internship evidence, public résumé/contact details, and motion-ready work windows.

**Architecture:** Keep the existing single-page static architecture and replace its content and presentation coherently in place. `index.html` owns semantic content, `styles.css` owns both theme systems and responsive Bento layout, and `script.js` owns only theme state, active navigation, reveal behavior, and lightweight interaction state. Project media stays in `assets/`; no runtime package or build step is added.

**Tech Stack:** HTML5, CSS custom properties/Grid, vanilla JavaScript, GitHub Pages

## Global Constraints

- Preserve `assets/hero-day.png` and `assets/hero-night.png` as the two Hero states.
- Hero copy is exactly `NEXT STOP · UNNAMED`, `李学钦 · 小狼 wolfan`, `流水不争先，争的是滔滔不绝` with no terminal full stop.
- Hero text stays on the right on desktop and must not cover the white-haired figure.
- Works order is 《一笔留白》, 小狼协议, Python 自动化清洗工作台, 小红书.
- AIGC is the site's visual language and must not appear as a separate project card.
- Display 37 users for 小狼协议 and label the Python metric as `正确自动处理率 78%`, never model accuracy.
- Do not expose internship source data or imply the demo Golden Set is production traffic.
- Publish phone `13728928929`, email `1760583961@qq.com`, and a downloadable résumé PDF.
- Use no React, Vite, animation package, package manager, or new runtime dependency in V1.
- All nonessential motion must stop under `prefers-reduced-motion: reduce`.

---

### Task 1: Curate public evidence assets

**Files:**
- Create: `assets/resume-li-xueqin-ai-data-trainer.pdf`
- Create: `assets/work-yibiliubai.webp`
- Create: `assets/work-xiaolang.webp`
- Create: `assets/work-asr-cleaner.webp`
- Create: `assets/work-xiaohongshu.webp`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: verified local résumé, public project pages, supplied screenshots, and the local ASR workbench.
- Produces: stable public asset names referenced by `index.html`.

- [ ] **Step 1: Inspect every source before copying or capturing**

Confirm the résumé is the education-enhanced PDF, the Xiaolang image visibly contains `37人已使用`, the game capture comes from the clean current V2 URL, and the ASR screenshot contains only demo data.

Run:

```powershell
Get-Item -LiteralPath 'C:\Users\86137\Desktop\我的第二大脑\简历\正式简历\李学钦-AI数据训练师-教育信息增强版.pdf'
Get-Item -LiteralPath 'C:\Users\86137\xwechat_files\wxid_k0febfuk1cpg22_e8a6\temp\RWTemp\2026-07\9e20f478899dc29eb19741386f9343c8\6042b80ae1b7f53fcf92b68de1ee1b13.jpg'
```

Expected: both files exist and have non-zero lengths.

- [ ] **Step 2: Copy the approved résumé and evidence images with stable names**

Use `Copy-Item -LiteralPath` only after the sources are confirmed. Preserve originals.

- [ ] **Step 3: Capture or derive project covers**

Use real UI imagery rather than fabricated mockups. Crop to the subject, export WebP where supported, and keep each cover under roughly 500 KB without making text unreadable.

- [ ] **Step 4: Verify public-asset safety**

Run:

```powershell
Get-ChildItem -LiteralPath '.\assets' -File | Select-Object Name,Length
Select-String -Path '.\assets\*' -Pattern '真实用户|房间号|微信号' -ErrorAction SilentlyContinue
```

Expected: all five stable files exist; no private-data match is reported.

- [ ] **Step 5: Commit evidence assets**

```powershell
git add .gitignore assets/resume-li-xueqin-ai-data-trainer.pdf assets/work-yibiliubai.webp assets/work-xiaolang.webp assets/work-asr-cleaner.webp assets/work-xiaohongshu.webp
git commit -m "assets: add verified portfolio evidence"
```

### Task 2: Replace résumé-like markup with the approved page narrative

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: stable asset names from Task 1.
- Produces: section IDs `top`, `works`, `about`, `experience`, and `contact`; `.work-window` media containers; real external links used by CSS and JavaScript.

- [ ] **Step 1: Add a temporary structure check before editing**

Create no test framework. Use this PowerShell assertion after the markup replacement:

```powershell
$html = Get-Content -LiteralPath '.\index.html' -Raw -Encoding UTF8
@('id="works"','id="about"','id="experience"','id="contact"','37 人已使用','正确自动处理率 78%','resume-li-xueqin-ai-data-trainer.pdf') | ForEach-Object { if (-not $html.Contains($_)) { throw "Missing: $_" } }
if ($html.Contains('简历准备中')) { throw 'Placeholder copy remains' }
```

- [ ] **Step 2: Replace metadata, navigation, and Hero**

Use this semantic shape:

```html
<p class="hero-eyebrow reveal">NEXT STOP · UNNAMED</p>
<h1 class="hero-title reveal">李学钦 <span>· 小狼 wolfan</span></h1>
<p class="hero-quote reveal">流水不争先，争的是滔滔不绝</p>
<div class="hero-cta reveal">
  <a class="btn btn-primary" href="#works">查看作品</a>
  <a class="btn btn-secondary" href="assets/resume-li-xueqin-ai-data-trainer.pdf" download>下载简历</a>
</div>
```

Set the page title and description around a creator portfolio, not a single job title.

- [ ] **Step 3: Build the four work windows**

Each window follows one reusable markup contract:

```html
<article class="work-window work-window--game reveal">
  <a class="work-media" href="PUBLIC_URL" target="_blank" rel="noreferrer">
    <img src="assets/WORK_COVER.webp" alt="真实作品界面说明" loading="lazy">
  </a>
  <div class="work-copy">
    <p class="work-kicker">TYPE / YEAR</p>
    <h3>作品名称</h3>
    <p>一句核心价值</p>
    <ul class="work-facts"><li>一条真实证据</li></ul>
    <a class="text-link" href="PUBLIC_URL">操作名称 <span aria-hidden="true">↗</span></a>
  </div>
</article>
```

Use live links for the game, Xiaolang GitHub, and Xiaohongshu. The local-only ASR tool has no fake repository link; its action points to the experience or résumé evidence instead.

- [ ] **Step 4: Add creator, experience, and contact sections**

Keep each internship to one concise problem/work/result/method block. Add `tel:13728928929`, `mailto:1760583961@qq.com`, GitHub, Xiaohongshu, and the PDF download.

- [ ] **Step 5: Run the structure check**

Expected: command exits successfully and `简历准备中` is absent.

- [ ] **Step 6: Commit semantic content**

```powershell
git add index.html
git commit -m "feat: rebuild portfolio content around real work"
```

### Task 3: Implement the visual system and motion-ready Bento windows

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: section IDs and classes from Task 2.
- Produces: two theme palettes, right-aligned Hero, responsive Bento grid, stable `.work-media` aspect ratios, hover/reveal states, and accessibility fallbacks.

- [ ] **Step 1: Define the shared tokens and two palettes**

Keep existing `data-theme="day|dusk"` state. Define explicit variables for page surface, window surface, border, text, muted text, accent, shadow, and Hero overlay in both themes.

- [ ] **Step 2: Rebuild the Hero layout**

Desktop layout must reserve the left image subject area:

```css
.hero-content {
  width: min(48rem, 48vw);
  margin-left: auto;
  padding-right: clamp(1.5rem, 7vw, 8rem);
  text-align: right;
}
.hero-title { font-size: clamp(2.6rem, 5.6vw, 6.4rem); }
.hero-title span { display: inline; }
```

At narrow widths, reduce size and move content to a safe lower-right/center region based on the actual crop; do not preserve desktop coordinates blindly.

- [ ] **Step 3: Build the Bento work grid**

Use a 12-column desktop grid, two-column tablet layout, and one-column mobile flow. Give the game the broadest area; preserve DOM order for reading and mobile.

```css
.work-grid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:clamp(1rem,2vw,1.75rem); }
.work-window--game { grid-column:span 7; }
.work-window--xiaolang { grid-column:span 5; }
.work-window--cleaner { grid-column:span 7; }
.work-window--xhs { grid-column:span 5; }
.work-media { position:relative; overflow:hidden; aspect-ratio:16/10; }
.work-media img,.work-media video { width:100%; height:100%; object-fit:cover; }
```

- [ ] **Step 4: Add restrained micro-motion**

Use transforms and opacity only. On hover-capable devices, scale media no more than about 1.03 and translate the external arrow slightly. Do not animate large shadows or layout dimensions.

- [ ] **Step 5: Add responsive and reduced-motion rules**

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior:auto; }
  *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
  .reveal { opacity:1; transform:none; }
}
```

Retain visible `:focus-visible` outlines and ensure text contrast survives both Hero images.

- [ ] **Step 6: Visually verify three widths**

Check at approximately 1440 px, 768 px, and 390 px. Expected: no horizontal overflow, no Hero overlap with the white-haired character, work order preserved, contact links reachable.

- [ ] **Step 7: Commit visual system**

```powershell
git add styles.css
git commit -m "feat: add motion-ready bento portfolio layout"
```

### Task 4: Simplify behavior and make theme state accessible

**Files:**
- Modify: `script.js`
- Modify: `index.html`

**Interfaces:**
- Consumes: `#themeToggle`, `#imageDay`, `#imageNight`, `.reveal`, navigation anchors.
- Produces: persisted `day|dusk` theme, synchronized toggle labels, active navigation, and one-shot reveals.

- [ ] **Step 1: Remove obsolete résumé-toast behavior**

Delete `.resume-btn` listeners and the toast if no other action uses it. The résumé is a native download link and needs no JavaScript.

- [ ] **Step 2: Synchronize the theme button state**

Extend `setTheme` with explicit accessible text:

```javascript
themeToggle?.setAttribute('aria-pressed', String(nextTheme === 'dusk'));
themeToggle?.setAttribute('aria-label', nextTheme === 'dusk' ? '切换到黄昏模式' : '切换到夜间模式');
```

- [ ] **Step 3: Keep only necessary observers**

Retain navigation scroll state, current-section highlighting, and the one-shot `IntersectionObserver`. If reduced motion is active, immediately add `.in` instead of observing.

- [ ] **Step 4: Run a syntax check**

Run:

```powershell
node --check .\script.js
```

Expected: no output and exit code 0.

- [ ] **Step 5: Commit behavior cleanup**

```powershell
git add index.html script.js
git commit -m "fix: align theme and reveal behavior with accessible motion"
```

### Task 5: Validate the complete local V1

**Files:**
- Modify if required by discovered defects: `index.html`, `styles.css`, `script.js`

**Interfaces:**
- Consumes: complete site from Tasks 1–4.
- Produces: a locally verified release candidate.

- [ ] **Step 1: Start the existing static server**

Use the already available local server method; do not add a dependency. Verify the chosen localhost URL returns HTTP 200.

- [ ] **Step 2: Run browser checks**

Verify desktop and mobile layouts, both themes, all anchor navigation, all public links, résumé download, phone/email actions, keyboard focus, and reduced-motion emulation.

- [ ] **Step 3: Run content assertions**

```powershell
$html = Get-Content -LiteralPath '.\index.html' -Raw -Encoding UTF8
@('AI 数据训练实习候选人','多轮对话数据标注','RLHF 偏好排序','简历准备中') | ForEach-Object { if ($html.Contains($_)) { throw "Obsolete copy remains: $_" } }
@('李学钦 · 小狼 wolfan','流水不争先，争的是滔滔不绝','37 人已使用','正确自动处理率 78%') | ForEach-Object { if (-not $html.Contains($_)) { throw "Approved copy missing: $_" } }
node --check .\script.js
```

Expected: no exception; JavaScript syntax check exits 0.

- [ ] **Step 4: Check Git diff and asset size**

Run `git diff --check` and inspect `git status --short`. Fix whitespace errors and confirm old ignored MP4/poster files were not accidentally staged.

- [ ] **Step 5: Commit any verification fixes**

```powershell
git add index.html styles.css script.js assets
git commit -m "fix: polish responsive portfolio release"
```

Skip this commit if no file changed.

### Task 6: Publish and verify GitHub Pages

**Files:**
- No new files expected.

**Interfaces:**
- Consumes: clean local `main` release candidate.
- Produces: matching `origin/main` and verified public GitHub Pages site.

- [ ] **Step 1: Confirm exact repository and branch**

Run:

```powershell
git status --short --branch
git remote -v
```

Expected: working tree clean, branch `main`, remote points to `lixueqin0808-bot/personal-website`.

- [ ] **Step 2: Push main**

```powershell
git push origin main
```

Expected: push succeeds and remote main advances to the local HEAD.

- [ ] **Step 3: Poll the public page with a cache-busting query**

Request `https://lixueqin0808-bot.github.io/personal-website/?v=<commit>` until it returns HTTP 200 and includes `李学钦 · 小狼 wolfan`.

- [ ] **Step 4: Perform final public visual verification**

Open the public URL at desktop and mobile sizes. Verify both theme images load, project links and résumé download resolve, and no local-only asset path appears in the DOM or network failures.

- [ ] **Step 5: Report the deployed commit and any consciously deferred motion work**

State the commit hash, public URL, verified checks, and that GSAP/Remotion remain a later enhancement rather than a V1 dependency.
