---
name: figma-to-react
description: Figma 디자인을 읽어 React + Tailwind v4 코드로 변환하는 스킬. Figma URL이나 fileKey/nodeId가 주어지면 MCP 도구로 디자인을 분석하고, 컴포넌트·페이지 레이아웃·디자인 토큰·에셋을 React 코드로 구현한다. "피그마 → 코드", "피그마 구현", "디자인 코딩", "figma to code", "피그마 링크 줘서 만들어줘", "이 디자인 React로", "피그마 변환", "컴포넌트 추출" 등의 요청에 반드시 이 스킬을 사용한다. Figma URL이 포함된 코딩 요청이면 항상 트리거한다.
---

# Figma → React + Tailwind v4 변환 스킬

Figma MCP 도구로 디자인을 읽고 React + Tailwind v4 컴포넌트로 변환한다.
Claude Code 전용 스킬이다.

## 전제 조건

- Figma MCP 서버가 `.mcp.json`에 연결되어 있어야 한다
- React 19 + Tailwind CSS v4 프로젝트가 이미 셋업되어 있어야 한다

사용자가 사용법을 물으면 `references/GUIDE.md`를 읽어서 안내한다.

---

## 핵심 원칙

이 스킬의 사용자는 Figma 숙련도가 낮다. Figma의 레이어 구조나 네이밍이 비효율적일 수 있다. 따라서 다음 원칙을 지킨다.

**① Figma 구조를 그대로 따르지 않는다**
Figma 레이어 트리는 참고만 한다. 스크린샷과 디자인 컨텍스트를 시각적으로 분석하여, React 관점에서 최적의 컴포넌트 트리를 직접 설계한다. Figma에서 같은 레벨에 있더라도 의미상 부모-자식이면 중첩시키고, 깊게 중첩된 레이어라도 의미상 독립적이면 분리한다.

**② 반복 패턴을 찾아 통합한다**
페이지 전체를 분석할 때, 시각적으로 유사한 요소(카드, 버튼, 리스트 아이템 등)를 식별한다. 이들이 Figma에서 서로 다른 이름과 구조로 되어 있더라도, 하나의 재사용 컴포넌트로 통합하고 props로 차이를 제어한다. "비슷하게 생긴 것은 같은 컴포넌트다"가 기본 판단 기준이다.

**③ 하드코딩을 지양한다**
색상·간격·폰트 등의 디자인 값은 Tailwind v4 유틸리티 클래스로 표현한다. 표준 유틸리티로 대응 가능하면 그대로 쓰고, 프로젝트 고유 값만 `@theme` 블록에 토큰으로 선언한다. 인라인 스타일(`style={{}}`)은 사용하지 않는다. 텍스트 콘텐츠(영화 제목, 가격 등)도 하드코딩하지 않고 props 또는 데이터 바인딩으로 처리한다.

## 입력 패턴

사용자는 두 종류의 Figma 링크를 제공할 수 있다.

| 입력 | 용도 |
|------|------|
| **페이지 링크** | 전체 시안. 레이아웃·배치·반복 패턴 파악용 |
| **컴포넌트 링크** | 개별 요소. 상세 디자인 속성 추출용 |

두 링크를 모두 받는 것이 가장 정확하다.
페이지 링크만 있으면 구조 분석 후 컴포넌트 분해 계획을 먼저 제안한다.
컴포넌트 링크만 있으면 해당 요소만 독립 구현한다.

## URL 파싱 규칙

Figma URL에서 `fileKey`와 `nodeId`를 추출한다.

```
https://figma.com/design/:fileKey/:fileName?node-id=:int1-:int2
→ fileKey = :fileKey
→ nodeId = ":int1::int2"   (하이픈을 콜론으로 변환)

https://figma.com/design/:fileKey/branch/:branchKey/:fileName
→ fileKey = :branchKey (브랜치가 있으면 branchKey 사용)
```

nodeId의 하이픈(`-`)은 반드시 콜론(`:`)으로 변환해야 MCP 도구가 인식한다. 이 변환을 빠뜨리면 "node not found" 오류가 난다.

---

## 워크플로우

### Phase 1 — 분석 (읽기 전용)

코드를 작성하기 전에 디자인을 충분히 이해한다.

#### 1-A. 페이지 구조 수집

페이지 링크가 주어지면 `Figma:get_metadata`로 전체 노드 트리를 가져온다.

```
Figma:get_metadata
  fileKey: "<fileKey>"
  nodeId: "<pageNodeId>"
  clientFrameworks: "react"
  clientLanguages: "javascript"
```

반환된 XML에서 최상위 Frame/Section 이름과 nodeId를 목록화한다.

#### 1-B. 시각 분석

페이지 전체와 주요 섹션의 스크린샷을 확인한다.

```
Figma:get_screenshot
  fileKey: "<fileKey>"
  nodeId: "<pageNodeId>"
```

스크린샷에서 다음을 파악한다:
- 페이지의 섹션 구분 (헤더, 히어로, 콘텐츠, 푸터 등)
- **반복되는 시각 패턴** (카드 목록, 탭 항목, 배너 등)
- 그리드/플렉스 레이아웃 방향

