# 📖 개념 사전

글과 무관하게 재사용되는 **용어·기술 개념**을 모아둔다.
리뷰 노트는 여기로 **링크만** 걸고 개념 설명을 담지 않는다 — 같은 개념을 글마다 다시 설명하지 않기 위해서.

- 개념 하나 = 파일 하나. 파일명은 영문 케밥 슬러그, 제목(`# `)은 한글/원어.
- 각 파일 맨 아래에 **관련 개념 링크**와 **처음 나온 리뷰 노트 링크**를 남긴다.
- 새 개념을 추가하면 아래 목록에도 한 줄 추가한다.

## 프론트엔드 / 웹

| 개념 | 한 줄 |
|---|---|
| [웹뷰 (WebView)](webview.md) | 앱 안에 박은 브라우저 — 렌더링 기술이 아니라 **실행 컨테이너**의 차이 |
| [안드로이드 백키](android-back-key.md) | OS가 소유한 전역 back — 웹뷰에선 앱이 삼키지 말고 브릿지로 넘겨야 |
| [웹 컴포넌트 / 커스텀 엘리먼트](web-components.md) | 표준 태그로 감싼 통조림 — 같은 실행 컨텍스트라 살아있는 객체를 넘길 수 있다 |
| [Shadow DOM](shadow-dom.md) | 격리는 자동, 문제는 **밖→안**이 안 넘어온다는 것 |
| [App Router vs Pages Router](nextjs-app-router.md) | 라우트 그룹 `(web)`으로 URL은 그대로 두고 레이아웃만 가르기 |
| [라우트 트리 vs 네비게이션 스택](route-tree-vs-navigation-stack.md) | 공간(무엇이 존재하나) vs 시간(어떻게 쌓였나) |
| [MVVM](mvvm.md) | ViewModel이 UI 상태를 갖는 건 정상 — **절단면이지 복제선이 아니다** |
| [Props](props.md) | `properties`의 약자 (`propagation` 아님) |
| [디자인 토큰](design-token.md) | 컴포넌트가 값이 아니라 **이름**을 참조 — 일관성이 목적, 이식성은 부산물 |
| [tailwind-merge](tailwind-merge.md) | 클래스 이름이 아니라 CSS 역할과 단방향 충돌 관계로 앞의 무효 클래스를 제거 |
| [WebAssembly](webassembly.md) | 브라우저 확장 시도 중 유일한 생존자 — JS를 대체 안 하고 나란히 |
| [RxJS](rxjs.md) | 시간에 따른 값을 스트림으로 보고 완료·취소·동시성 정책을 조합 |
| [프론트엔드 상태 관리](frontend-state-management.md) | Redux·Zustand·Jotai는 상태 모델, RxJS는 비동기 흐름 모델 |
| [composition 이벤트 (IME 조합)](composition-event.md) | 조합 중 값과 확정 값을 구분 — iOS Safari는 한글에서 아예 안 쏜다 |
| [Reflow / Repaint](reflow-repaint.md) | 비용은 변경 지점이 아니라 **그걸 감싼 레이아웃 단위 크기**에 비례 |
| [윈도잉 / 가상 스크롤](windowing.md) | 버퍼 단위가 작을수록 reflow 범위는 줄지만 높이 추정 부담은 는다 |

## 타입 / 컴파일

| 개념 | 한 줄 |
|---|---|
| [정적 분석](static-analysis.md) | 실행을 관찰하는 게 아니라 **소스만 보고** 판단 |
| [컴파일러 파이프라인](compiler-pipeline.md) | 표준 패턴 — 동적 타입 언어는 의미 분석 단계가 통째로 빠진다 |
| [타입 단언 (`as`, `as const`)](type-assertion.md) | 검사가 아니라 **컴파일러 입막음** — `as const`만 방향이 반대 |
| [Zod](zod.md) | 스키마 하나에서 타입과 런타임 검증을 둘 다 파생 (SoT) |

## 네트워크 / 인프라 / 보안

| 개념 | 한 줄 |
|---|---|
| [WebSocket](websocket.md) | TCP "위에서" — 쓰는 이유 1순위는 비용이 아니라 **server push** |
| [이벤트 알림 vs 푸시 알림](event-vs-push-notification.md) | 온라인용(웹소켓)과 오프라인용(APNs/FCM)은 **다른 레이어** |
| [origin — 두 가지 뜻](origin.md) | 보안의 origin과 CDN의 origin server는 무관한 별개 시스템 |
| [CDN](cdn.md) | 캐시 버스팅은 TTL 우회가 아니라 **TTL을 신경 안 써도 되게** 만드는 것 |
| [오브젝트 스토리지](object-storage.md) | S3는 AWS 상품명 — GCS·Blob Storage가 같은 것 |
| [CSRF](csrf.md) | 쿠키가 악성사이트발 요청에도 자동으로 실리는 것이 공격의 정체 |
| [서비스 디스커버리와 게이트웨이](service-discovery-gateway.md) | 현재 살아 있는 서버를 찾고 정책에 맞는 목적지로 안내 |

## 개발 프로세스 / 도구

| 개념 | 한 줄 |
|---|---|
| [Breaking change & semver](breaking-change.md) | 판정 기준은 크기가 아니라 **"남의 코드가 손 안 대고 돌아가나"** |
| [docstring](docstring.md) | 기계가 파싱하는 규격 주석 — 문서·MCP를 여기서 파생시키면 안 어긋난다 |
| [모노레포](monorepo.md) | 배포를 없앤 게 아니라 **개발 루프에서 배포를 걷어낸** 것 |
| [플러그인](framework-plugin.md) | 런타임 주입형은 프레임워크와 함께 죽고, 빌드타임 생성형은 결과물만 남는다 |
| [증분 빌드와 피드백 루프](incremental-build.md) | 루프가 빠르면 에이전트가 더 자주 시도하고 스스로 교정한다 |
| [agent-device](agent-device.md) | 접근성 트리로 앱을 읽는 UI 자동화 — 재현 가능해서 E2E로 승격 |
| [미들웨어](middleware.md) | 입력과 최종 처리자 사이에서 인증·로깅·사이드 이펙트 등을 확장 |
| [에이전틱 워크플로우 루프](agentic-workflow-loop.md) | 위임·관찰·개입·검토 — 사람의 일이 코딩에서 루프 운영으로 이동 |
| [완료 기준 (acceptance criteria)](acceptance-criteria.md) | 끝을 참/거짓 판정 가능한 문장으로 미리 쓴 것 — 미래의 수용 테스트 |
| [Record and replay](record-and-replay.md) | 시연해 자동화 — API 없는 시스템의 임시 다리, 표면 구조에 묶여 깨진다 |

## AI / ML

| 개념 | 한 줄 |
|---|---|
| [NLI](nli.md) | entailment/contradiction/neutral **자동 판정기** — 사람에게 넘기는 단계가 아님 |
| [벤더 (vendor)](vendor.md) | 모델 공급사 — "벤더가 먼저 지우라고 말하고 있다"의 그 벤더 |
| [임베딩](embedding.md) | 텍스트를 벡터로 **재는** 변환 — 정보를 더하는 게 아니다 |
| [청킹](chunking.md) | 조각을 어떻게 만드느냐가 잴 대상 자체를 바꾼다 — RAG 품질의 진짜 상한 |
