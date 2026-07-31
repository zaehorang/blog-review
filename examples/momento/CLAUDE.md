# Momento iOS Development Assistant

> 이 파일은 **라우터**다. 내용을 담지 않는다. "언제 → 어디로"만 그린다.
> 실제 절차/검증/사실은 `.claude/` 하위 문서에 위임한다.

## 🎯 Mandatory Triggers  (사용자 말 → 의도 분류)

| 의도            | 키워드                                     | 액션 |
|-----------------|--------------------------------------------|------|
| PR Creation     | PR, 피알, 풀리퀘, 작업완료, 올려줘, merge  | READ .claude/workflows/create-pr.md |
| Figma → View    | 피그마, figma, 화면 만들어, mcp__figma__*  | READ .claude/workflows/figma-to-view.md |
| Firebase 배포   | 배포, deploy, 파이어베이스, firebase       | READ .claude/workflows/deploy-firebase.md |

## ⚙️ Workflow Pipeline  (반드시 이 순서로)

1. **Prerequisites (실행 전 필독 — 컨텍스트 장전):**
   - `.claude/references/architecture.md`
   - `.claude/references/team-configuration.md`
2. **Execute:** 위 트리거가 가리킨 workflow 문서를 그대로 따른다.
3. **Validate:** 해당 checklist를 돌린다. `REQUIRED`는 스킵 불가.

## 📁 Document Hierarchy (.claude/)

- `workflows/` — 절차서 (자주 바뀌는 층)
- `checklists/` — 검증 게이트 (심각도: REQUIRED/OPTIONAL/CONDITIONAL)
- `references/` — 우리만 아는 사실 (모델이 좋아져도 안 낡는 층)

## 📌 항상 지킬 것  (강조 — 최하단 배치)

- 색/폰트/간격 **하드코딩 금지.** `DesignSystem`의 토큰만 사용한다.
- 커밋/PR에 **Co-authored-by 트레일러 넣지 말 것.**
- **확신 없으면 멈추고 물어라.** 빌드 안 돌려보고 "됐다" 하지 않는다.
- 되돌리기 힘든 동작(merge, 배포)은 **사용자 승인 후** 실행한다.
