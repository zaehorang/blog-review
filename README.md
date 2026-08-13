# 📚 테크 블로그 리뷰 로그

## 🎯 왜 하는가
혼자서는 겪을 수 있는 엔지니어링 상황이 한정적이다. 그래서 다른 팀들이 남긴 글로
**많은 상황을 대리 경험**하고, 그걸 요약에 그치지 않고 **내 사고 자산**으로 만든다.
목표는 하나 — 비슷한 문제가 실제로 닥쳤을 때 **빠르게 접근하고 사고할 수 있게** 되는 것.
그래서 매 리뷰는 "무슨 글이었나"보다 **"나라면 어떻게 봤나 / 어디서 틀렸나"**에 무게를 둔다.

---

기업 테크 블로그를 **하루 1개**(주중) 리뷰한다.

- 리뷰 노트: [`reviews/`](./reviews/) — 글마다 "나라면 어떻게 봤나 / 어디서 틀렸나"
- 개념 사전: [`concepts/`](./concepts/README.md) — 글과 무관하게 재사용되는 용어·기술 개념
- 실습 코드: [`examples/`](./examples/) · 해볼 것: [`TRY.md`](./TRY.md) · 남은 질문: [`QUESTIONS.md`](./QUESTIONS.md)
- 진행 방식·규칙: [`AGENT.md`](./AGENT.md) · 또는 `/blog-review <링크>`

## 📊 현황
- **총 리뷰:** 11개 · **개념:** 33개 · **실습:** 5개 프로젝트
- **최근 리뷰:** 2026-08-13
- **진행:** 주중(월~금)

## 🗂️ 기록

