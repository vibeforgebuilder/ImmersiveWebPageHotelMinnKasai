# Minn Kasai — Immersive Architectural Walking Tour

> **"Your second home in Tokyo"** — An interactive, scroll-driven one-pager landing page showcasing the distinctive architectural design, luminous Torii entrance gates, and Japandi apartment suites of **Minn Kasai** hotel in Tokyo.

---

## 🏛️ Page Design Principles

The design is built around an **unhurried, sensory-rich tour experience** that puts architectural photography at the forefront:

### 1. Two-Action Scroll Sequence (Picture First, Story Follows)
- **Action 1 (Pure Photo Immersion)**: When a visitor scrolls into a new space, the photograph is revealed **100% clean and unobstructed** at full brightness without text overlays.
- **Action 2 (Architectural Story & Specs)**: Continuing to scroll down smoothly glides in the narrative glass card, director's camera notes, and clickable material hotspots with a localized side gradient.
- **Natural Reversibility**: Scrolling back up smoothly slides the caption out and restores the pure photograph.
- **Manual Control**: Visitors can click **"Reveal Story"** / **"View Photo Only"** or open the high-resolution modal at any time.

### 2. Spatial Camera Choreography
Scene transitions emulate the physical motion of walking through the property:
- **01 Exterior Slate Tower**: *Pedestal Down & Tilt* (vertical descent down the 10-story dark-tile facade to the street entrance).
- **02 Luminous Torii Gates**: *Dolly In & Push Through* (tracking through the concentric 3,000K LED light portals into the threshold).
- **03 Lobby Corridor**: *Pan Right & Hallway Reveal* (moving past the self-check-in terminal toward the elevator).
- **04 Japandi Suite**: *Elevator Ascend & Suite Landing* (rising into the guest suite, settling on the oak dining banquette and Simmons beds).
- **05 Resident's Kitchenette**: *Tilt Down & Spatial Pivot* (turning toward the induction cooktop, tableware, and refrigerator).
- **06 Japanese Bathhouse**: *Pan Left & Sliding Door Glide* (tracking into the deep soaking ofuro tub and separate washroom).
- **07 Kasai District & Transit**: *Crane Out & Wide Neighborhood Reveal* (pulling out to local conveniences, Tobu supermarket, and direct Tokyo Disney shuttle routes).

### 3. Deliberate, Luxurious Transition Timing
- **Extended Spatial Runway**: The walkthrough allocates **240vh of scroll runway per chapter** (over 1,600vh total), preventing fast accidental scene skips.
- **50% Optical Dissolve Window**: Incoming photos begin dissolving in at `p = 0.50`, blending spaces together over an S-curve cosine dissolve (`Math.cos`).
- **Weighted Inertia**: Camera transforms are damped with `cubic-bezier(0.16, 1, 0.3, 1)` over 800ms, emulating a heavy optical jib.
- **Pacing Selector**: A live HUD toggle allows visitors to choose between:
  - `Slow (1.5x)` *(Default)*: 240vh scroll runway with 1,600ms smooth glide.
  - `Grand (2.0x)`: 300vh extended runway with 2,200ms glide.
  - `Brisk (1.0x)`: 160vh compact browsing.

### 4. Tactile Japandi Aesthetic & Zero-Pill Discipline
- **Color Palette**: Void-depth charcoal (`#07090D`, `#0D0F13`), warm amber portal luminescence (`#F59E0B`, `#FBBF24`), natural blonde oak, and indigo textile accents.
- **Typography**: Clean display headings using `Outfit` paired with `Plus Jakarta Sans` for readable specs and tabular numerals.
- **Contrast & Legibility**: All text cards feature dark glass backgrounds (`backdrop-blur-2xl`) maintaining WCAG AA contrast.

---

## 🛠️ Technical Design & Architecture

```
├── .github/workflows/deploy.yml   # Automated GitHub Pages CI/CD workflow
├── public/assets/aistudio/        # 15 high-resolution architectural photographs
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Strict 3-zone top bar contract with mobile drawer
│   │   ├── ScrollWalkthrough.tsx  # Continuous 7-chapter scrollytelling walking tour
│   │   ├── ArchitecturalPhilosophy.tsx # 4 design pillars & Japandi material swatches
│   │   ├── SuitesShowcase.tsx     # Suite catalog, photo galleries & amenity checklists
│   │   ├── NeighborhoodTransit.tsx # Disney shuttle matrix & local bento cards
│   │   ├── RateCalculatorSection.tsx # Real-time rate estimator & reservation engine
│   │   └── Footer.tsx             # Tokyo contact, public health license & legal details
│   ├── data/
│   │   └── hotelData.ts           # 7 tour stops, camera profiles, hotspots & room catalog
│   ├── utils/
│   │   ├── assetHelper.ts         # Portable base URL resolution for GitHub Pages subpaths
│   │   ├── audioAmbience.ts       # 432Hz ambient soundscape synthesizer (Web Audio API)
│   │   ├── bookingCalculator.ts   # Pure functional date math, rates, cleaning fees, and tax
│   │   └── bookingCalculator.test.ts # Automated test suite (Node.js built-in test runner)
│   ├── App.tsx                    # Root application component
│   └── main.tsx                   # React 19 entry point
├── vite.config.ts                 # Configured with base: './' for GitHub Pages compatibility
└── package.json
```

