# Mutation testing (뮤테이션 테스트)

**테스트가 정말 오류를 잡는지**를 확인하려고, 일부러 무언가를 틀리게 바꿔 보고 테스트가 실패하는지 보는 기법. 테스트가 "통과한다"는 사실이 아니라 "깨질 수 있다"는 사실을 검증한다.

## 고전적 형태
- **대상 코드(프로덕션)** 를 조금씩 변형한다(`>`를 `>=`로, `+`를 `-`로 등 → mutant).
- 테스트를 돌려 mutant에서 **실패하면 killed**(테스트가 잡았다), **통과하면 survived**(그 테스트는 그 변화를 못 본다).
- survived가 많다 = 테스트가 많아도 검증력이 낮다.

## 이 글에서의 변형 — 기댓값을 바꾼다
[LY E2E 파이프라인](../reviews/2026-10-16-ly-ai-e2e-test-pipeline.md)은 코드가 아니라 **테스트의 기댓값**(개수·텍스트·URL)을 일부러 틀리게 바꾼다.
- 틀린 기댓값인데 테스트가 **통과**하면 → 그 assertion은 아무것도 검증하지 않는 **위양성(false positive)**.
- 기댓값을 바꿀 수 있는 검증에만 적용된다. 단순 노출 검증(보이는가)은 바꿀 값이 없어서 사람 리뷰로 넘긴다.

## 왜 중요한가
AI가 테스트를 쓰면 "초록"이 쉽게 나온다. 초록이 의미 있으려면 **빨강이 될 수 있다는 증거**가 필요하다.

## 관련 개념
- [완료 기준 (acceptance criteria)](acceptance-criteria.md)
- [행동 평가 (Behavioral Evaluation)](behavioral-evaluation.md)

## 처음 나온 노트
- [LY Corporation — AI로 E2E 회귀 테스트 자동화하기](../reviews/2026-10-16-ly-ai-e2e-test-pipeline.md)