#### 1-C. 컴포넌트별 상세 분석

각 주요 섹션 또는 사용자가 제공한 컴포넌트 링크에 대해 `Figma:get_design_context`를 호출한다.

```
Figma:get_design_context
  fileKey: "<fileKey>"
  nodeId: "<nodeId>"
  clientFrameworks: "react"
  clientLanguages: "javascript"
```

반환 정보:
- 참조 코드 (참고용. 그대로 복사 금지)
- 스크린샷 (시각 확인 필수)
- 에셋 URL (이미지·아이콘 다운로드용)

`excludeScreenshot`은 절대 `true`로 설정하지 않는다.

#### 1-D. 디자인 토큰 수집

`Figma:get_variable_defs`로 Variables를 가져온다.

```
Figma:get_variable_defs
  fileKey: "<fileKey>"
  nodeId: "<nodeId>"
  clientFrameworks: "react"
  clientLanguages: "javascript"
```

Variables가 없거나 빈약할 수 있다(사용자의 Figma 숙련도가 낮으므로). 이 경우 `get_design_context`에서 추출한 실제 색상·폰트 값을 기반으로 토큰을 직접 정의한다.

### Phase 2 — 컴포넌트 설계

Phase 1에서 수집한 정보를 종합하여 React 컴포넌트 트리를 설계한다. 이 단계에서 **사용자에게 계획을 먼저 보여주고 확인을 받는다.**

#### 2-A. 반복 패턴 식별

스크린샷과 노드 구조를 교차 분석하여 반복 요소를 찾는다.

판단 기준:
- 같은 레이아웃 구조 (이미지 + 텍스트 + 버튼 조합 등)
- 같은 크기·비율의 프레임
- 같은 색상·타이포 조합

Figma에서 이름이 다르더라도 (예: `Card1`, `영화카드`, `item-3`) 시각적으로 유사하면 **하나의 컴포넌트로 통합**한다. 차이점은 props로 제어한다.

**예시:**
```
Figma 레이어:            →  React 컴포넌트:
├── 인기영화카드           ─┐
├── MovieCard-v2          ─┤→  <Card /> (props: img, title, rating)
├── 최신작_아이템          ─┘
├── 상단배너               →  <HeroBanner />
├── 네비게이션             →  <Nav />
└── GNB영역               →  (Nav와 통합 검토)
```

#### 2-B. 컴포넌트 계획 수립

다음 형식으로 정리하여 사용자에게 제시한다:

```
## 컴포넌트 분해 계획

### 페이지: HomePage
구성: <Header /> → <HeroBanner /> → <SectionTitle /> + <CardGrid /> (×3) → <Footer />

### 공통 컴포넌트
| 컴포넌트 | 역할 | props | Figma 출처 |
|----------|------|-------|------------|
| Card | 영화/콘텐츠 카드 | img, title, rating, href | 인기영화카드, MovieCard-v2, 최신작_아이템 통합 |
| SectionTitle | 섹션 제목 | title, moreHref | "인기 영화" 제목 영역 |
| ...  | ... | ... | ... |

### @theme 토큰
--color-primary: #E50914
--color-bg: #141414
--font-body: "Pretendard", sans-serif
```

사용자가 수정을 요청하면 계획을 갱신한 뒤 다음 단계로 진행한다.

### Phase 3 — 구현

확정된 계획에 따라 코드를 작성한다. 순서: 토큰 → 공통 컴포넌트(말단) → 조합 컴포넌트 → 페이지.

#### 3-A. 디자인 토큰 생성

`@theme` 블록을 CSS 파일에 작성한다.

```css
@import "tailwindcss";

@theme {
  --color-primary: #E50914;
  --color-bg: #141414;
  --color-surface: #1F1F1F;
  --color-txt: #E5E5E5;
  --font-body: "Pretendard", sans-serif;
  --spacing-section: 3rem;
}
```

규칙:
- Tailwind v4 표준 값(`text-sm`, `gap-4`, `rounded-lg` 등)으로 충분하면 토큰을 만들지 않는다
- 프로젝트 고유 색상·폰트·간격만 토큰으로 선언한다
- `tailwind.config.js`는 사용하지 않는다

#### 3-B. 에셋 다운로드

`get_design_context` 응답의 에셋 URL을 `curl`로 저장한다.

```bash
curl -o src/assets/images/hero-bg.png "<asset-url>"
curl -o src/assets/icons/play.svg "<asset-url>"
```

저장 규칙:
- 이미지 → `src/assets/images/`
- SVG 아이콘 → `src/assets/icons/` (가능하면 React 컴포넌트로 인라인 변환)
- 파일명은 Figma 레이어 이름을 kebab-case로 변환

#### 3-C. 컴포넌트 코드 작성

말단 컴포넌트(Card, Button 등)부터 작성하고, 조합 컴포넌트(CardGrid, Section 등)를 거쳐 페이지까지 상향식으로 구현한다.

**코드 규칙:**