| # | 날짜 | 회사 | 글 (원문) | 한 줄 | 태그 | 노트 |
|---|------|------|-----------|-------|------|------|
| 11 | 2026-08-13 | 채널톡 | [RxJS로 우아하게 사이드 이펙트 통제하기](https://tech.channel.io/kr/articles/8b85a1b8) | 비동기 인터페이스의 완료는 첫 응답이 아니라 약속한 모든 사이드 이펙트가 끝난 시점이다 | `frontend` `동시성` `아키텍처` `리팩터링` | [보기](./reviews/2026-08-13-channel-rxjs-side-effects.md) |
| 10 | 2026-08-12 | 여기어때 | [항공 프론트엔드 구축기 (3/10): prefix를 붙이자 tailwind-merge가 조용히 깨졌다](https://techblog.gccompany.co.kr/%ED%95%AD%EA%B3%B5-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B5%AC%EC%B6%95%EA%B8%B0-3-10-prefix%EB%A5%BC-%EB%B6%99%EC%9D%B4%EC%9E%90-tailwind-merge%EA%B0%80-%EC%A1%B0%EC%9A%A9%ED%9E%88-%EA%B9%A8%EC%A1%8C%EB%8B%A4-f5b250afc2a9) | 도구를 확장하면 앞선 선택을 지킬 수 있지만, 도구가 숨겨 관리하던 규칙까지 물려받는다 | `frontend` `아키텍처` `리팩터링` | [보기](./reviews/2026-08-12-yeogieottae-tailwind-merge-prefix.md) |
| 9 | 2026-08-11 | 여기어때 | [항공 프론트엔드 구축기 (2/10): Vue2 디자인 시스템을 React로 옮기기](https://techblog.gccompany.co.kr/%ED%95%AD%EA%B3%B5-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B5%AC%EC%B6%95%EA%B8%B0-2-10-vue2-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C%EC%9D%84-react%EB%A1%9C-%EC%98%AE%EA%B8%B0%EA%B8%B0-b16284a907e9) | 이식성은 목표가 아니라 좋은 경계 설계의 부산물 — 그리고 종속은 의존성 목록에 안 적힌 곳에 숨는다 | `frontend` `마이그레이션` `아키텍처` `리팩터링` | [보기](./reviews/2026-08-11-yeogieottae-vue2-to-react-design-system.md) |
| 8 | 2026-08-10 | 여기어때 | [항공 프론트엔드 구축기 (1/10): 웹, 모바일웹, 웹뷰를 코드 한 벌로](https://techblog.gccompany.co.kr/%ED%95%AD%EA%B3%B5-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B5%AC%EC%B6%95%EA%B8%B0-1-10-%EC%9B%B9-%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%9B%B9-%EC%9B%B9%EB%B7%B0%EB%A5%BC-%EC%BD%94%EB%93%9C-%ED%95%9C-%EB%B2%8C%EB%A1%9C-ca9bec34dddf) | 절충안이 두 극단보다 나쁠 수 있다 — "이건 공통인가"를 매번 사람이 판단해야 하면 그건 공유선이 아니다 | `frontend` `아키텍처` `마이그레이션` `조직/프로세스` | [보기](./reviews/2026-08-10-yeogieottae-one-codebase-web-webview.md) |
| 7 | 2026-08-07 | 여기어때 | [늙어버린 당신의 AI](https://techblog.gccompany.co.kr/%EB%8A%99%EC%96%B4%EB%B2%84%EB%A6%B0-%EB%8B%B9%EC%8B%A0%EC%9D%98-ai-7dc9cc8a7ca7) | 에러를 안 내는 고장이 제일 오래 산다 — 튜닝값 0으로 지우거나 목록에 적어두거나, 셋째는 모르고 늙는 것뿐 | `ml` `platform` `마이그레이션` `조직/프로세스` | [보기](./reviews/2026-08-07-yeogieottae-ai-asset-aging.md) |
| 6 | 2026-08-06 | 원티드랩 | [AI-Driven Development의 시대](https://medium.com/wantedjobs/ai-driven-development%EC%9D%98-%EC%8B%9C%EB%8C%80-4036e171b6eb) | 두 번째 안전장치는 첫 번째와 성질이 달라야 한다 — 그리고 빨라진 건지 남에게 옮겨간 건지를 물어라 | `ios` `조직/프로세스` `아키텍처` `테스트` | [보기](./reviews/2026-08-06-wantedlab-agent-loop.md) |
| 5 | 2026-08-05 | Nextree | [타입스크립트(TypeScript) 파헤치기](https://www.nextree.io/taibseukeuribteu-typescript-pahecigi/) | 타입은 컴파일 타임 약속일 뿐 — 체크와 변환은 서로 안 막고, 런타임 간극은 Zod 같은 SoT 검증으로 메운다 | `frontend` `데이터정합성` `타입시스템` | [보기](./reviews/2026-08-05-nextree-typescript.md) |
| 4 | 2026-08-04 | 올리브영 | [프레임워크에 구애받지 않는 통합 백오피스 구축하기](https://oliveyoung.tech/2026-07-14/building-integrated-backoffice-with-vue-web-components/) | 공유 컴포넌트는 파일에 비밀을 담지 말고, 실행 시점에 부모가 메모리로 직접 쥐여줘라 | `frontend` `아키텍처` `보안` | [보기](./reviews/2026-08-04-oliveyoung-vue-web-components.md) |
| 3 | 2026-08-03 | 토스 | [LLM은 똑똑한데, 왜 우리 회사 일은 모를까](https://toss.tech/article/llm_context_topic) | 답을 만들지 말고 "믿을 수 있게" — 신뢰도를 연속 점수 아닌 상태(disputed/stale)로, 모델 판단은 꼭 필요한 곳만 | `ml` `아키텍처` `관측성` | [보기](./reviews/2026-08-03-toss-llm-context-topic.md) |
| 2 | 2026-07-31 | DelightRoom | [Claude Code를 42주 동안 사용한 팀의 워크플로우](https://medium.com/delightroom/claude-code%EB%A5%BC-42%EC%A3%BC-%EB%8F%99%EC%95%88-%EC%82%AC%EC%9A%A9%ED%95%9C-%ED%8C%80%EC%9D%98-%EC%9B%8C%ED%81%AC%ED%94%8C%EB%A1%9C%EC%9A%B0-7d32da52d73a) | CLAUDE.md는 라우터, 스캐폴딩은 "영구 지식 vs 유통기한 임시책"으로 나눠라 | `ios` `조직/프로세스` `리팩터링` `테스트` | [보기](./reviews/2026-07-31-delightroom-claude-code-workflow.md) |
| 1 | 2026-07-30 | Nextree | [WebSocket을 활용한 채팅 서비스 설계](https://www.nextree.io/websocketeul-hwalyonghan-caeting-seobiseu-seolgye/) | 소켓은 "신호"만, 데이터는 재조회 → 검증 통일 + 오프라인 복구 | `backend` `아키텍처` `실시간` | [보기](./reviews/2026-07-30-nextree-websocket-chat.md) |
