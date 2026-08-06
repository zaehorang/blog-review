# 📚 테크 블로그 리뷰 로그

## 🎯 왜 하는가
혼자서는 겪을 수 있는 엔지니어링 상황이 한정적이다. 그래서 다른 팀들이 남긴 글로
**많은 상황을 대리 경험**하고, 그걸 요약에 그치지 않고 **내 사고 자산**으로 만든다.
목표는 하나 — 비슷한 문제가 실제로 닥쳤을 때 **빠르게 접근하고 사고할 수 있게** 되는 것.
그래서 매 리뷰는 "무슨 글이었나"보다 **"나라면 어떻게 봤나 / 어디서 틀렸나"**에 무게를 둔다.

---

기업 테크 블로그를 **하루 1개**(주중) 리뷰한다.

- 리뷰 노트: [`reviews/`](./reviews/)
- 해볼 것(실습): [`TRY.md`](./TRY.md) · 남은 질문: [`QUESTIONS.md`](./QUESTIONS.md)
- 진행 방식·규칙: [`AGENT.md`](./AGENT.md) · 또는 `/blog-review <링크>`

## 📊 현황
- **총 리뷰:** 6개
- **최근 리뷰:** 2026-08-06
- **진행:** 주중(월~금)

## 🗂️ 기록

| # | 날짜 | 회사 | 글 (원문) | 한 줄 | 태그 | 노트 |
|---|------|------|-----------|-------|------|------|
| 6 | 2026-08-06 | 원티드랩 | [AI-Driven Development의 시대](https://medium.com/wantedjobs/ai-driven-development%EC%9D%98-%EC%8B%9C%EB%8C%80-4036e171b6eb) | 두 번째 안전장치는 첫 번째와 성질이 달라야 한다 — 그리고 빨라진 건지 남에게 옮겨간 건지를 물어라 | `ios` `조직/프로세스` `아키텍처` `테스트` | [보기](./reviews/2026-08-06-wantedlab-agent-loop.md) |
| 5 | 2026-08-05 | Nextree | [타입스크립트(TypeScript) 파헤치기](https://www.nextree.io/taibseukeuribteu-typescript-pahecigi/) | 타입은 컴파일 타임 약속일 뿐 — 체크와 변환은 서로 안 막고, 런타임 간극은 Zod 같은 SoT 검증으로 메운다 | `frontend` `데이터정합성` `타입시스템` | [보기](./reviews/2026-08-05-nextree-typescript.md) |
| 4 | 2026-08-04 | 올리브영 | [프레임워크에 구애받지 않는 통합 백오피스 구축하기](https://oliveyoung.tech/2026-07-14/building-integrated-backoffice-with-vue-web-components/) | 공유 컴포넌트는 파일에 비밀을 담지 말고, 실행 시점에 부모가 메모리로 직접 쥐여줘라 | `frontend` `아키텍처` `보안` | [보기](./reviews/2026-08-04-oliveyoung-vue-web-components.md) |
| 3 | 2026-08-03 | 토스 | [LLM은 똑똑한데, 왜 우리 회사 일은 모를까](https://toss.tech/article/llm_context_topic) | 답을 만들지 말고 "믿을 수 있게" — 신뢰도를 연속 점수 아닌 상태(disputed/stale)로, 모델 판단은 꼭 필요한 곳만 | `ml` `아키텍처` `관측성` | [보기](./reviews/2026-08-03-toss-llm-context-topic.md) |
| 2 | 2026-07-31 | DelightRoom | [Claude Code를 42주 동안 사용한 팀의 워크플로우](https://medium.com/delightroom/claude-code%EB%A5%BC-42%EC%A3%BC-%EB%8F%99%EC%95%88-%EC%82%AC%EC%9A%A9%ED%95%9C-%ED%8C%80%EC%9D%98-%EC%9B%8C%ED%81%AC%ED%94%8C%EB%A1%9C%EC%9A%B0-7d32da52d73a) | CLAUDE.md는 라우터, 스캐폴딩은 "영구 지식 vs 유통기한 임시책"으로 나눠라 | `ios` `조직/프로세스` `리팩터링` `테스트` | [보기](./reviews/2026-07-31-delightroom-claude-code-workflow.md) |
| 1 | 2026-07-30 | Nextree | [WebSocket을 활용한 채팅 서비스 설계](https://www.nextree.io/websocketeul-hwalyonghan-caeting-seobiseu-seolgye/) | 소켓은 "신호"만, 데이터는 재조회 → 검증 통일 + 오프라인 복구 | `backend` `아키텍처` `실시간` | [보기](./reviews/2026-07-30-nextree-websocket-chat.md) |
