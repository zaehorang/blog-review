# Workflow: Figma → SwiftUI View

## 전제
- Figma MCP(`mcp__figma__*`)가 연결되어 있어야 한다.
- 대상 화면 = TCA Reducer 1개 + View 1개 (architecture.md 규칙).

## 단계
1. Figma MCP로 선택된 프레임의 노드/레이아웃/토큰 정보를 가져온다.
2. 색/폰트/간격을 **DesignSystem 토큰으로 매핑**한다. 매칭되는 토큰이 없으면
   하드코딩하지 말고 **멈추고 사용자에게 어떤 토큰을 쓸지 묻는다.**
3. `Feature/<화면명>/` 에 `XxxView.swift` + `XxxFeature.swift`(Reducer) 생성.
4. View는 상태를 Reducer의 `Store`에서만 읽는다. 로컬 `@State`는 순수 UI 용도만.
5. Xcode MCP 증분 빌드로 컴파일 확인 → 실패하면 고치고 다시 빌드.

## 하지 말 것
- 색상 리터럴(`Color(red:...)`), 폰트 사이즈 숫자, `.padding(17)` 같은 매직넘버 금지.
- Reducer 안에서 네트워크/파일 IO 직접 호출 금지 → Core의 UseCase 경유.