| 항목 | 규칙 |
|------|------|
| 스타일링 | Tailwind v4 유틸리티 클래스만. 인라인 스타일 금지. 장식 CSS 금지 |
| 식별자 | 짧게 (`uid`, `res`, `idx`, `cls` 등) |
| 문법 | ES2025+ (optional chaining, nullish coalescing, 구조분해 등) |
| export | `export default function ComponentName()` |
| props | 구조분해로 수신, 기본값 설정 |
| 반복 데이터 | `.map()` + `key` prop. 절대 수동 복붙하지 않는다 |
| 레이아웃 | Flexbox/Grid 우선. Figma Auto Layout → `flex`, Figma Grid → `grid` |
| 반응형 | 모바일 퍼스트. `sm:` → `md:` → `lg:` |
| 이미지 | `alt`, `loading="lazy"`, `width`/`height` 필수 |
| 접근성 | 시맨틱 태그(`header`, `nav`, `main`, `section`, `footer`), ARIA |

**Figma → Tailwind 매핑:**

```
Auto Layout
  Direction Vertical   → flex flex-col
  Direction Horizontal → flex
  Gap                  → gap-{n}
  Padding              → p-{n} 또는 px-{n} py-{n}
  Align                → items-center, justify-between 등

Sizing
  Fill      → w-full 또는 flex-1
  Hug       → w-fit
  Fixed     → w-[360px]

Color
  Variable 있음 → @theme 토큰 → text-primary, bg-bg
  Variable 없음 → 임의값 → text-[#FF6B6B]

Typography
  Font Size      → text-{size}
  Font Weight    → font-{weight}
  Line Height    → leading-{n}
  Letter Spacing → tracking-{n}

Effects
  Drop Shadow    → shadow-{size} 또는 shadow-[값]
  Blur           → blur-{n}
  Border Radius  → rounded-{n}
```

**파일 구조:**

```
src/
├── components/
│   ├── Card.jsx
│   ├── Nav.jsx
│   └── SectionTitle.jsx
├── pages/
│   └── HomePage.jsx
├── assets/
│   ├── images/
│   └── icons/
└── styles/
    └── app.css           // @theme 블록
```

#### 3-D. 반복 요소 통합 검증

컴포넌트를 작성하면서, Phase 2에서 통합 대상으로 지정한 요소들이 실제로 하나의 컴포넌트로 충분히 표현되는지 확인한다.

확인 포인트:
- 통합 컴포넌트의 props가 3~5개 이내인가 (너무 많으면 분리 재고)
- 조건부 렌더링(`{show && ...}`)이 과도하지 않은가
- 레이아웃 차이가 props로 제어 가능한 수준인가

만약 통합이 오히려 복잡성을 높이면, 별도 컴포넌트로 분리한다. 판단 기준은 "props 3개 추가로 해결되면 통합, 레이아웃 자체가 다르면 분리".

### Phase 4 — 검증

코드 작성 완료 후 다음을 확인한다.

1. **시각 일치**: 스크린샷과 비교하여 레이아웃·색상·타이포가 맞는지
2. **토큰 대응**: `@theme` 값이 Figma 디자인 값과 일치하는지
3. **에셋 경로**: 다운로드한 이미지·아이콘 경로가 정확한지
4. **반복 통합**: 유사 요소가 실제로 같은 컴포넌트를 재사용하는지
5. **하드코딩 없음**: 색상·간격에 매직넘버가 남아 있지 않은지
6. **반응형**: 최소한 모바일/데스크탑 2단계 대응이 되어 있는지

불일치가 발견되면 즉시 수정한다. "대략 비슷합니다" 식으로 넘기지 않는다.

---

## 작업 규모별 진입점

| 입력 | 진행 |
|------|------|
| 페이지 링크 + 컴포넌트 링크 | Phase 1 전체 → Phase 2 → Phase 3 → Phase 4 |
| 페이지 링크만 | Phase 1(1-A~1-C) → Phase 2(구조 제안) → 사용자 확인 → Phase 3 → Phase 4 |
| 컴포넌트 링크만 | Phase 1(1-C만) → Phase 3(해당 컴포넌트) → Phase 4 |
| 토큰 추출만 | Phase 1(1-D만) → Phase 3-A |
| 에셋 다운로드만 | Phase 1(1-C만) → Phase 3-B |

---

## 주의사항

- `get_design_context`의 참조 코드는 **참고용**이다. 복사하지 않고 위 규칙에 맞춰 새로 작성한다
- Figma 절대 좌표(`left`, `top`)를 그대로 옮기지 않는다. Flexbox/Grid로 재구성한다
- Figma 레이어 이름이 한국어·영어 혼용이거나 의미 없는 이름(`Frame 427`, `Group 12`)일 수 있다. 코드의 컴포넌트명은 역할 기반 영문 PascalCase로 독립 작명한다
- 에셋 URL은 임시 URL이므로 반드시 로컬에 다운로드한다
- 복잡한 페이지는 한 번에 전부 만들지 않는다. 섹션 단위로 순차 구현한다
