# 🛠️ 해볼 것 (실습 아이디어)

리뷰한 개념을 손으로 익혀보고 싶을 때 꺼내는 아이디어 창고.
필수 아님 — "이걸로 뭐 실습할까" 물었거나, "이거 해보면 좋겠다" 싶을 때만 남긴다.
각 항목: 무엇을 · 왜 · 어느 글에서.

- [ ] **나만의 second brain 만들기** — 회사 단위 말고 개인 노트·북마크·코드조각에 Topic 아이디어를 얹어본다: 출처를 공통 포맷(ContentUnit)으로 정규화 → 신뢰 상태(fresh·stale·disputed) 부여 → 충돌은 숨기지 말고 노출. _왜: '답을 만드는 것'보다 '믿을 수 있게' 만드는 걸 내 것으로. 이 blog-review 레포가 이미 그 씨앗._ — [토스 Topic](reviews/2026-08-03-toss-llm-context-topic.md)
- [ ] **미니 실시간 알림 데모** — 소켓은 "새 글 생김" 신호만 push하고 목록은 조회 API로 재요청하게 만든다. 앱 껐다 켜도(재접속) 조회 한 번으로 최신 복구되는지 직접 체감. _왜: "소켓이 진실을 나르나, 신호만 나르나"를 손으로 확인._ — [Nextree 웹소켓](reviews/2026-07-30-nextree-websocket-chat.md)
- [x] **웹 컴포넌트 실습 랩 (7종)** — Shadow DOM 스타일 격리, 같은 메모리 vs iframe(함수 참조), SameSite 쿠키 차단, CDN 캐시버스팅, CSRF 공격/방어, 구조적 보안(파일엔 비밀 없음), SSR vs CSR을 각각 눈으로 확인. 의존성 0개(Node 내장 http + Vue CDN). _왜: "훔쳐가도 무용지물"이라는 구조적 보안의 실체를 직접 만져서 확인._ — [올리브영 웹 컴포넌트](reviews/2026-08-04-oliveyoung-vue-web-components.md) · [실습 코드](examples/oliveyoung-web-components/)
- [x] **에이전트 스캐폴딩 최소 뼈대 (momento)** — 글의 원리를 실제 파일로 옮김: `CLAUDE.md`를 내용이 아닌 **라우터**(트리거+순서+절대규칙)로 두고, 살은 `.claude/` 하위로 위임 — `workflows`(create-pr, figma-to-view, deploy-firebase) / `checklists`(REQUIRED·OPTIONAL·CONDITIONAL) / `references`(지시 없이 사실만). _왜: "우리만 아는 사실(영구) vs 모델이 못해서 만든 임시책(유통기한)"의 경계를 직접 파일로 갈라보려고. `references/`만 갈아끼우면 다른 프로젝트에 재사용됨._ — [DelightRoom 워크플로우](reviews/2026-07-31-delightroom-claude-code-workflow.md) · [실습 코드](examples/momento/)
- [x] **TS 미션 4종** — 구조적 타이핑의 함정(객체 리터럴 직접 전달 vs 변수 경유), 타입 에러가 있어도 JS가 emit되는 걸 직접 확인 + `noEmitOnError`로 막아보기, `noUncheckedIndexedAccess`로 배열 범위 초과를 컴파일 타임에 잡기, `as` 오용 vs `as const`의 안전한 쓰임. 의존성 0개(전역 `tsc`만 사용). _왜: "타입은 컴파일 타임 약속일 뿐"이라는 걸 직접 에러를 내보고 눈으로 확인._ — [Nextree 타입스크립트](reviews/2026-08-05-nextree-typescript.md) · [실습 코드](examples/nextree-typescript/)
- [x] **tailwind-merge prefix 실습 랩 (5종)** — 기본 분류표가 `yf-*`를 모르는 상황, prefix 제거 방식이 커스텀 유틸리티를 못 푸는 한계, `yf-text-*` 역할별 세분화, `p → px → pl` 단방향 충돌, variant 범위를 의존성 없는 미니 병합기로 확인. _왜: 도구를 커스텀하면 어떤 내부 규칙까지 소유하게 되는지 분류표를 직접 바꾸며 체감._ — [여기어때 항공 프론트엔드 3편](reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md) · [실습 코드](examples/yeogieottae-tailwind-merge-prefix/)
- [x] **RxJS 사이드 이펙트 생명주기 실습** — 같은 `boot A → shutdown → boot B`를 조기 완료 버전과 `concatMap` 직렬화 버전으로 실행해, API 응답과 전체 작업 완료의 차이를 로그로 확인. _왜: 완료·취소 경계가 없는 비동기 작업이 어떻게 race condition이 되는지 직접 보기 위해._ — [채널톡 RxJS](reviews/2026-08-13-channel-rxjs-side-effects.md) · [실습 코드](examples/channel-rxjs-side-effects/)
