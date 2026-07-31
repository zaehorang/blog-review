# Workflow: Firebase 배포 (App Distribution)

## 전제
- `main` 또는 `release/*` 브랜치에서만 배포한다.
- 배포는 되돌리기 힘든 외부 동작 → **실행 전 사용자에게 대상/버전 확인 후 진행.**

## 단계
1. 배포 대상 채널 확인 (예: `qa`, `internal`). 사용자가 안 밝히면 묻는다.
2. 빌드 넘버를 올린다 (자동: CI가 커밋 수 기반으로 주입).
3. GitHub Actions `deploy-firebase` 워크플로우를 트리거한다.
   - 로컬에서 직접 빌드/업로드하지 않는다. CI(self-hosted mac runner)에 위임.
4. 배포 성공 시 Slack `#momento-qa`에 링크를 남긴다.

## Validate
- `.claude/checklists/pr-checklist.md`의 REQUIRED가 이미 통과된 커밋인지 확인.

## 하지 말 것
- 프로덕션(스토어) 릴리스는 이 워크플로우로 하지 않는다. 별도 승인 프로세스.
