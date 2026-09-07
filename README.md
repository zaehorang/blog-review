# 📚 테크 블로그 리뷰 로그

## 🎯 왜 하는가
혼자서는 겪을 수 있는 엔지니어링 상황이 한정적이다. 그래서 다른 팀들이 남긴 글로
**많은 상황을 대리 경험**하고, 그걸 요약에 그치지 않고 **내 사고 자산**으로 만든다.
목표는 하나 — 비슷한 문제가 실제로 닥쳤을 때 **빠르게 접근하고 사고할 수 있게** 되는 것.
그래서 매 리뷰는 "무슨 글이었나"보다 **"나라면 어떻게 봤나 / 어디서 틀렸나"**에 무게를 둔다.

---

기업 테크 블로그를 **하루 1개**(주중) 리뷰한다.

- 리뷰 노트: [`reviews/`](./reviews/) — 글마다 "나라면 어떻게 봤나 / 어디서 틀렸나"
- 날것 기록: [`raw/`](./raw/) — 리뷰 대화에서 내가 입력한 이해·생각·질문 원문(JSONL)
- 개념 사전: [`concepts/`](./concepts/README.md) — 글과 무관하게 재사용되는 용어·기술 개념
- 동작 원리 시각화: [`explainers/`](./explainers/README.md) — 내부 흐름을 단계별로 따라가는 HTML
- 실습 코드: [`examples/`](./examples/) · 해볼 것: [`TRY.md`](./TRY.md) · 남은 질문: [`QUESTIONS.md`](./QUESTIONS.md)
- 진행 방식·규칙: [`AGENT.md`](./AGENT.md) · 또는 `/blog-review <링크>`

## 📊 현황
- **총 리뷰:** 17개 · **개념:** 45개 · **실습:** 5개 프로젝트
- **최근 리뷰:** 2026-09-07
- **진행:** 주중(월~금)

## 🗂️ 기록

| # | 날짜 | 회사 | 글 (원문) | 한 줄 | 태그 | 노트 |
|---|------|------|-----------|-------|------|------|
| 17 | 2026-09-07 | 토스 | [AI가 만든 코드가 어드민이 되기까지](https://toss.tech/article/52885) | 반복되는 비싼 작업은 요청 시점이 아니라 변경 시점으로 밀고, 입력에 해시를 찍어 결과를 재사용하면 대부분의 호출이 공짜가 된다 | `frontend` `아키텍처` `성능` `platform` | [보기](./reviews/2026-09-07-toss-ai-code-preview-runtime.md) |
| 16 | 2026-09-04 | 채널톡 | [OpenAI에서 직접 알려주는 Codex 사용법](https://tech.channel.io/kr/articles/361daeef) | 위임 전에 물어라 — 완료를 참/거짓으로 판정할 수 있게 썼는가, 안 적은 암묵지가 뭔가 (안 적으면 에이전트가 임의로 정한다) | `platform` `ml` `조직/프로세스` `아키텍처` | [보기](./reviews/2026-09-04-channel-codex-usage.md) |
| 15 | 2026-08-27 | 한컴테크 | [Unity를 모르는 프론트엔드 개발자가 AI로 Unity 서비스를 React로 옮긴 방법](https://tech.hancom.com/migrated-unity-to-react-with-ai/) | 검증 기준을 코드가 아니라 명세로 외재화하면 스택이 바뀌어도, 사람이 바뀌어도 기준이 안 흔들린다 | `frontend` `마이그레이션` `아키텍처` `테스트` | [보기](./reviews/2026-08-27-hancom-unity-react-migration.md) |
| 14 | 2026-08-25 | SK DEVOCEAN | [Claude Code Dynamic Workflow 쉽게 이해하기](https://devocean.sk.com/blog/techBoardDetail.do?id=168424&boardType=techBlog&isShared=Y) | 결정적 제어(코드)와 확률적 실행(에이전트)을 분리하면 중간 결과가 컨텍스트가 아니라 명시적 상태에 남는다 | `platform` `ml` `아키텍처` `확장성` | [보기](./reviews/2026-08-25-devocean-dynamic-workflow.md) |
| 13 | 2026-08-24 | LY Corporation | [보안 업무를 위한 AI 에이전트 플랫폼 「SAGE」 개발기 1편: 판단은 사람에게 남기는 설계](https://techblog.lycorp.co.jp/ko/ai-agent-platform-sage-dev-log-part-1) | 위임 가능한 업무를 고르지 말고, 위임 판단이 필요 없는 절단면(판단 준비/판단)을 찾아라 | `ml` `platform` `보안` `조직/프로세스` | [보기](./reviews/2026-08-24-ly-sage-security-agent.md) |
| 12 | 2026-08-18 | 미리디 | [AI로 QA 업무를 자동화한 방법: n8n부터 E2E 테스트 자동화까지](https://medium.com/miridih/ai%EB%A1%9C-qa-%EC%97%85%EB%AC%B4%EB%A5%BC-%EC%9E%90%EB%8F%99%ED%99%94%ED%95%9C-%EB%B0%A9%EB%B2%95-n8n%EB%B6%80%ED%84%B0-e2e-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%9E%90%EB%8F%99%ED%99%94%EA%B9%8C%EC%A7%80-2b8abe65b0de) | 도구가 아니라 문제의 모양을 가져와, 반복과 전달을 걷어내 사람의 판단 시간을 돌려줘라 | `platform` `테스트` `조직/프로세스` | [보기](./reviews/2026-08-18-miridih-qa-automation.md) |
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
