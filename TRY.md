# 🛠️ 해볼 것 (실습 아이디어)

리뷰한 개념을 손으로 익혀보고 싶을 때 꺼내는 아이디어 창고.
필수 아님 — "이걸로 뭐 실습할까" 물었거나, "이거 해보면 좋겠다" 싶을 때만 남긴다.
각 항목: 무엇을 · 왜 · 어느 글에서.

- [ ] **나만의 second brain 만들기** — 회사 단위 말고 개인 노트·북마크·코드조각에 Topic 아이디어를 얹어본다: 출처를 공통 포맷(ContentUnit)으로 정규화 → 신뢰 상태(fresh·stale·disputed) 부여 → 충돌은 숨기지 말고 노출. _왜: '답을 만드는 것'보다 '믿을 수 있게' 만드는 걸 내 것으로. 이 blog-review 레포가 이미 그 씨앗._ — [토스 Topic](reviews/2026-08-03-toss-llm-context-topic.md)
- [ ] **미니 실시간 알림 데모** — 소켓은 "새 글 생김" 신호만 push하고 목록은 조회 API로 재요청하게 만든다. 앱 껐다 켜도(재접속) 조회 한 번으로 최신 복구되는지 직접 체감. _왜: "소켓이 진실을 나르나, 신호만 나르나"를 손으로 확인._ — [Nextree 웹소켓](reviews/2026-07-30-nextree-websocket-chat.md)
- [x] **웹 컴포넌트 실습 랩 (7종)** — Shadow DOM 스타일 격리, 같은 메모리 vs iframe(함수 참조), SameSite 쿠키 차단, CDN 캐시버스팅, CSRF 공격/방어, 구조적 보안(파일엔 비밀 없음), SSR vs CSR을 각각 눈으로 확인. 의존성 0개(Node 내장 http + Vue CDN). _왜: "훔쳐가도 무용지물"이라는 구조적 보안의 실체를 직접 만져서 확인._ — [올리브영 웹 컴포넌트](reviews/2026-08-04-oliveyoung-vue-web-components.md) · [실습 코드](examples/oliveyoung-web-components/)
- [x] **TS 미션 4종** — 구조적 타이핑의 함정(객체 리터럴 직접 전달 vs 변수 경유), 타입 에러가 있어도 JS가 emit되는 걸 직접 확인 + `noEmitOnError`로 막아보기, `noUncheckedIndexedAccess`로 배열 범위 초과를 컴파일 타임에 잡기, `as` 오용 vs `as const`의 안전한 쓰임. 의존성 0개(전역 `tsc`만 사용). _왜: "타입은 컴파일 타임 약속일 뿐"이라는 걸 직접 에러를 내보고 눈으로 확인._ — [Nextree 타입스크립트](reviews/2026-08-05-nextree-typescript.md) · [실습 코드](examples/nextree-typescript/)
