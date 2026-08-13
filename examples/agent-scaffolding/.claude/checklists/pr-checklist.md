# PR 검증 체크리스트

## ■ REQUIRED (스킵 불가)
- [ ] 빌드 성공 (Xcode MCP 증분 빌드로 확인)
- [ ] 관련 테스트 통과
- [ ] DesignSystem 토큰 위반 없음 (하드코딩 색/폰트/매직넘버 grep)
- [ ] Co-authored-by 트레일러 없음
- [ ] PR 본문에 `Closes MOM-xxx` 존재

## □ OPTIONAL (해당 시만)
- [ ] 스냅샷 테스트 갱신 (UI 변경 시)
- [ ] 다국어 문자열 키 추가 (사용자 노출 텍스트 추가 시)

## ◇ CONDITIONAL
- [ ] 로컬 저장 스키마 변경 시 → 마이그레이션 노트 링크
- [ ] 새 3rd-party 의존성 추가 시 → dependencies 승인 여부
