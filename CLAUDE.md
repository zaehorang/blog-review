# CLAUDE.md

이 레포는 **테크 블로그 리뷰** 프로젝트다.

사용자가 **블로그 글 URL을 주면** (슬래시 호출 `/blog-review` 여부와 무관하게),
반드시 **`blog-review` 스킬**로 리뷰를 진행하고, 그 전에 **`AGENT.md`를 읽는다.**

- 방법(5단계 흐름 · 노트 형식 · raw 캡처)은 **스킬**에 있다 — 글로벌 설치, [zaehorang/agent-skills](https://github.com/zaehorang/agent-skills/tree/main/blog-review)
- 이 레포의 결정 이력 · 경로 · 커밋 규칙은 **`AGENT.md`**에 있고, 충돌하면 `AGENT.md`가 우선한다.
- 스킬이 안 잡히면 설치 안 된 것이다 — 레포에서 `blog-review` 폴더를 스킬 디렉터리에 복사/링크한다.

핵심:
- 목표는 요약이 아니라 **사용자의 사고를 끌어내고 교정하는 것**.
- 뼈대(메타데이터+중립 요약)만 깔고, 사용자가 이해·생각·질문을 내놓게 한 뒤 `✅/🔧/💡`로 교정.
- 끝나면 `reviews/`에 노트 저장 → `README.md` 로그 갱신 → **자동 커밋 + 푸시**(Co-Authored-By 없이).
- 주중(월~금)만. 노트 깊이는 첫 리뷰(nextree) 수준 유지.