### Core Technical Highlights
1. **Relative Base Path Resolution (`base: './'`)**:
   - `vite.config.ts` specifies `base: './'`, and `src/utils/assetHelper.ts` wraps all image paths with `import.meta.env.BASE_URL`.
   - The app runs seamlessly on **custom domains**, **root paths**, and **GitHub Pages repository subpaths** (e.g., `https://<username>.github.io/<repo-name>/`) without broken asset URLs.
2. **Inertia-Weighted Programmatic Smooth Scrolling**:
   - `smoothScrollTo` uses a custom `requestAnimationFrame` loop with `easeInOutCubic` easing to guarantee that clicking chapter steppers or "Walk to Next Space" glides over a smooth 1.6-second duration.
3. **Decoupled Business Logic & Unit Tests**:
   - Rate calculations (nightly tiered rates, extra guest surcharges, cleaning fees, 10% Japanese consumption tax, date math, and form validation) are completely decoupled into `src/utils/bookingCalculator.ts`.
   - Verified via automated unit tests using Node.js built-in runner (`tsx --test`).
4. **Zero-External Audio Asset Overhead**:
   - Ambient evening sanctuary audio is synthesized directly in the browser using the Web Audio API (sine oscillators tuned to 432Hz with gentle low-pass filtering and volume fade curves), requiring zero external MP3 downloads.

---

## 🚀 Quick Start: Local Development

### 1. Prerequisites
- **Node.js** 18 or higher
- **npm** (or bun / yarn / pnpm)

### 2. Clone and Install
```bash
git clone https://github.com/<your-username>/minn-kasai.git
cd minn-kasai
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 4. Run Unit Tests
```bash
npx tsx --test src/utils/bookingCalculator.test.ts
```

### 5. Build for Production
```bash
npm run build
```
The bundled production assets will be output to `./dist/`.

---

## 🌐 Quick Start: Deploying to GitHub Pages

### Method 1: Automated Deployment via GitHub Actions (Recommended)

This repository includes a preconfigured GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that builds and deploys your site automatically every time you push to the `main` branch.

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Minn Kasai landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your repository settings**:
   - Open your repository on GitHub.
   - Go to **Settings** $\rightarrow$ **Pages** (under the "Code and automation" section in the left sidebar).
   - Under **Build and deployment** $\rightarrow$ **Source**, choose **"GitHub Actions"**.

3. **View your deployed site**:
   - GitHub Actions will automatically trigger the `Deploy to GitHub Pages` workflow.
   - Once completed (~1 minute), your site will be live at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```

---

### Method 2: Manual Deployment via `gh-pages` Branch

If you prefer building locally and pushing the `dist` folder:

1. **Install the `gh-pages` package** (dev dependency):
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add a deploy script to `package.json`**:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Build and Deploy**:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

4. **Verify GitHub Pages Source**:
   - In your GitHub repo **Settings** $\rightarrow$ **Pages**, set **Source** to **"Deploy from a branch"**, select the `gh-pages` branch, and folder `/ (root)`.

---

### 💡 Why the White Screen Occurred & How It Was Resolved

If you saw an empty white screen after your initial deployment, this was caused by three classic GitHub Pages pitfalls:

1. **Subpath Asset Resolution**:
   - By default, GitHub Pages serves your site at a subfolder URL: `https://<username>.github.io/<repository-name>/`.
   - If assets are requested with `./assets/...` without an absolute repository prefix or without a trailing slash (`https://<username>.github.io/<repo-name>`), the browser mistakenly resolves files to `https://<username>.github.io/assets/...` (root), returning a 404 for the JavaScript bundle and resulting in an empty white screen.
   - **The Fix**: `vite.config.ts` now automatically detects `process.env.GITHUB_REPOSITORY` in GitHub Actions (or `process.env.BASE_PATH` from `actions/configure-pages`) and sets `base: '/<repository-name>/'`. The script tag in `index.html` is generated with the exact absolute repository path, working reliably regardless of trailing slashes.

2. **Jekyll Static File Filtering (`.nojekyll`)**:
   - GitHub Pages enables Jekyll by default, which ignores folders and files that it treats as templates.
   - **The Fix**: An empty `.nojekyll` file has been added to `/public/.nojekyll`, which is copied directly into `dist/` upon build, disabling Jekyll processing entirely.

3. **Workflow Step Ordering**:
   - `actions/configure-pages@v5` must run *before* `npm run build` so that the computed Pages `base_path` is passed into the Vite build environment.
   - **The Fix**: Updated `.github/workflows/deploy.yml` so `configure-pages` executes first, passing `BASE_PATH: ${{ steps.pages.outputs.base_path }}` to `npm run build`.

4. **Deep-Link / Refresh 404 Fallback (`404.html`)**:
   - Added `cp dist/index.html dist/404.html` to the build script so that refreshing the page or navigating directly to an anchor never returns GitHub's generic 404 page.

#### How to Apply the Fix to Your GitHub Repo:
Simply push the latest changes:
```bash
git add .
git commit -m "fix: resolve GitHub Pages white screen (dynamic base path & .nojekyll)"
git push origin main
```
GitHub Actions will automatically rebuild and deploy within ~1 minute, and your site will render immediately!

---

## 📄 License & Attribution

- **Architectural Concept**: Inspired by Minn Kasai (SQUEEZE Inc., Tokyo, Japan).
- **Code License**: Apache-2.0.
