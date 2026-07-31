# Workflow: PR 생성

## 전제
- 현재 브랜치가 `main`이 아님을 확인한다. main이면 먼저 feature 브랜치를 만든다.

## 단계
1. `git status`, `git diff main...HEAD`로 변경 범위를 파악한다.
2. 브랜치명에서 Linear 이슈 번호를 추출한다 (예: `feat/MOM-123-photo-diary` → MOM-123).
3. 커밋: `type(scope): 한글 요약` 컨벤션. 논리적으로 다른 변경이면 커밋을 쪼갠다.
4. `gh pr create` — 제목은 Linear 이슈 제목, 본문은 아래 템플릿을 채운다.
   ```
   ## 무엇을
   ## 왜
   ## 테스트한 것

   Closes MOM-123
   ```
5. **Validate 단계로 넘어간다 → `.claude/checklists/pr-checklist.md`를 돌린다.**

## 하지 말 것
- 사용자 승인 없이 `gh pr merge`를 실행하지 않는다.
- Co-authored-by 트레일러를 넣지 않는다.
