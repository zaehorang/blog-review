# 팀 구성 & 협업 규칙 (사실만)

## 도구
- 이슈: Linear (프로젝트 프리픽스 `MOM-`)
- 디자인: Figma (MCP 연동)
- 커뮤니케이션: Slack (`#momento-dev`, `#momento-qa`)
- CI/CD: GitHub Actions (self-hosted mac runner)

## 브랜치 / 커밋
- 브랜치: `feat|fix|chore/MOM-<번호>-<slug>`
- 커밋: `type(scope): 한글 요약`
- PR 병합: Squash. 병합은 사람이 승인.

## 커밋/PR 트레일러
- Co-authored-by 트레일러를 넣지 않는다.

## 릴리스
- `release/x.y.0` 생성 → CI가 `bump-up/x.(y+1).0` 자동 생성 (HITL 최소화).
