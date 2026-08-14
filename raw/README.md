# Raw 사용자 입력

블로그 리뷰 대화에서 교정되기 전의 **내 이해·생각·질문 원문**을 리뷰별 JSONL로 보관한다. AI 답변과 정리된 노트는 포함하지 않는다.

- 파일명: `raw/<review-id>.jsonl`
- 생성 시점: 질문·교정이 모두 끝난 뒤 리뷰 노트를 저장할 때 한 번
- 순서: `sequence` 1부터 실제 사용자 입력 순서대로
- 원문: 줄바꿈은 JSON 문자열의 `\n`으로 보존하고 맞춤법과 표현을 수정하지 않는다.
- 보안: 자격증명·토큰·비밀키는 원문으로 저장하지 않는다.

## 레코드 스키마

```json
{"schema_version":1,"review_id":"2026-08-14-company-topic","sequence":1,"kinds":["understanding","question"],"text":"사용자가 실제로 입력한 원문","redacted":false}
```

| 필드 | 설명 |
|---|---|
| `schema_version` | 현재 스키마 버전. 항상 `1` |
| `review_id` | 확장자를 뺀 리뷰 파일명 |
| `sequence` | 해당 리뷰 세션에서의 입력 순서 |
| `kinds` | `source`, `understanding`, `thought`, `question`, `request` 중 하나 이상 |
| `text` | 사용자 입력 원문 |
| `redacted` | 원문에서 민감정보를 치환했는지 |
| `redaction_types` | `redacted`가 `true`일 때만 필수인 치환 유형 목록 |

## 간단한 분석

```bash
# 모든 질문 원문
jq -r 'select(.kinds | index("question")) | .text' raw/*.jsonl

# 리뷰별 입력 수
jq -s 'group_by(.review_id) | map({review_id: .[0].review_id, count: length})' raw/*.jsonl

# 전체 파싱 검증
jq -e . raw/*.jsonl >/dev/null
```
