# 라우트 트리 vs 네비게이션 스택

개념어이자 (App Router에선) **실제 디렉토리 구조**. 파일시스템이 곧 라우팅이라 `app/` 아래 폴더 구조가 그대로 URL 트리다.

네비게이션 스택과는 **다른 축**이다:

| | 라우트 트리 | 네비게이션 스택 |
|---|---|---|
| 성격 | **정적** — 어떤 화면들이 존재하는가 | **동적** — 지금 어떤 순서로 쌓였나 |
| 축 | 공간(구조) | 시간(이력) |
| iOS 비유 | 스토리보드에 배치된 화면 전체 | `navigationController.viewControllers` |

`/domestic/srp`가 **존재한다**는 것과, 사용자가 홈→검색→SRP로 **쌓아왔다**는 건 다른 얘기다. 웹에서 후자가 브라우저 히스토리고, 그래서 이 구분이 결국 [뒤로가기 문제](android-back-key.md)와 같은 곳에서 만난다.

**관련:** [App Router vs Pages Router](nextjs-app-router.md) · [안드로이드 백키](android-back-key.md)
**나온 곳:** [여기어때 항공 프론트엔드](../reviews/2026-08-10-yeogieottae-one-codebase-web-webview.md)
