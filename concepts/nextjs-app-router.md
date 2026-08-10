# App Router vs Pages Router (Next.js)

Pages가 원래 방식, App이 Next 13(2022)에 나온 새 방식.

| | Pages Router | App Router |
|---|---|---|
| 디렉토리 | `pages/` | `app/` |
| 라우트 | `pages/about.tsx` → `/about` | `app/about/page.tsx` → `/about` |
| 기본 컴포넌트 | 전부 클라이언트 | **기본이 서버 컴포넌트** (`"use client"`로 옵트인) |
| 데이터 페칭 | `getServerSideProps` 등 | 컴포넌트 안에서 `async/await` |
| 레이아웃 | `_app.tsx` 하나 (전역) | `layout.tsx` **중첩 가능** |

## 라우트 그룹

폴더명을 괄호로 감싸면(`(web)`, `(native)`) **URL엔 안 들어가고 레이아웃만 따로** 줄 수 있다.
→ **"환경 차이를 레이아웃 한 겹에 몰아넣는다"를 문법 수준에서 지원.** Pages Router는 `_app.tsx`가 하나뿐이라 런타임 분기로 처리해야 한다.

⚠️ 라우트 그룹 둘이 **같은 URL**을 만들면 Next.js가 충돌 에러를 낸다. `(web)/domestic/srp`와 `(native)/domestic/srp`는 둘 다 `/domestic/srp`가 되므로 경로 prefix나 미들웨어 rewrite가 필요하다.

**관련:** [라우트 트리 vs 네비게이션 스택](route-tree-vs-navigation-stack.md) · [Props](props.md)
**나온 곳:** [여기어때 항공 프론트엔드](../reviews/2026-08-10-yeogieottae-one-codebase-web-webview.md)
